const QUESTIONS = [
    {
        question: "Was ist die optimale Sitzhöhe für einen Bürostuhl?",
        answer: "45 cm",
        hint: "Zwischen 40 und 50 cm.",
    },
    {
        question: "Wie oft sollte man während der Arbeit am Schreibtisch aufstehen?",
        answer: ["Alle 30 Minuten", "30 Minuten"],
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
        answer: ["2-3", "2", "3"],
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
let playerName = "";

// Shuffle questions and limit to 10
function shuffleQuestions() {
    QUESTIONS.sort(() => Math.random() - 0.5);
    QUESTIONS.splice(10); // Limit to 10 questions
}

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const hintButton = document.getElementById("hint-button");
const hintElement = document.getElementById("hint");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");
const leaderboardButton = document.getElementById("leaderboard-button");
const leaderboardElement = document.getElementById("leaderboard");
const skipButton = document.getElementById("skip-button"); // Get the skip button

const returnButton = document.createElement("button");
returnButton.textContent = "Zurück";
returnButton.id = "return-button";
returnButton.style.display = "none";
document.body.appendChild(returnButton);

// Adjust the logo position
const logoElement = document.getElementById("logo");
if (logoElement) {
    logoElement.style.marginTop = "10px"; // Move the logo higher
}

function showQuestion() {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    questionElement.innerHTML = `<h3>${currentQuestion.question}</h3>`;
    hintElement.textContent = "";
    answersElement.innerHTML = `
        <input type="text" id="user-answer" placeholder="Ihre Antwort" class="input-field">
        <button id="submit-answer" class="btn-primary">Antwort prüfen</button>
    `;
    toggleHintAndNextButton(true);

    const userAnswerInput = document.getElementById("user-answer");
    const submitAnswerButton = document.getElementById("submit-answer");

    // Add fade-in animation
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.style.animation = "fadeIn 0.5s ease-in-out";

    // Add event listener for the dynamically created button
    submitAnswerButton.addEventListener("click", checkAnswer);

    // Add event listener for the Enter key
    userAnswerInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
}

function checkAnswer() {
    const userAnswer = document.getElementById("user-answer").value.trim().toLowerCase();
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const correctAnswer = Array.isArray(currentQuestion.answer)
        ? currentQuestion.answer.map(a => a.toLowerCase())
        : [currentQuestion.answer.toLowerCase()];

    if (correctAnswer.includes(userAnswer)) {
        alert("Richtig!");
        score++;
    } else {
        alert(`Falsch! Die richtige Antwort ist: ${currentQuestion.answer}`);
    }

    currentQuestionIndex++;
    currentQuestionIndex < QUESTIONS.length ? showQuestion() : endQuiz();
}

function showHint() {
    hintElement.innerHTML = `<p class="hint-text">Hinweis: ${QUESTIONS[currentQuestionIndex].hint}</p>`;
    toggleHintAndNextButton(false);
}

function toggleHintAndNextButton(showHint) {
    hintButton.style.display = showHint ? "inline-block" : "none";
    nextButton.style.display = showHint ? "none" : "inline-block";
}

function showResult() {
    resultElement.classList.remove("hidden");
    resultElement.innerHTML = `
        <h2>Herzlichen Glückwunsch!</h2>
        <p>Sie haben <strong>${score}</strong> von <strong>${QUESTIONS.length}</strong> Fragen richtig beantwortet!</p>
        <button id="restart-quiz" class="btn-primary">Quiz neu starten</button>
    `;

    // Add event listener for the restart button
    document.getElementById("restart-quiz").addEventListener("click", restartQuiz);
}

function showScore() {
    scoreElement.innerHTML = `
        <h2>Ihr Punktestand</h2>
        <p>${playerName}, Sie haben <strong>${score}</strong> Punkte erreicht!</p>
        <button id="save-score" class="btn-primary">Punktestand speichern</button>
        <button id="show-leaderboard" class="btn-secondary">Leaderboard anzeigen</button>
    `;
    resultElement.appendChild(scoreElement); }
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestions();
    resultElement.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
}

function saveScore() {
    if (!playerName) return;

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score, date: new Date().toLocaleString() });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardContent;

    if (playerName.toLowerCase() === "maike") {
        // Show the full leaderboard for Maike
        leaderboardContent = leaderboard.length === 0 
            ? "<p>Keine Einträge vorhanden.</p>" 
            : leaderboard.map((entry, index) => 
                `<p>${index + 1}. <strong>${entry.name}</strong> - ${entry.score} Punkte</p>`
              ).join("");
    } else {
        // Show only the current user's score for others
        const userScore = leaderboard.find(entry => entry.name.toLowerCase() === playerName.toLowerCase());
        leaderboardContent = userScore 
            ? `<p><strong>${userScore.name}</strong> - ${userScore.score} Punkte</p>`
            : "<p>Keine Einträge für Sie vorhanden.</p>";
    }

    leaderboardElement.innerHTML = `
        <h2>Leaderboard</h2>
        ${leaderboardContent}
        ${playerName.toLowerCase() === "maike" 
            ? `<button id="clear-leaderboard" class="btn-secondary">Leaderboard löschen</button>` 
            : ""} <!-- Show delete button only for Maike -->
        <button id="close-leaderboard" class="btn-secondary">Zurück</button>
    `;

    leaderboardElement.classList.remove("hidden");
    returnButton.style.display = "none";
    document.getElementById("quiz").classList.add("hidden");

    // Add event listeners for the buttons
    if (playerName.toLowerCase() === "maike") {
        document.getElementById("clear-leaderboard").addEventListener("click", clearLeaderboard);
    }
    document.getElementById("close-leaderboard").addEventListener("click", closeLeaderboard);
}

function clearLeaderboard() {
    if (confirm("Möchten Sie das Leaderboard wirklich löschen?")) {
        localStorage.removeItem("leaderboard");
        alert("Leaderboard wurde gelöscht.");
        showLeaderboard(); // Refresh the leaderboard display
    }
}

function closeLeaderboard() {
    leaderboardElement.classList.add("hidden");
    returnButton.style.display = "none";
    document.getElementById("quiz").classList.remove("hidden");
}

function endQuiz() {
    saveScore();
    showResult();
}

function startQuiz() {
    document.getElementById("player-name-container").classList.remove("hidden");
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("leaderboard").classList.add("hidden");

    // Add a welcoming message
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Viel Erfolg beim Quiz!";
    welcomeMessage.style.fontSize = "18px";
    welcomeMessage.style.marginTop = "10px";
    document.getElementById("player-name-container").appendChild(welcomeMessage);
}

function submitPlayerName() {
    const nameInput = document.getElementById("player-name").value.trim();

    if (!nameInput) {
        alert("Bitte geben Sie einen Namen ein, um das Quiz zu starten.");
        return;
    }

    playerName = nameInput;

    // Show the leaderboard button only for Maike
    const leaderboardButton = document.getElementById("leaderboard-button");
    if (playerName.toLowerCase() === "maike") {
        leaderboardButton.classList.remove("hidden");
    } else {
        leaderboardButton.classList.add("hidden");
    }

    document.getElementById("player-name-container").style.display = "none"; // Hide the input container
    document.getElementById("quiz").style.display = "block"; // Show the quiz
    shuffleQuestions();
    showQuestion();
    document.getElementById("player-name").value = ""; // Clear the input field
}

function skipQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < QUESTIONS.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Event listeners
document.getElementById("submit-name-button").addEventListener("click", submitPlayerName);
hintButton.addEventListener("click", showHint);
leaderboardButton.addEventListener("click", showLeaderboard);
skipButton.addEventListener("click", skipQuestion);

// Start the quiz
startQuiz();