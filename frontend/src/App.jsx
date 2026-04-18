import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./App.module.css";

const API_BASE_URL = "http://localhost:3001";

const INITIAL_FORM = {
  teamName: "",
  language: "JavaScript",
  filename: "",
  code: ""
};

const DEMO_SAMPLE = {
  teamName: "Payments Team",
  language: "JavaScript",
  filename: "checkoutController.js",
  code: `async function processCheckout(req, res) {
  const userId = req.body.userId;
  const cartTotal = req.body.cartTotal;

  if (!userId) {
    res.status(400).json({ error: "Missing user" });
  }

  const user = await db.users.findById(userId);
  if (user.isBlocked) {
    return res.status(403).json({ error: "Blocked user" });
  }

  // TODO: improve this logic
  if (cartTotal > 1000) {
    await db.auditLogs.insert({ userId, reason: "high value checkout" });
  }

  const result = await paymentGateway.charge({
    userId,
    amount: cartTotal
  });

  return res.json({ ok: true, paymentId: result.id });
}`
};

function extractSection(markdown, headingText) {
  if (!markdown) return "";

  const escapedHeading = headingText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionRegex = new RegExp(
    `(?:^|\\n)#{1,6}\\s*${escapedHeading}\\s*\\n([\\s\\S]*?)(?=\\n#{1,6}\\s|$)`,
    "i"
  );
  const match = markdown.match(sectionRegex);
  return match?.[1]?.trim() || "";
}

function App() {
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

  const parsedSections = useMemo(() => {
    const issues = extractSection(reviewMarkdown, "Issues Found");
    const suggestions = extractSection(reviewMarkdown, "Suggestions");
    const standards = extractSection(reviewMarkdown, "Standards Violations");

    const scoreMatch = reviewMarkdown.match(
      /overall\s*score[^0-9]*([1-9]|10)(?:\s*\/\s*10)?/i
    );
    const overallScore = scoreMatch?.[1] || "N/A";

    return { issues, suggestions, standards, overallScore };
  }, [reviewMarkdown]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const loadDemoSample = () => {
    setFormData(DEMO_SAMPLE);
    setRequestError("");
    setFeedbackMessage("Demo sample loaded. Click 'Review My Code' to run.");
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
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>AI Code Review Agent</h1>
        <p>Hackathon demo: memory-driven reviews that improve with team feedback.</p>
      </header>

      <section className={styles.topGrid}>
        <article className={styles.panel}>
          <h2>Submit Code</h2>
          <form className={styles.form} onSubmit={handleReviewSubmit}>
            <label className={styles.field}>
              Team Name
              <input
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder="e.g. Platform Team"
              />
            </label>

            <label className={styles.field}>
              Language
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option>JavaScript</option>
                <option>Python</option>
                <option>TypeScript</option>
                <option>Java</option>
                <option>Go</option>
                <option>Other</option>
              </select>
            </label>

            <label className={styles.field}>
              Filename
              <input
                name="filename"
                value={formData.filename}
                onChange={handleInputChange}
                placeholder="e.g. authService.js"
              />
            </label>

            <label className={styles.field}>
              Paste Code
              <textarea
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="// Paste your code here..."
              />
            </label>

            <button className={styles.primaryButton} type="submit" disabled={isReviewing}>
              {isReviewing ? (
                <span className={styles.loadingWrap}>
                  <span className={styles.spinner} />
                  Reviewing...
                </span>
              ) : (
                "Review My Code"
              )}
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={loadDemoSample}
            >
              Load Demo Sample
            </button>
          </form>
        </article>

        <article className={styles.panel}>
          <h2>Review Results</h2>
          <div className={styles.scoreBadge}>Overall Score: {parsedSections.overallScore}/10</div>

          <div className={styles.sectionsGrid}>
            <div className={styles.sectionCard}>
              <h3>Issues Found</h3>
              <p>{parsedSections.issues || "No issues parsed yet."}</p>
            </div>
            <div className={styles.sectionCard}>
              <h3>Suggestions</h3>
              <p>{parsedSections.suggestions || "No suggestions parsed yet."}</p>
            </div>
            <div className={styles.sectionCard}>
              <h3>Standards Violations</h3>
              <p>{parsedSections.standards || "No standards violations parsed yet."}</p>
            </div>
          </div>

          <div className={styles.markdownBox}>
            {reviewMarkdown ? (
              <ReactMarkdown>{reviewMarkdown}</ReactMarkdown>
            ) : (
              <p className={styles.placeholder}>
                The AI review will appear here in markdown format.
              </p>
            )}
          </div>

          <div className={styles.feedbackControls}>
            <div className={styles.thumbButtons}>
              <button
                type="button"
                onClick={() => setFeedbackChoice(true)}
                className={`${styles.thumbButton} ${feedbackChoice === true ? styles.active : ""}`}
              >
                👍 Helpful
              </button>
              <button
                type="button"
                onClick={() => setFeedbackChoice(false)}
                className={`${styles.thumbButton} ${feedbackChoice === false ? styles.active : ""}`}
              >
                👎 Needs Work
              </button>
            </div>

            <label className={styles.field}>
              Correct the agent
              <input
                value={feedbackCorrection}
                onChange={(event) => setFeedbackCorrection(event.target.value)}
                placeholder="Tell the agent what it got wrong..."
              />
            </label>

            <button
              className={styles.secondaryButton}
              type="button"
              disabled={isSubmittingFeedback}
              onClick={handleFeedbackSubmit}
            >
              {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </article>
      </section>

      <section className={styles.panel}>
        <button
          type="button"
          className={styles.memoryToggle}
          onClick={() => setIsMemoryOpen((previous) => !previous)}
        >
          <span>What has the agent learned?</span>
          <span>{isMemoryOpen ? "Hide" : "Show"}</span>
        </button>

        {isMemoryOpen && (
          <div>
            <div className={styles.memoryHeader}>
              <p>Team memory patterns and lessons captured from previous reviews.</p>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={fetchTeamMemories}
                disabled={isLoadingMemories}
              >
                {isLoadingMemories ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            <ul className={styles.memoryList}>
              {memories.length > 0 ? (
                memories.map((memory, index) => (
                  <li key={`${memory?.id || "memory"}-${index}`}>
                    {memory?.content || memory?.text || JSON.stringify(memory)}
                  </li>
                ))
              ) : (
                <li>No memories loaded yet. Add a team name, then click Refresh.</li>
              )}
            </ul>
          </div>
        )}
      </section>

      {(requestError || feedbackMessage) && (
        <footer className={styles.statusBar}>
          {requestError && <p className={styles.errorText}>Error: {requestError}</p>}
          {feedbackMessage && <p>{feedbackMessage}</p>}
        </footer>
      )}
    </main>
  );
}

export default App;
