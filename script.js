const questions =[
    {
        ques:"What is the capital of France?",
        ans:[
            {text:"London", correct:false},
            {text:"Berlin", correct:false},
            {text:"Paris", correct:true},
            {text:"Madrid", correct:false}
        ]
    },
    {
        ques:"What is the largest planet in our solar system?",
        ans:[
            {text:"Earth", correct:false},
            {text:"Jupiter", correct:true},
            {text:"Mars", correct:false},
            {text:"Saturn", correct:false}
        ]
    },
    {
        ques:"What is the chemical symbol for water?",
        ans:[
            {text:"H2O", correct:true},
            {text:"CO2", correct:false},
            {text:"O2", correct:false},
            {text:"NaCl", correct:false}
        ]
    },
    {   ques:"Who wrote 'To Kill a Mockingbird'?",
        ans:[
            {text:"Mark Twain", correct:false},
            {text:"Ernest Hemingway", correct:false},
            {text:"F. Scott Fitzgerald", correct:false},
            {text:"Harper Lee", correct:true}
        ]
    },
    {
        ques:"What is the smallest country in the world?",
        ans:[
            {text:"Monaco", correct:false},
            {text:"San Marino", correct:false},
            {text:"Vatican City", correct:true},
            {text:"Liechtenstein", correct:false}
        ]
    }
];
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.ques;

    currentQuestion.ans.forEach(ans => {
        const button = document.createElement('button');
        button.innerHTML = ans.text;
        button.classList.add('btn');
        answerButtonsElement.appendChild(button);
        if (ans.correct) {
            button.dataset.correct = ans.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct=="true";
    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    }else {
        selectedButton.classList.add('wrong');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}    
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}    
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
       handleNextButton();
    }else{
        startQuiz();
    }
});   
startQuiz();