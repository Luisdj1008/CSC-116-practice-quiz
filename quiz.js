
// Pool of 100 questions
const questionPool = [
    {
        question: "What is the primary function of a CPU?",
        options: ["Store data", "Execute instructions", "Display graphics", "Transmit data"],
        answer: "Execute instructions"
    },
    {
        question: "What is RAM primarily used for?",
        options: ["Permanent storage", "Booting the computer", "Temporary storage", "Connecting peripherals"],
        answer: "Temporary storage"
    },
    {
        question: "What is the role of a hypervisor in virtualization?",
        options: ["Encrypt data", "Manage user access", "Enable multiple VMs on one host", "Transfer files"],
        answer: "Enable multiple VMs on one host"
    },
    {
        question: "Which of the following is a type of hypervisor that runs directly on hardware?",
        options: ["Type 2", "Type 1", "VirtualBox", "VMware Workstation"],
        answer: "Type 1"
    },
    {
        question: "Which backup type captures the exact state of a VM at a specific moment?",
        options: ["Image", "Clone", "Snapshot", "Mirror"],
        answer: "Snapshot"
    },
    {
        question: "What does SaaS stand for in cloud computing?",
        options: ["Software as a Service", "Security as a Service", "Storage as a Service", "System as a Service"],
        answer: "Software as a Service"
    },
    {
        question: "What is the main goal of change management in IT?",
        options: ["Prevent hacking", "Control and document changes", "Install antivirus", "Improve GUI"],
        answer: "Control and document changes"
    },
    {
        question: "Which cloud service model provides infrastructure like servers and storage?",
        options: ["PaaS", "SaaS", "IaaS", "DBaaS"],
        answer: "IaaS"
    },
    {
        question: "Which protocol is commonly used to encrypt data over networks?",
        options: ["FTP", "HTTP", "SSL/TLS", "POP3"],
        answer: "SSL/TLS"
    },
    {
        question: "In troubleshooting, what is the first step?",
        options: ["Test the solution", "Implement the fix", "Identify the problem", "Reboot the system"],
        answer: "Identify the problem"
    }
    // Add 90 more questions here for a complete pool of 100
];

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Select 50 random questions from pool
function getRandomQuestions() {
    return shuffle([...questionPool]).slice(0, 50);
}

let selectedQuestions = getRandomQuestions();

function renderQuiz() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "";
    selectedQuestions.forEach((q, index) => {
        const qDiv = document.createElement("div");
        qDiv.className = "question";
        qDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        q.options.forEach((opt, i) => {
            const id = `q${index}_opt${i}`;
            qDiv.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${opt}" id="${id}">
                    ${opt}
                </label><br>`;
        });
        container.appendChild(qDiv);
    });
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("new-btn").style.display = "none";
    document.getElementById("score").innerText = "";
}

function submitQuiz() {
    let score = 0;
    selectedQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const correct = q.answer;
        const questionDiv = document.getElementsByClassName("question")[index];
        const radios = questionDiv.querySelectorAll("input[type='radio']");

        radios.forEach(radio => {
            if (radio.value === correct) {
                radio.parentElement.style.backgroundColor = "#d4edda";
            }
            if (radio.checked && radio.value !== correct) {
                radio.parentElement.style.backgroundColor = "#f8d7da";
            }
            radio.disabled = true;
        });

        if (selected && selected.value === correct) {
            score++;
        }
    });

    document.getElementById("score").innerText = `You scored ${score} out of ${selectedQuestions.length}`;
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("new-btn").style.display = "inline-block";
}

function newQuiz() {
    selectedQuestions = getRandomQuestions();
    renderQuiz();
}

window.onload = renderQuiz;
