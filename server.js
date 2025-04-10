const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let scores = [];

// Get all scores
app.get("/scores", (req, res) => {
    res.json(scores);
});

// Add a new score
app.post("/scores", (req, res) => {
    const { name, score, date } = req.body;
    if (!name || score === undefined || !date) {
        return res.status(400).json({ error: "Invalid data" });
    }
    scores.push({ name, score, date });
    scores.sort((a, b) => b.score - a.score);
    res.status(201).json({ message: "Score added" });
});

// Clear all scores
app.delete("/scores", (req, res) => {
    scores = [];
    res.json({ message: "Leaderboard cleared" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
