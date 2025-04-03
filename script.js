const QUESTIONS = [
    {
        question: "Was ist die optimale Sitzhöhe für einen Bürostuhl?",
        answer: "45 cm",
        hint: "Zwischen 40 und 50 cm.",
    },
    {
        question: "Wie oft sollte man während der Arbeit am Schreibtisch aufstehen?",
        answer: "Alle 30 Minuten",
        hint: "Es ist weniger als eine Stunde.",
    },
    {
        question: "Wie weit sollte der Bildschirm von den Augen entfernt sein?",
        answer: "50-70 cm",
        hint: "Zwischen 50 und 70 cm.",
    },
    {
        question: "Welche Haltung sollte der Rücken beim Sitzen haben?",
        answer: ["Aufrecht", "Entspannt"],
        hint: "Nicht krumm und nicht angespannt.",
    },
    {
        question: "Wie viele Stunden sollte man maximal am Stück sitzen?",
        answer: "2 Stunden",
        hint: "Es ist weniger als 3 Stunden.",
    },
    {
        question: "Wie hoch sollte die Oberkante des Bildschirms sein?",
        answer: "Auf Augenhöhe",
        hint: "Es ist die Höhe der Augen.",
    },
    {
        question: "Welche Art von Maus wird für ergonomisches Arbeiten empfohlen?",
        answer: "Vertikale Maus",
        hint: "Es ist eine spezielle Form der Maus.",
    },
    {
        question: "Wie viele Schritte pro Tag werden für eine gesunde Arbeitsweise empfohlen?",
        answer: "10.000",
        hint: "Es ist eine fünfstellige Zahl.",
    },
    {
        question: "Welche Art von Beleuchtung ist am besten für die Augen?",
        answer: "Indirekte Beleuchtung",
        hint: "Es ist nicht direkt.",
    },
    {
        question: "Wie sollte der Bildschirm geneigt sein?",
        answer: "15-20 Grad",
        hint: "Zwischen 10 und 30 Grad.",
    },
    {
        question: "Welche Art von Stuhl wird für langes Sitzen empfohlen?",
        answer: "Ergonomischer Stuhl",
        hint: "Es ist ein spezieller Stuhl.",
    },
    {
        question: "Wie oft sollte man die Augen vom Bildschirm abwenden?",
        answer: "Alle 20 Minuten",
        hint: "Es ist weniger als eine halbe Stunde.",
    },
    {
        question: "Wie hoch sollte die relative Luftfeuchtigkeit im Büro sein?",
        answer: "40-60%",
        hint: "Zwischen 40 und 60 Prozent.",
    },
    {
        question: "Wie viele Stunden Schlaf werden für optimale Arbeitsleistung empfohlen?",
        answer: "7-9 Stunden",
        hint: "Zwischen 7 und 9 Stunden.",
    },
    {
        question: "Wie viele Pausen sollte man bei einer 8-Stunden-Schicht machen?",
        answer: "2-3",
        hint: "Zwischen 2 und 3 Pausen.",
    },
    {
        question: "Wie sollte die Beleuchtungsstärke am Arbeitsplatz sein?",
        answer: "500 Lux",
        hint: "Es ist eine dreistellige Zahl.",
    },
    {
        question: "Wie sollte der Bildschirm bei Tageslicht positioniert sein?",
        answer: "Seitlich zum Fenster",
        hint: "Nicht direkt vor oder hinter dem Fenster.",
    },
    {
        question: "Wie viele Stunden Bildschirmzeit pro Tag gelten als ungesund?",
        answer: "Mehr als 6 Stunden",
        hint: "Es ist mehr als 5 Stunden.",
    },
    {
        question: "Wie oft sollte man Dehnübungen während der Arbeit machen?",
        answer: "Alle 2 Stunden",
        hint: "Es ist weniger als 3 Stunden.",
    },
    {
        question: "Welche Farbe wird oft für ergonomische Beleuchtung empfohlen?",
        answer: "Warmweiß",
        hint: "Es ist eine warme Lichtfarbe.",
    },
    {
        question: "Wie hoch sollte der Schreibtisch für ergonomisches Arbeiten sein?",
        answer: "72-75 cm",
        hint: "Zwischen 70 und 80 cm.",
    },
    {
        question: "Wie oft sollte man die Sitzposition wechseln?",
        answer: "Regelmäßig",
        hint: "Es ist häufiger als selten.",
    },
    {
        question: "Wie sollte der Winkel zwischen Ober- und Unterarm beim Tippen sein?",
        answer: "90 Grad",
        hint: "Es ist ein rechter Winkel.",
    },
    {
        question: "Wie sollte die Tastatur positioniert sein?",
        answer: "Flach",
        hint: "Nicht geneigt.",
    },
    {
        question: "Welche Art von Monitor wird für ergonomisches Arbeiten empfohlen?",
        answer: "Entspiegelter Monitor",
        hint: "Es reduziert Reflexionen.",
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const hintButton = document.getElementById("hint-button");
const hintElement = document.getElementById("hint");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    hintElement.textContent = "";
    answersElement.innerHTML = `
        <input type="text" id="user-answer" placeholder="Ihre Antwort">
    `;
    hintButton.style.display = "inline-block";
    nextButton.style.display = "none";
}

function checkAnswer() {
    const userAnswer = document.getElementById("user-answer").value.trim();
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        alert("Richtig!");
        score++;
    } else {
        alert(`Falsch! Die richtige Antwort ist: ${currentQuestion.answer}`);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < QUESTIONS.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showHint() {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    hintElement.textContent = `Hinweis: ${currentQuestion.hint}`;
    hintButton.style.display = "none";
    nextButton.style.display = "inline-block";
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.textContent = `Sie haben ${score} von ${QUESTIONS.length} Fragen richtig beantwortet!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
}

hintButton.addEventListener("click", showHint);
nextButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
showQuestion();