// variables
const startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
   questionEl.innerText = question.question
   question.answers.forEach(answer => {
       var button = document.createElement("button")
       button.innerText = answer.text
       button.classList.add("btn")
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsEl.appendChild(button)
   })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide")  
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            {text: "strings", correct: false}, {text: "booleans", correct: false}, {text: "numbers", correct: false}, {text:"alerts", correct: true}
        ]
    },
    {
        question: "How do you write a comment in JavaScript?",
        answers: [
            {text: "<!-- This is a comment -->", correct: false}, {text: "// This is a comment", correct: true},
            {text: "'This is a comment'", correct: false}, {text:"/* This is a comment */", correct: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            {text: "booleans", correct: false}, {text: "other arrays", correct: false}, 
            {text: "numbers and strings", correct: false}, {text:"all of the above", correct: true}
        ]
    },
    {
        question: "The condition of an if/else statement is enclosed with ____.",
        answers: [
            {text: "parenthesis", correct: false}, {text: "quotes", correct: false}, 
            {text: "curly brackets", correct: true}, {text: "square brackets", correct: false}
        ]
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: [
            {text: "quotes", correct: true}, {text: "commas", correct: false},
            {text: "parenthesis", correct: false}, {text: "square brackets", correct: false}
        ]
    }
]