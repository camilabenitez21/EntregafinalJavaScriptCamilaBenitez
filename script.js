// Variables globales
let currentQuestion = 0;
let score = 0;
let questions = [];

// Elementos del DOM
const startContainer = document.getElementById("start-container");
const gameContainer = document.getElementById("game-container");
const questionContainer = document.getElementById("question-container");
const imageContainer = document.getElementById("image-container");
const optionsContainer = document.getElementById("options-container");
const scoreContainer = document.getElementById("score-container");
const scoreValue = document.getElementById("score");

// Event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("play-again-button").addEventListener("click", startGame);
optionsContainer.addEventListener("click", checkAnswer);

// Funciones
function startGame() {
    // Ocultar pantalla de inicio
    startContainer.style.display = "none";
    // Mostrar pantalla del juego
    gameContainer.style.display = "block";
    // Cargar preguntas desde archivo JSON
    fetch("questions.json")
        .const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    // Función para generar la pregunta y sus opciones de respuesta
    function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
        function showQuestions(questions, quizContainer) {
            const output = [];
            let answers;

            for (let i = 0; i < questions.length; i++) {
                answers = [];
                for (letter in questions[i].answers) {
                    answers.push(
                        `<label>
                <input type="radio" name="question${i}" value="${letter}">
                    ${letter} :
                    ${questions[i].answers[letter]}
                </label>`
                    );
                }

                output.push(
                `<div class="question"> ${questions[i].question} </div>
                <div class="answers"> ${answers.join('')} </div>`
                );
            }
            quizContainer.innerHTML = output.join('');
        }

        function showResults(questions, quizContainer, resultsContainer) {
            const answerContainers = quizContainer.querySelectorAll('.answers');

            let numCorrect = 0;
        }
            for (let i = 0; i < questions.length; i++) {
                const answerContainer = answerContainers[i];
                const selector = `input[name=question${i}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                if (userAnswer === questions[i].correctAnswer) {
                    numCorrect++;

                    answerContainers[i].style.color = 'lightgreen';
                } else {
                    answerContainers[i].style.color = 'red';
                }
            }
            resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
        }
    

        showQuestions(questions, quizContainer);

        submitButton.addEventListener('click', () => {
            showResults(questions, quizContainer, resultsContainer);
        });
    }

    // Obtener las preguntas desde el archivo JSON usando Fetch
    fetch('questions.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            generateQuiz(data, quizContainer, resultsContainer, submitButton);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });

    