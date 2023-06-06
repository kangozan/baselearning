// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Apakah ini gambar CPU?",
        imgSrc : "img/1.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "ya ndak tau",
        correct : "A"
    },{
        question : "Apakah ini gambar Motherboard?",
        imgSrc : "img/2.jpg",
        choiceA : "Salah",
        choiceB : "ya ndak tau",
        choiceC : "Benar",
        correct : "C"
    },{
        question : "Apakah ini gambar RAM (Random Access Memory)?",
        imgSrc : "img/3.jpg",
        choiceA : "Salah",
        choiceB : "Benar",
        choiceC : "ya ndak tau",
        correct : "B"
    },{
        question : "Apakah ini gambar Hard Disk Drive (HDD)?",
        imgSrc : "img/4.jpg",
        choiceA : "Benar",
        choiceB : "ya ndak tau",
        choiceC : "Salah",
        correct : "A"
    },{
        question : "Apakah ini gambar Power Supply Unit (PSU)?",
        imgSrc : "img/5.jpg",
        choiceA : "Benar",
        choiceB : "ya ndak tau",
        choiceC : "hemmmm",
        correct : "A"
    },{
        question : "Apakah ini gambar VGA?",
        imgSrc : "img/6.jpg",
        choiceA : "Benar",
        choiceB : "ya ndak tau",
        choiceC : "hemmm",
        correct : "A"
    },{
        question : "Apakah ini gambar Sound Card?",
        imgSrc : "img/7.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "hemmmm",
        correct : "A"
    },{
        question : "Apakah ini gambar Optical Drive (CD/DVD Drive)?",
        imgSrc : "img/8.jpg",
        choiceA : "Salah",
        choiceB : "Benar",
        choiceC : "hemmm",
        correct : "B"
    },{
        question : "Apakah ini gambar Monitor?",
        imgSrc : "img/9.jpg",
        choiceA : "Salah",
        choiceB : "hrmmm",
        choiceC : "Benar",
        correct : "C"
    },{
        question : "Apakah ini gambar Keyboard?",
        imgSrc : "img/10.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "hemm",
        correct : "A"
    },{
        question : "Apakah ini gambar Mouse?",
        imgSrc : "img/11.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "hemmm",
        correct : "A"
    },{
        question : "Apakah ini gambar Speakers?",
        imgSrc : "img/12.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "hemmm",
        correct : "A"
    },{
        question : "Apakah ini gambar Network Interface Card (NIC)?",
        imgSrc : "img/13.jpg",
        choiceA : "Salah",
        choiceB : "Benar",
        choiceC : "hemmmm",
        correct : "B"
    },{
        question : "Apakah ini gambar Modem?",
        imgSrc : "img/14.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "hemmm",
        correct : "A"
    },{
        question : "Apakah ini gambar USB Hub?",
        imgSrc : "img/15.jpg",
        choiceA : "Benar",
        choiceB : "Salah",
        choiceC : "hemmmm",
        correct : "A"
    }
];




// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 15s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}