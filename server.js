require("dotenv").config();

const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/review");

const app = express();
const PORT = process.env.PORT || 3001;

// Keep middleware at the very top so every request is handled consistently.
app.use(cors());
app.use(express.json());

// Health route for quick checks.
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Main API routes.
app.use("/api", reviewRoutes);

app.listen(PORT, () => {
  console.log(`AI Code Review Agent backend running on port ${PORT}`);
});
