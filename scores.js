import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
    });
}
const db = admin.firestore();
const scoresCollection = db.collection("scores");
const questionsCollection = db.collection("questions");

async function loadScores() {
    const snapshot = await scoresCollection.orderBy("score", "desc").get();
    return snapshot.docs.map(doc => doc.data());
}

async function loadQuestions() {
    const snapshot = await questionsCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function checkAnswer(questionId, answer) {
    const questionDoc = await questionsCollection.doc(questionId).get();
    if (!questionDoc.exists) {
        throw new Error("Question not found");
    }
    const correctAnswer = questionDoc.data().correctAnswer;
    return correctAnswer === answer;
}

async function saveScore(score) {
    await scoresCollection.add(score);
}

async function clearScores() {
    const snapshot = await scoresCollection.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
}

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { type } = req.query;

        if (type === "questions") {
            // Return all quiz questions
            const questions = await loadQuestions();
            return res.status(200).json(questions);
        } else {
            // Return all scores
            const scores = await loadScores();
            return res.status(200).json(scores);
        }
    } else if (req.method === "POST") {
        const { type } = req.query;

        if (type === "answer") {
            // Check quiz answer
            const { questionId, answer, name } = req.body;
            if (!questionId || !answer || !name) {
                return res.status(400).json({ error: "Invalid data" });
            }
            try {
                const isCorrect = await checkAnswer(questionId, answer);
                if (isCorrect) {
                    await saveScore({ name, score: 10, date: new Date().toISOString() });
                    return res.status(200).json({ message: "Correct answer!" });
                } else {
                    return res.status(200).json({ message: "Wrong answer!" });
                }
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        } else {
            // Add a new score
            const { name, score, date } = req.body;
            if (!name || score === undefined || !date) {
                return res.status(400).json({ error: "Invalid data" });
            }
            await saveScore({ name, score, date });
            return res.status(201).json({ message: "Score added" });
        }
    } else if (req.method === "DELETE") {
        // Clear all scores
        await clearScores();
        res.status(200).json({ message: "Leaderboard cleared" });
    } else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
