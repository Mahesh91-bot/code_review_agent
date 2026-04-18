import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ThemeToggle from "../components/ThemeToggle";
import {
  API_BASE_URL,
  EMPTY_STRUCTURED_REVIEW,
  FEEDBACK_API_URL,
  INITIAL_FORM,
  DEMO_SAMPLE,
  TEAM_NAME_STORAGE_KEY,
  formatStructuredReviewAsMarkdown,
  normalizeStructuredReview
} from "../lib/reviewUtils";

function ReviewListCard({ title, items, emptyLabel }) {
  return (
    <div className="rounded-lg bg-zinc-100/90 p-3 dark:bg-surface-container-low/80">
      <div className="font-label text-[10px] uppercase text-zinc-600 dark:text-on-surface-variant">
        {title}
      </div>
      {items.length === 0 ? (
        <p className="mt-1 text-xs leading-relaxed text-zinc-500 italic dark:text-on-surface-variant">
          {emptyLabel}
        </p>
      ) : (
        <ul className="mt-1 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-zinc-800 dark:text-on-surface">
          {items.map((item, index) => (
            <li key={`${title}-${index}`}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewMarkdown, setReviewMarkdown] = useState("");
  const [reviewStructured, setReviewStructured] = useState(() => ({
    ...EMPTY_STRUCTURED_REVIEW
  }));
  const [reviewId, setReviewId] = useState("");
  const [requestError, setRequestError] = useState("");
  const [feedbackChoice, setFeedbackChoice] = useState(null);
  const [feedbackCorrection, setFeedbackCorrection] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(true);
  const [memories, setMemories] = useState([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(false);

  const originalIssueSummary = useMemo(() => {
    const blocks = [
      reviewStructured.issues.join("\n"),
      reviewStructured.suggestions.join("\n"),
      reviewStructured.teamNotes.join("\n")
    ].filter((p) => p && String(p).trim());
    if (blocks.length > 0) {
      return blocks.join("\n\n").slice(0, 2000);
    }
    return reviewMarkdown ? reviewMarkdown.slice(0, 2000) : "";
  }, [reviewStructured, reviewMarkdown]);

  useEffect(() => {
    if (!feedbackSuccess) return undefined;
    const timer = setTimeout(() => setFeedbackSuccess(false), 8000);
    return () => clearTimeout(timer);
  }, [feedbackSuccess]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const loadDemoSample = () => {
    setFormData(DEMO_SAMPLE);
    setRequestError("");
    setFeedbackMessage("Demo sample loaded. Click Analyze Code to run.");
  };

  const fetchTeamMemories = async () => {
    if (!formData.teamName.trim()) {
      setRequestError("Enter a team name before loading memories.");
      return;
    }

    setRequestError("");
    setIsLoadingMemories(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/memories/${encodeURIComponent(formData.teamName.trim())}`
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to fetch memories.");
      }

      const rows = payload?.memories?.results || payload?.memories?.data || [];
      setMemories(rows);
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsLoadingMemories(false);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!formData.teamName || !formData.filename || !formData.code) {
      setRequestError("Please fill team name, filename, and code before submitting.");
      return;
    }

    setIsReviewing(true);
    setRequestError("");
    setFeedbackMessage("");
    setFeedbackSuccess(false);
    setReviewMarkdown("");
    setReviewStructured({ ...EMPTY_STRUCTURED_REVIEW });
    setReviewId("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Review request failed.");
      }

      const structured = normalizeStructuredReview(payload.review);
      setReviewStructured(structured);
      setReviewMarkdown(
        formatStructuredReviewAsMarkdown(structured).trim() || "No review was returned."
      );
      setReviewId(payload.reviewId || "");
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!reviewId) {
      setFeedbackSuccess(false);
      setFeedbackMessage("Generate a review first, then submit feedback.");
      return;
    }

    if (feedbackChoice === null) {
      setFeedbackSuccess(false);
      setFeedbackMessage("Please choose thumbs up or thumbs down first.");
      return;
    }

    const storedTeam =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(TEAM_NAME_STORAGE_KEY)?.trim() || ""
        : "";
    const teamName = storedTeam || formData.teamName.trim();

    const willPersistToMemory =
      feedbackChoice === false || feedbackCorrection.trim().length > 0;

    if (willPersistToMemory && !teamName) {
      setFeedbackSuccess(false);
      setFeedbackMessage("Set a team name in the form (or sign in so your team is saved).");
      return;
    }

    if (feedbackChoice === false && !feedbackCorrection.trim()) {
      setFeedbackSuccess(false);
      setFeedbackMessage("Add a short correction so the agent knows what to fix.");
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackMessage("");
    setFeedbackSuccess(false);

    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamName,
          language: formData.language,
          originalIssue:
            originalIssueSummary.trim() || "Review output (see full markdown in UI).",
          correction: feedbackCorrection.trim(),
          reviewId,
          wasHelpful: feedbackChoice
        })
      });

      let payload = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(
          payload?.error || payload?.details || "Feedback request failed."
        );
      }

      if (payload.savedToMemory) {
        setFeedbackSuccess(true);
        setFeedbackMessage("");
        setFeedbackCorrection("");
        setRequestError("");
      } else {
        setFeedbackSuccess(false);
        setFeedbackMessage(
          payload.message || "Thanks for letting us know."
        );
      }
    } catch (error) {
      setFeedbackSuccess(false);
      setFeedbackMessage(error.message);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 bg-grid-pattern text-zinc-900 selection:bg-emerald-200 selection:text-zinc-900 dark:bg-surface-container-lowest dark:text-on-surface dark:selection:bg-primary-container dark:selection:text-on-primary-fixed">
      <header className="sticky top-0 z-50 border-b border-zinc-200/90 bg-white/85 shadow-sm backdrop-blur-md dark:border-outline-variant/15 dark:bg-zinc-950/80 dark:shadow-none dark:backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/"
            className="flex min-w-0 items-baseline gap-2 sm:gap-3"
          >
            <span className="text-xl font-black italic tracking-tighter text-emerald-600 dark:text-[#00FF41]">
              SAGE
            </span>
            <span className="hidden max-w-[180px] font-label text-[10px] font-medium uppercase leading-snug tracking-wide text-zinc-500 min-[480px]:inline md:max-w-[220px] dark:text-zinc-400">
              Stateful Audit &amp; Generation Engine
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-label hidden text-xs uppercase tracking-widest text-zinc-500 lg:inline dark:text-on-surface-variant">
              Review Console
            </span>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => console.log("TODO: Implement [Settings]")}
              className="ghost-border rounded-sm px-3 py-2 font-label text-xs uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-emerald-700 dark:text-on-surface-variant dark:hover:bg-surface-variant/40 dark:hover:text-primary-container"
            >
              Settings
            </button>
            <Link
              to="/login"
              className="gradient-cta rounded-sm px-4 py-2 font-headline text-xs font-bold text-on-primary-fixed"
            >
              Account
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-black text-zinc-900 md:text-4xl dark:text-on-surface">
            Stateful review
          </h1>
          <p className="mt-2 max-w-2xl font-body text-zinc-600 dark:text-on-surface-variant">
            Hindsight recalls team patterns; Groq generates the review. Paste code, run
            analysis, then teach the agent with feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="glass-panel ghost-border glow-shadow rounded-xl p-6">
            <h2 className="font-display mb-6 text-lg font-bold text-zinc-900 dark:text-on-surface">
              Code intake
            </h2>
            <form className="space-y-4" onSubmit={handleReviewSubmit}>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-zinc-600 dark:text-on-surface-variant">
                  Team name
                </label>
                <input
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="e.g. SinTax"
                  className="w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 font-body text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-transparent dark:bg-surface-container-highest dark:text-on-surface dark:placeholder:text-on-surface-variant/50 dark:focus:ring-primary-container"
                />
              </div>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-zinc-600 dark:text-on-surface-variant">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 font-body text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-transparent dark:bg-surface-container-highest dark:text-on-surface dark:focus:ring-primary-container"
                >
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>TypeScript</option>
                  <option>Java</option>
                  <option>Go</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-zinc-600 dark:text-on-surface-variant">
                  Filename
                </label>
                <input
                  name="filename"
                  value={formData.filename}
                  onChange={handleInputChange}
                  placeholder="e.g. authService.js"
                  className="w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 font-body text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-transparent dark:bg-surface-container-highest dark:text-on-surface dark:placeholder:text-on-surface-variant/50 dark:focus:ring-primary-container"
                />
              </div>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-zinc-600 dark:text-on-surface-variant">
                  Source
                </label>
                <textarea
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="// Paste your code here..."
                  rows={14}
                  className="w-full resize-y rounded-sm border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-transparent dark:bg-surface-container-lowest dark:text-on-surface dark:placeholder:text-on-surface-variant/50 dark:focus:ring-primary-container"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isReviewing}
                  className="gradient-cta flex flex-1 items-center justify-center gap-2 rounded-sm px-6 py-3 font-headline text-sm font-bold text-on-primary-fixed shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all hover:brightness-110 disabled:opacity-60"
                >
                  {isReviewing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary-fixed/30 border-t-on-primary-fixed" />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">bolt</span>
                      Analyze Code
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={loadDemoSample}
                  className="ghost-border flex-1 rounded-sm bg-zinc-100 px-6 py-3 font-headline text-sm font-bold text-zinc-800 transition-colors hover:bg-zinc-200 dark:bg-surface-variant/20 dark:text-on-surface dark:hover:bg-surface-container-highest"
                >
                  Load demo sample
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-panel ghost-border glow-shadow relative overflow-hidden rounded-xl border-l-2 border-l-emerald-500 p-6 dark:border-l-primary-container">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-on-surface">
                  AI review
                </h2>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-label text-xs text-emerald-700 dark:bg-primary-container/15 dark:text-primary-container">
                  Score {reviewStructured.score}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <ReviewListCard
                  title="Issues"
                  items={reviewStructured.issues}
                  emptyLabel="No issues found."
                />
                <ReviewListCard
                  title="Suggestions"
                  items={reviewStructured.suggestions}
                  emptyLabel="No suggestions found."
                />
                <ReviewListCard
                  title="Team notes"
                  items={reviewStructured.teamNotes}
                  emptyLabel="No team notes found."
                />
              </div>
              <div className="mt-4 max-h-[280px] overflow-auto rounded-lg border border-zinc-200/80 bg-white p-4 text-sm dark:border-transparent dark:bg-surface-container-lowest/90">
                {reviewMarkdown ? (
                  <div className="markdown-review text-zinc-800 dark:text-on-surface [&_a]:text-emerald-600 dark:[&_a]:text-primary-container [&_h1]:mb-2 [&_h1]:text-base [&_h2]:mb-2 [&_h2]:text-sm [&_li]:text-zinc-600 dark:[&_li]:text-on-surface-variant [&_p]:mb-2 [&_p]:text-zinc-600 dark:[&_p]:text-on-surface-variant [&_strong]:text-zinc-900 dark:[&_strong]:text-on-surface">
                    <ReactMarkdown>{reviewMarkdown}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-zinc-500 dark:text-on-surface-variant">
                    Run analysis to see markdown output here.
                  </p>
                )}
              </div>
            </div>

            <div className="glass-panel ghost-border rounded-xl p-6">
              <h3 className="font-display mb-4 text-sm font-bold text-zinc-900 dark:text-on-surface">
                Calibration
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackChoice(true)}
                  className={`rounded-sm px-4 py-2 font-label text-xs uppercase tracking-wider transition-colors ${
                    feedbackChoice === true
                      ? "bg-emerald-500 text-white dark:bg-primary-container dark:text-on-primary-fixed"
                      : "bg-zinc-200 text-zinc-700 hover:text-zinc-900 dark:bg-surface-container-high dark:text-on-surface-variant dark:hover:text-on-surface"
                  }`}
                >
                  👍 Helpful
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackChoice(false)}
                  className={`rounded-sm px-4 py-2 font-label text-xs uppercase tracking-wider transition-colors ${
                    feedbackChoice === false
                      ? "bg-emerald-500 text-white dark:bg-primary-container dark:text-on-primary-fixed"
                      : "bg-zinc-200 text-zinc-700 hover:text-zinc-900 dark:bg-surface-container-high dark:text-on-surface-variant dark:hover:text-on-surface"
                  }`}
                >
                  👎 Needs work
                </button>
              </div>
              <input
                value={feedbackCorrection}
                onChange={(e) => setFeedbackCorrection(e.target.value)}
                placeholder="Correct the agent…"
                className="mt-4 w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 font-body text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-transparent dark:bg-surface-container-highest dark:text-on-surface dark:placeholder:text-on-surface-variant/50 dark:focus:ring-primary-container"
              />
              <button
                type="button"
                disabled={isSubmittingFeedback}
                onClick={handleFeedbackSubmit}
                className="mt-3 w-full rounded-sm border border-zinc-200 bg-zinc-100 py-3 font-headline text-sm font-bold text-zinc-800 transition-colors hover:bg-zinc-200 disabled:opacity-50 dark:border-outline-variant/30 dark:bg-surface-variant/30 dark:text-on-surface dark:hover:bg-surface-container-highest"
              >
                {isSubmittingFeedback ? "Submitting…" : "Submit feedback"}
              </button>
            </div>
          </div>
        </div>

        <div className="glass-panel ghost-border mt-6 rounded-xl">
          <button
            type="button"
            onClick={() => setIsMemoryOpen((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-4 text-left font-headline text-sm font-bold text-zinc-900 dark:text-on-surface"
          >
            <span>What has the agent learned?</span>
            <span className="material-symbols-outlined text-zinc-500 dark:text-on-surface-variant">
              {isMemoryOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {isMemoryOpen && (
            <div className="border-t border-zinc-200/80 px-6 py-4 dark:border-outline-variant/15">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-zinc-600 dark:text-on-surface-variant">
                  Team memory patterns from Hindsight.
                </p>
                <button
                  type="button"
                  onClick={fetchTeamMemories}
                  disabled={isLoadingMemories}
                  className="gradient-cta rounded-sm px-4 py-2 font-headline text-xs font-bold text-on-primary-fixed disabled:opacity-50"
                >
                  {isLoadingMemories ? "Refreshing…" : "Refresh"}
                </button>
              </div>
              <ul className="max-h-48 space-y-2 overflow-auto text-sm text-zinc-800 dark:text-on-surface">
                {memories.length > 0 ? (
                  memories.map((memory, index) => (
                    <li
                      key={`${memory?.id || "m"}-${index}`}
                      className="border-l-2 border-emerald-500/50 pl-3 dark:border-primary-container/40"
                    >
                      {memory?.content || memory?.text || JSON.stringify(memory)}
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500 dark:text-on-surface-variant">
                    No memories loaded. Enter a team name and refresh.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {feedbackSuccess && (
          <div
            className="mt-6 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 font-body text-sm text-emerald-900 dark:border-primary-container/40 dark:bg-primary-container/15 dark:text-on-surface"
            role="status"
          >
            <p className="font-headline font-bold text-emerald-800 dark:text-primary-container">
              Correction saved
            </p>
            <p className="mt-1 text-emerald-900/90 dark:text-on-surface">
              Your correction was stored in team memory. The agent will use it in future reviews
              for{" "}
              <span className="font-medium">
                {(typeof localStorage !== "undefined" &&
                  localStorage.getItem(TEAM_NAME_STORAGE_KEY)?.trim()) ||
                  formData.teamName.trim() ||
                  "your team"}
              </span>
              .
            </p>
          </div>
        )}

        {(requestError || feedbackMessage) && (
          <div
            className={`mt-6 rounded-xl border px-4 py-3 font-body text-sm ${
              requestError
                ? "border-error/40 bg-error-container/10 text-error"
                : "border-zinc-200 bg-white text-zinc-800 dark:border-outline-variant/20 dark:bg-surface-container-low dark:text-on-surface"
            }`}
          >
            {requestError && <p>Error: {requestError}</p>}
            {feedbackMessage && <p>{feedbackMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
