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

export default async function handler(req, res) {
    const { action, name, score, date, question, options, correctAnswer } = req.query;

    try {
        if (action === "view") {
            // View all scores
            const snapshot = await scoresCollection.orderBy("score", "desc").get();
            const scores = snapshot.docs.map(doc => doc.data());
            return res.status(200).json(scores);
        } else if (action === "add") {
            // Add a new score
            if (!name || score === undefined || !date) {
                return res.status(400).json({ error: "Invalid data" });
            }
            await scoresCollection.add({ name, score: Number(score), date });
            return res.status(201).json({ message: "Score added" });
        } else if (action === "delete") {
            // Clear all scores
            const snapshot = await scoresCollection.get();
            const batch = db.batch();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            return res.status(200).json({ message: "All scores deleted" });
        } else if (action === "viewQuestions") {
            // View all questions
            const snapshot = await questionsCollection.get();
            const questions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.status(200).json(questions);
        } else if (action === "addQuestion") {
            // Add a new question
            if (!question || !options || !correctAnswer) {
                return res.status(400).json({ error: "Invalid data" });
            }
            await questionsCollection.add({ question, options: JSON.parse(options), correctAnswer });
            return res.status(201).json({ message: "Question added" });
        } else if (action === "deleteQuestions") {
            // Clear all questions
            const snapshot = await questionsCollection.get();
            const batch = db.batch();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            return res.status(200).json({ message: "All questions deleted" });
        } else {
            return res.status(400).json({ error: "Invalid action" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}