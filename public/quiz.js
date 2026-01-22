// Quiz Questions Data (5-10 MCQs)
const QUIZ_QUESTIONS = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2 // Index of correct answer (0-based)
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        correct: 0
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Tiger", "Lion", "Elephant", "Bear"],
        correct: 1
    },
    {
        question: "What year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = []; // Track all user answers

// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const currentQuestionNum = document.getElementById('currentQuestionNum');
const totalQuestionsDisplay = document.getElementById('totalQuestionsDisplay');
const totalQuestions = document.getElementById('totalQuestions');
const progressFill = document.getElementById('progressFill');
const finalScore = document.getElementById('finalScore');
const totalScore = document.getElementById('totalScore');
const scorePercentage = document.getElementById('scorePercentage');
const scoreMessage = document.getElementById('scoreMessage');

// Initialize
function init() {
    const total = QUIZ_QUESTIONS.length;
    totalQuestions.textContent = total;
    totalQuestionsDisplay.textContent = total;
    totalScore.textContent = total;
}

// Show a specific screen
function showScreen(screen) {
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    screen.classList.add('active');
}

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    showScreen(quizScreen);
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    
    // Update question number and progress
    currentQuestionNum.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Display question text
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'option';
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectOption(index, optionButton));
        optionsContainer.appendChild(optionButton);
    });
    
    // Reset selected answer and disable Next button
    selectedAnswer = null;
    nextButton.disabled = true;
}

// Handle option selection
function selectOption(index, buttonElement) {
    // Remove previous selection
    const allOptions = optionsContainer.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark selected option
    buttonElement.classList.add('selected');
    selectedAnswer = index;
    
    // Enable Next button
    nextButton.disabled = false;
}

// Move to next question or show results
function nextQuestion() {
    if (selectedAnswer === null) {
        return; // Should not happen due to disabled button, but safety check
    }
    
    // Store user's answer
    userAnswers.push(selectedAnswer);
    
    // Check if answer is correct
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Move to next question or show results
    currentQuestionIndex++;
    
    if (currentQuestionIndex < QUIZ_QUESTIONS.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show results screen
function showResults() {
    showScreen(resultsScreen);
    
    // Display score
    finalScore.textContent = score;
    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((score / total) * 100);
    scorePercentage.textContent = percentage + '%';
    
    // Display message based on score
    if (percentage >= 90) {
        scoreMessage.textContent = "Outstanding! You're a quiz master!";
    } else if (percentage >= 70) {
        scoreMessage.textContent = "Great job! Well done!";
    } else if (percentage >= 50) {
        scoreMessage.textContent = "Good effort! Keep practicing!";
    } else {
        scoreMessage.textContent = "Nice try! Review and try again!";
    }
    
    // Display summary statistics
    displaySummaryStats(score, total);
    
    // Display detailed question breakdown
    displayDetailedResults();
}

// Display summary statistics
function displaySummaryStats(correct, total) {
    document.getElementById('summaryTotal').textContent = total;
    document.getElementById('summaryCorrect').textContent = correct;
    document.getElementById('summaryIncorrect').textContent = total - correct;
}

// Display detailed results for each question
function displayDetailedResults() {
    const breakdownContainer = document.getElementById('questionsBreakdown');
    breakdownContainer.innerHTML = ''; // Clear any previous content
    
    QUIZ_QUESTIONS.forEach((question, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === question.correct;
        const userAnswerText = question.options[userAnswerIndex];
        const correctAnswerText = question.options[question.correct];
        
        // Create question result item
        const questionItem = document.createElement('div');
        questionItem.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;
        
        // Question number and status icon
        const statusIcon = isCorrect ? '✓' : '✗';
        const statusClass = isCorrect ? 'status-correct' : 'status-incorrect';
        
        questionItem.innerHTML = `
            <div class="question-result-header">
                <span class="question-number">Question ${index + 1}</span>
                <span class="status-icon ${statusClass}">${statusIcon}</span>
            </div>
            <div class="question-result-content">
                <p class="result-question-text">${question.question}</p>
                <div class="answer-comparison">
                    <div class="answer-item">
                        <span class="answer-label">Your Answer:</span>
                        <span class="answer-text ${isCorrect ? 'correct-answer' : 'incorrect-answer'}">${userAnswerText}</span>
                    </div>
                    ${!isCorrect ? `
                    <div class="answer-item">
                        <span class="answer-label">Correct Answer:</span>
                        <span class="answer-text correct-answer">${correctAnswerText}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        breakdownContainer.appendChild(questionItem);
    });
}

// Restart quiz
function restartQuiz() {
    startQuiz();
}

// Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Check if user is logged in (optional security)
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Optional: redirect to login if not authenticated
        // window.location.href = 'login.html';
    }
    
    // Initialize the quiz
    init();
});
