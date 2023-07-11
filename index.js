const questions=[
    {
        question:"In which Italian city can you find the Colosseum?",
        answers:[
            {
                text:"Venice",correct:false },
            {
                text:"Rome",correct:true},
            {
                text:"Naples",correct:false },
            {
                text:"Milan",correct:false},
        ]
    },
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {
                text:"Shark",correct:false },
            {
                text:"Blue Whale",correct:true},
            {
                text:"Elephat",correct:false },
            {
                text:"Giraffe",correct:false}
        ]
    },
    {
        question:"In which museum can you find Leonardo Da Vinci’s Mona Lisa?",
        answers:[
            {
                text:"Le Louvre",correct:true },
            {
                text:"Uffizi Museum",correct:false},
            {
                text:"British Museum",correct:false },
            {
                text:"Metropolitan Museum of Art",correct:false}
        ]
    },
    {
        question:"Which famous inventor invented the telephone?",
        answers:[
            {
                text:"Thomas Edison",correct:false },
            {
                text:"Benjamin Franklin",correct:false},
            {
                text:"Alexander Graham Bell",correct:true },
            {
                text:"Nikola Tesla",correct:false}
        ]
    },   
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + "." + currentQuestion.question; 

currentQuestion.answers.forEach(answer => {
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);

});
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
const selectedBtn=e.target;
const isCorrect=selectedBtn.dataset.correct==="true";
if (isCorrect){
    selectedBtn.classList.add("correct");
    score++;
}
else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled=true;

});
nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();}
        else
        {
           showScore(); 
        }
    
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
