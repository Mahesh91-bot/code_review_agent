# SAGE Local Setup Guide

This guide covers end-to-end local setup for **SAGE (Stateful Audit & Generation Engine)**.

## Prerequisites

- **Node.js**: v18+ recommended (v20+ ideal)
- **npm**: v9+ recommended
- **Git**
- **Python**: 3.10+ (for optional Python memory test cases in `TESTING.md`)
- A valid **Groq API key**
- A valid **Hindsight API key** and bank ID

Check your tooling:

```bash
node -v
npm -v
python3 --version
git --version
```

---

## 1) Clone the Repository

```bash
git clone https://github.com/YOUR_ORG_OR_USER/code_review_agent.git
cd code_review_agent
```

---

## 2) Configure Environment Variables

Create a `.env` file in the root:

```bash
cp .env.example .env
```

Required variables:

```env
# Server
PORT=3001

# Hindsight API
HINDSIGHT_API_KEY=your_hindsight_api_key_here
HINDSIGHT_BANK_ID=codereview

# Groq API
GROQ_API_KEY=your_groq_api_key_here
```

> Never commit real secrets. Keep `.env` local only.

---

## 3) Backend Setup (Express API)

From repository root:

```bash
npm install
npm run dev
```

Expected:
- API starts on `http://localhost:3001`
- Health check works:

```bash
curl http://localhost:3001/health
```

Expected response:

```json
{ "status": "ok" }
```

---

## 4) Frontend Setup (React + Vite)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Expected:
- Frontend runs on `http://localhost:3000`
- Dashboard can submit review requests to backend on port `3001`

---

## 5) Verify the Full Pipeline

1. Open `http://localhost:3000`
2. Go to dashboard
3. Enter:
   - Team name
   - Language
   - Filename
   - Code snippet
4. Submit review
5. Confirm:
   - Review cards render issues/suggestions/team notes
   - Score appears
   - Feedback submissions persist corrections

---

## 6) Troubleshooting

### Frontend blank screen

- Confirm Vite is running in `frontend/`
- Check browser console for runtime errors
- Reinstall deps:
  ```bash
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  npm run dev
  ```

### API errors from frontend

- Confirm backend is running on port `3001`
- Verify `PORT` in `.env`
- Check backend terminal logs for route/LLM/Hindsight errors

### Hindsight errors

- Validate `HINDSIGHT_API_KEY`
- Validate `HINDSIGHT_BANK_ID`
- Ensure key has permission for memory retain/recall in that bank

### Groq errors

- Validate `GROQ_API_KEY`
- Check model access and usage limits

---

## 7) Optional: Demo Data Seed

From repository root:

```bash
node seed-demo.js
```

This generates demo snippets you can use during hackathon demos.

