const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port

app.use(cors());
app.use(express.json());

const scoresFilePath = path.join(__dirname, "scores.json");

// Load scores from file
function loadScores() {
    if (fs.existsSync(scoresFilePath)) {
        const data = fs.readFileSync(scoresFilePath, "utf-8");
        return JSON.parse(data);
    }
    return [];
}

// Save scores to file
function saveScores(scores) {
    fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2), "utf-8");
}

let scores = loadScores();

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
    saveScores(scores);
    res.status(201).json({ message: "Score added" });
});

// Clear all scores
app.delete("/scores", (req, res) => {
    scores = [];
    saveScores(scores);
    res.json({ message: "Leaderboard cleared" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
