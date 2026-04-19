# SAGE — Stateful Audit & Generation Engine

> **Memory-native AI code review for real engineering teams.**
>
> SAGE combines fast LLM reasoning with persistent team memory so reviews improve over time instead of restarting from zero on every PR.

<p align="left">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/frontend-React-61DAFB?logo=react&logoColor=white" alt="React" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/backend-Node.js-339933?logo=node.js&logoColor=white" alt="Node.js" /></a>
  <a href="https://groq.com/"><img src="https://img.shields.io/badge/LLM-Groq-000000" alt="Groq" /></a>
  <a href="https://hindsight.vectorize.io/"><img src="https://img.shields.io/badge/memory-Hindsight-8A2BE2" alt="Hindsight" /></a>
</p>

---

## The Problem & The Solution

### The Problem: Stateless LLM Amnesia
Most AI code reviewers are **stateless**. They can spot syntax issues in the current snippet, but they forget:
- your team conventions,
- recurring architectural mistakes,
- feedback from earlier PRs,
- and why previous decisions were made.

The result is repetitive, generic feedback and low trust.

### The Solution: SAGE + Hindsight Memory
SAGE solves this by pairing LLM review generation with **persistent vector memory via Hindsight**:
1. Retrieve relevant team memories before review.
2. Inject that context into the model prompt.
3. Generate targeted, team-aware feedback.
4. Save new review signals and human corrections back to memory.

This creates a compounding loop where the reviewer gets sharper with each cycle. 🧠

---

## Demo & Media

- 🎥 **YouTube Demo:** [Insert Video Link Here](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
- 🗺️ **Architecture Diagram:** `docs/architecture/sage-architecture.png` *(add your final diagram here)*

```text
Frontend (React) -> Backend (Express) -> Groq (Review JSON)
                             |
                             -> Hindsight (Recall + Retain Team Memory)
```

---

## Core Features

- **Stateful Team Memory** — persists standards, mistakes, and corrections across reviews.
- **Hyper-Personalized Standards** — reviews adapt to team style and historical decisions.
- **Correction Learning Loop** — user corrections are retained as memory for future inference.
- **Structured Review Output** — review payloads use machine-friendly JSON for robust rendering.
- **Fast Web Console** — React + Tailwind dashboard for submission, scoring, and memory inspection.
- **Memory Recall by Team/Language** — filters context for relevant and precise review grounding.
- **Hackathon-Ready UX** — polished UI, demo flow, and contributor-friendly docs.
- **Extensible Integration Surface** — ready for CI workflows and future GitHub PR automation.

---

## Related Articles

- [How I built a stateful code reviewer with Hindsight](./docs/articles/how-i-built-a-stateful-code-reviewer-with-hindsight.md)
- [What I learned integrating Hindsight into a code pipeline](./docs/articles/hindsight-integration-lessons.md)
- [Why stateless code reviewers fail without Hindsight](./docs/articles/why-stateless-code-reviewers-fail.md)

> Replace these with your published blog URLs when live.

---

## Quick Start

### 1) Clone and install

```bash
git clone https://github.com/YOUR_ORG_OR_USER/code_review_agent.git
cd code_review_agent
npm install
```

### 2) Configure environment

```bash
cp .env.example .env
```

Set required values in `.env`:

```env
PORT=3001
HINDSIGHT_API_KEY=your_hindsight_api_key_here
HINDSIGHT_BANK_ID=codereview
GROQ_API_KEY=your_groq_api_key_here
```

### 3) Start backend

```bash
npm run dev
```

### 4) Start frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

For full setup details, see [`SETUP.md`](./SETUP.md).

---

## Contributors

Thanks to everyone building SAGE. 🚀

- C. Kuldeep Reddy
- Abhinav Gajavelli
- Ch. Arun Sai
- Mahesh Bommagani

Want to contribute? Read [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## License

Released under the [MIT License](./LICENSE).

