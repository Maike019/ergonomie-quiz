import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
    });
}
const db = admin.firestore();
const scoresCollection = db.collection("scores");

async function loadScores() {
    const snapshot = await scoresCollection.orderBy("score", "desc").get();
    return snapshot.docs.map(doc => doc.data());
}
// Score speichern
db.collection("scores").add({
    name: "Spieler1",  // Optional: Namen erfassen
    score: score,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
// Score laden
  db.collection("scores")
  .orderBy("score", "desc")
  .limit(10)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // z. B. in eine Tabelle schreiben
      console.log(`${data.name}: ${data.score}`);
    });
  });
  
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
        // Return all scores
        const scores = await loadScores();
        res.status(200).json(scores);
    } else if (req.method === "POST") {
        // Add a new score
        const { name, score, date } = req.body;
        if (!name || score === undefined || !date) {
            return res.status(400).json({ error: "Invalid data" });
        }
        await saveScore({ name, score, date });
        res.status(201).json({ message: "Score added" });
    } else if (req.method === "DELETE") {
        // Clear all scores
        await clearScores();
        res.status(200).json({ message: "Leaderboard cleared" });
    } else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
