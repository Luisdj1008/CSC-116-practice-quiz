// Sample pool of 10 questions
const questionPool = [
    { question: "What is the primary function of a CPU?", options: ["Store data", "Execute instructions", "Display graphics", "Transmit data"], answer: "Execute instructions" },
    { question: "What is RAM primarily used for?", options: ["Permanent storage", "Booting the computer", "Temporary storage", "Connecting peripherals"], answer: "Temporary storage" },
    { question: "What does SSD stand for?", options: ["Solid-State Drive", "System Storage Device", "Simple Storage Disk", "Static Storage Drive"], answer: "Solid-State Drive" },
    { question: "Which slot is used for graphics cards?", options: ["PCIe x1", "PCIe x16", "USB", "SATA"], answer: "PCIe x16" },
    { question: "What measures CPU temperature and regulates fan speed?", options: ["BIOS", "UEFI", "Thermal sensor", "Chipset"], answer: "Thermal sensor" },
    { question: "Which memory is non-volatile?", options: ["RAM", "Cache", "ROM", "Registers"], answer: "ROM" },
    { question: "What does BIOS stand for?", options: ["Basic Input Output System", "Binary Integrated OS", "Boot Instruction OS", "Basic Integrated OS"], answer: "Basic Input Output System" },
    { question: "Which connector delivers power to the motherboard?", options: ["8-pin EPS", "24-pin ATX", "4-pin Molex", "6-pin PCIe"], answer: "24-pin ATX" },
    { question: "What is the unit for CPU clock speed?", options: ["Hz", "Bps", "RPM", "Ohm"], answer: "Hz" },
    { question: "Which technology allows multiple OS instances on one host?", options: ["Overclocking", "Virtualization", "Caching", "Multithreading"], answer: "Virtualization" }
];

// Shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Get random questions (demo 5 questions)
function getRandomQuestions() {
    return shuffle([...questionPool]).slice(0, 5);
}

let selectedQuestions = [];

function startQuiz() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("scoreContainer").style.display = "none";
    selectedQuestions = getRandomQuestions();
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById("quizForm");
    container.innerHTML = "";
    selectedQuestions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        q.options.forEach(opt => {
            div.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label><br>`;
        });
        container.appendChild(div);
    });
}

function submitQuiz() {
    let score = 0;
    selectedQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const div = document.getElementsByClassName("question")[index];
        const radios = div.querySelectorAll("input");
        radios.forEach(radio => {
            if (radio.value === q.answer) {
                radio.parentElement.classList.add("correct");
            }
            if (radio.checked && radio.value !== q.answer) {
                radio.parentElement.classList.add("incorrect");
            }
            radio.disabled = true;
        });
        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    document.getElementById("score").innerText = score + " / " + selectedQuestions.length;
    document.getElementById("scoreContainer").style.display = "block";
    document.getElementById("quizContainer").style.display = "none";
}

function newQuiz() {
    document.getElementById("startButton").style.display = "inline-block";
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("scoreContainer").style.display = "none";
}
