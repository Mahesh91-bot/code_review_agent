# AI Code Review Agent

A hackathon-ready AI code reviewer that combines **LLM reasoning** with **team memory** so feedback gets smarter over time.

This project includes:
- A Node.js + Express backend for review, feedback, and memory APIs
- A React (Vite) frontend with a modern dark IDE-style interface
- Hindsight memory integration to retain team-specific patterns and mistakes
- Groq-powered code review generation with markdown output

---

## Why this project

Most AI code reviewers treat every review like a fresh conversation.  
This agent is different: it remembers how a specific team tends to code and what mistakes they repeatedly make.

That means review feedback becomes:
- More specific to your codebase habits
- More consistent with your team standards
- Better over time as corrections are saved

---

## How Hindsight memory is used

The memory system is powered by Hindsight (Vectorize) and bank-scoped storage.

### Memory lifecycle

1. **Recall before review**
   - Before generating a review, the backend queries Hindsight for relevant team/language memories.
   - These memories are injected into the LLM system prompt as institutional knowledge.

2. **Review generation**
   - Groq model reviews the submitted code with memory context.
   - Output is returned as markdown to the frontend.

3. **Retain new learning**
   - The backend stores a summarized issue pattern from each review back into Hindsight.
   - Memories include metadata such as `type`, `teamName`, `language`, `pattern`, `severity`, `timestamp`.

4. **Feedback-driven correction**
   - User feedback (`thumbs down + correction`) is stored as `type: "correction"`.
   - Future reviews can reference those corrections to avoid repeating poor suggestions.

---

## Tech stack

### Backend
- **Node.js**
- **Express**
- **dotenv**
- **cors**
- **Hindsight API** (memory retain + recall)
- **Groq Chat Completions API**

### Frontend
- **React**
- **Vite**
- **react-markdown**
- **CSS Modules** (custom dark theme UI)

---

## Project structure

```text
code_review_agent/
├── server.js
├── routes/
│   └── review.js
├── services/
│   ├── hindsight.js
│   └── llm.js
├── seed-demo.js
├── demo-code-1.js
├── demo-code-2.js
├── demo-code-3.js
├── .env.example
├── package.json
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## Setup instructions

## 1) Clone and install backend dependencies

```bash
npm install
```

## 2) Configure environment variables

Create `.env` in project root:

```env
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_BANK_ID=codereview
GROQ_API_KEY=your_groq_api_key
PORT=3001
```

You can copy from `.env.example` if needed.

## 3) Start backend

```bash
npm start
```

Backend runs at: `http://localhost:3001`

## 4) Install and run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## API overview

### `POST /api/review`
Submit code for review.

Request body:
```json
{
  "code": "string",
  "language": "JavaScript",
  "filename": "example.js",
  "teamName": "SinTax"
}
```

### `POST /api/feedback`
Submit feedback on a review.

Request body:
```json
{
  "reviewId": "uuid",
  "wasHelpful": false,
  "corrections": "The issue is actually in input validation.",
  "teamName": "SinTax"
}
```

### `GET /api/memories/:teamName`
Get learned memories for a team.

---

## Seeding demo data

Preload sample memories + generate demo snippets:

```bash
node seed-demo.js
```

This creates:
- `demo-code-1.js`
- `demo-code-2.js`
- `demo-code-3.js`

Use these files in the UI to demo team-specific memory-aware reviews.

---

## How the agent learns over time

The learning loop is simple and practical:

- **Step 1:** Team submits code
- **Step 2:** Agent recalls past team issues/standards
- **Step 3:** Agent reviews code using recalled context
- **Step 4:** Review summary is saved as new memory
- **Step 5:** Human feedback is saved as correction memory
- **Step 6:** Next review benefits from all prior knowledge

Over many reviews, the system gradually adapts to:
- Team coding style
- Common bugs and anti-patterns
- Internal standards and evolving conventions

---

## Screenshots

> Add your hackathon demo screenshots here.

### Main dashboard
![Main Dashboard](./docs/screenshots/dashboard.png)

### Review results with memory-aware feedback
![Review Results](./docs/screenshots/review-results.png)

### Agent memory panel
![Memory Panel](./docs/screenshots/memory-panel.png)

> Tip: create `docs/screenshots/` and drop images with matching names.

---

## Hackathon pitch (one-liner)

**An AI code reviewer that remembers your team’s mistakes, adapts to your standards, and improves with every correction.**

