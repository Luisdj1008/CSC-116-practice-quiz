
const questionPool = [...window.questionPool]; // Assume this is loaded from somewhere
let currentQuestions = [];

function startQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    currentQuestions = getRandomQuestions(50);

    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionTitle = document.createElement("p");
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        q.choices.forEach((choice, i) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = i;

            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement("br"));
        });

        quizContainer.appendChild(questionDiv);
    });

    document.getElementById("submit-btn").style.display = "inline-block";
}

function getRandomQuestions(count) {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function submitQuiz() {
    let score = 0;

    currentQuestions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        let selected = -1;
        radios.forEach((radio, i) => {
            if (radio.checked) {
                selected = parseInt(radio.value);
            }
        });

        const correctIndex = q.answer;
        const allLabels = Array.from(radios).map(r => r.parentElement);

        allLabels.forEach((label, i) => {
            if (i === correctIndex) {
                label.style.backgroundColor = "#c8e6c9"; // green for correct
            }
            if (i === selected && i !== correctIndex) {
                label.style.backgroundColor = "#ffcdd2"; // red for wrong
            }
        });

        if (selected === correctIndex) {
            score++;
        }
    });

    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `Your Score: ${score} / ${currentQuestions.length}`;
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("submit-btn").addEventListener("click", submitQuiz);
