import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  API_BASE_URL,
  INITIAL_FORM,
  DEMO_SAMPLE,
  parseReviewSections
} from "../lib/reviewUtils";

export default function DashboardPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewMarkdown, setReviewMarkdown] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [requestError, setRequestError] = useState("");
  const [feedbackChoice, setFeedbackChoice] = useState(null);
  const [feedbackCorrection, setFeedbackCorrection] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(true);
  const [memories, setMemories] = useState([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(false);

  const parsedSections = useMemo(
    () => parseReviewSections(reviewMarkdown),
    [reviewMarkdown]
  );

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
    setReviewMarkdown("");
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

      setReviewMarkdown(payload.review || "No review was returned.");
      setReviewId(payload.reviewId || "");
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!reviewId) {
      setFeedbackMessage("Generate a review first, then submit feedback.");
      return;
    }

    if (feedbackChoice === null) {
      setFeedbackMessage("Please choose thumbs up or thumbs down first.");
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewId,
          wasHelpful: feedbackChoice,
          corrections: feedbackCorrection,
          teamName: formData.teamName.trim()
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Feedback request failed.");
      }

      setFeedbackMessage("Feedback submitted. The agent will learn from this.");
      setFeedbackCorrection("");
    } catch (error) {
      setFeedbackMessage(error.message);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest bg-grid-pattern text-on-surface selection:bg-primary-container selection:text-on-primary-fixed">
      <header className="sticky top-0 z-40 border-b border-outline-variant/15 bg-[#131315]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-black italic tracking-tighter text-[#00FF41]"
            >
              SAGE
            </Link>
            <span className="font-label hidden text-xs uppercase tracking-widest text-on-surface-variant sm:inline">
              Review Console
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => console.log("TODO: Implement [Settings]")}
              className="ghost-border rounded-sm px-4 py-2 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-variant/40 hover:text-primary-container"
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
          <h1 className="font-display text-3xl font-black text-on-surface md:text-4xl">
            Stateful review
          </h1>
          <p className="mt-2 max-w-2xl font-body text-on-surface-variant">
            Hindsight recalls team patterns; Groq generates the review. Paste code, run
            analysis, then teach the agent with feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="glass-panel ghost-border glow-shadow rounded-xl p-6">
            <h2 className="font-display mb-6 text-lg font-bold text-on-surface">
              Code intake
            </h2>
            <form className="space-y-4" onSubmit={handleReviewSubmit}>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-on-surface-variant">
                  Team name
                </label>
                <input
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="e.g. SinTax"
                  className="w-full rounded-sm bg-surface-container-highest px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary-container"
                />
              </div>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-on-surface-variant">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full rounded-sm bg-surface-container-highest px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container"
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
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-on-surface-variant">
                  Filename
                </label>
                <input
                  name="filename"
                  value={formData.filename}
                  onChange={handleInputChange}
                  placeholder="e.g. authService.js"
                  className="w-full rounded-sm bg-surface-container-highest px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary-container"
                />
              </div>
              <div>
                <label className="font-label mb-1 block text-xs uppercase tracking-widest text-on-surface-variant">
                  Source
                </label>
                <textarea
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="// Paste your code here..."
                  rows={14}
                  className="w-full resize-y rounded-sm bg-surface-container-lowest px-4 py-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary-container"
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
                  className="ghost-border flex-1 rounded-sm bg-surface-variant/20 px-6 py-3 font-headline text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-highest"
                >
                  Load demo sample
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-panel ghost-border glow-shadow relative overflow-hidden rounded-xl border-l-2 border-l-primary-container p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-on-surface">
                  AI review
                </h2>
                <span className="rounded-full bg-primary-container/15 px-3 py-1 font-label text-xs text-primary-container">
                  Score {parsedSections.overallScore}/10
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-surface-container-low/80 p-3">
                  <div className="font-label text-[10px] uppercase text-on-surface-variant">
                    Issues
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface">
                    {parsedSections.issues || "—"}
                  </p>
                </div>
                <div className="rounded-lg bg-surface-container-low/80 p-3">
                  <div className="font-label text-[10px] uppercase text-on-surface-variant">
                    Suggestions
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface">
                    {parsedSections.suggestions || "—"}
                  </p>
                </div>
                <div className="rounded-lg bg-surface-container-low/80 p-3">
                  <div className="font-label text-[10px] uppercase text-on-surface-variant">
                    Team notes
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface">
                    {parsedSections.standards || "—"}
                  </p>
                </div>
              </div>
              <div className="mt-4 max-h-[280px] overflow-auto rounded-lg bg-surface-container-lowest/90 p-4 text-sm">
                {reviewMarkdown ? (
                  <div className="markdown-review text-on-surface [&_a]:text-primary-container [&_h1]:mb-2 [&_h1]:text-base [&_h2]:mb-2 [&_h2]:text-sm [&_li]:text-on-surface-variant [&_p]:mb-2 [&_p]:text-on-surface-variant [&_strong]:text-on-surface">
                    <ReactMarkdown>{reviewMarkdown}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-on-surface-variant">
                    Run analysis to see markdown output here.
                  </p>
                )}
              </div>
            </div>

            <div className="glass-panel ghost-border rounded-xl p-6">
              <h3 className="font-display mb-4 text-sm font-bold text-on-surface">
                Calibration
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackChoice(true)}
                  className={`rounded-sm px-4 py-2 font-label text-xs uppercase tracking-wider transition-colors ${
                    feedbackChoice === true
                      ? "bg-primary-container text-on-primary-fixed"
                      : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  👍 Helpful
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackChoice(false)}
                  className={`rounded-sm px-4 py-2 font-label text-xs uppercase tracking-wider transition-colors ${
                    feedbackChoice === false
                      ? "bg-primary-container text-on-primary-fixed"
                      : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  👎 Needs work
                </button>
              </div>
              <input
                value={feedbackCorrection}
                onChange={(e) => setFeedbackCorrection(e.target.value)}
                placeholder="Correct the agent…"
                className="mt-4 w-full rounded-sm bg-surface-container-highest px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
              <button
                type="button"
                disabled={isSubmittingFeedback}
                onClick={handleFeedbackSubmit}
                className="mt-3 w-full rounded-sm border border-outline-variant/30 bg-surface-variant/30 py-3 font-headline text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-highest disabled:opacity-50"
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
            className="flex w-full items-center justify-between px-6 py-4 text-left font-headline text-sm font-bold text-on-surface"
          >
            <span>What has the agent learned?</span>
            <span className="material-symbols-outlined text-on-surface-variant">
              {isMemoryOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
          {isMemoryOpen && (
            <div className="border-t border-outline-variant/15 px-6 py-4">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-on-surface-variant">
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
              <ul className="max-h-48 space-y-2 overflow-auto text-sm text-on-surface">
                {memories.length > 0 ? (
                  memories.map((memory, index) => (
                    <li
                      key={`${memory?.id || "m"}-${index}`}
                      className="border-l-2 border-primary-container/40 pl-3"
                    >
                      {memory?.content || memory?.text || JSON.stringify(memory)}
                    </li>
                  ))
                ) : (
                  <li className="text-on-surface-variant">
                    No memories loaded. Enter a team name and refresh.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {(requestError || feedbackMessage) && (
          <div
            className={`mt-6 rounded-xl border px-4 py-3 font-body text-sm ${
              requestError
                ? "border-error/40 bg-error-container/10 text-error"
                : "border-outline-variant/20 bg-surface-container-low text-on-surface"
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
