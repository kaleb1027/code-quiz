


//storing elements from my HTML
let timeLeft = 75;
let score = 0;
let questionIndex = 0;
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");
let startButton = document.getElementById("start");
let timer = document.getElementById("time");
let h1El = document.querySelector("h1");
let pEl = document.querySelector("p");
let cont = document.getElementById("content");
let scoreList = document.getElementById("leaderboard");
let username = document.getElementById("username");
let container = document.getElementById("container");
let form = document.getElementById("form");
let scores=[]



//array holding all the questions and answers to the quiz

let questions = [
    {
        question: "Inside which HTML tag do we put javascript?",
        answers: ["<javascript>", "<script>", "<js>", "<jsscript>"],
        correct: "<script>",
    },

    {
        question: "What denotes an id tag in css?",
        answers: [".", "./", "id", "#"],
        correct: "#",
    },

    {
        question: "How do you create a function in javascript?",
        answers: ["function myFunction()", "function = myFunction()", "function: myFunction()", "func MyFunction"],
        correct: "function myFunction()",
    },

    {
        question: "Where is the correct place to put your javascript tag in your HTML document?",
        answers: ["body", "head", "both body and head work", "none of the above"],
        correct: "body",
    },

    {
        question: "What symbol denotes NOT in a javascript conditional statement?",
        answers: ["-", "+", "^", "!"],
        correct: "!",
    },
]


//starts quiz on button click
startButton.addEventListener("click",startQuiz);

function startQuiz(){
    startTimer();
    giveQuestions();
}

//starts timer
function startTimer() {
    
    var timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
  
      if(timeLeft <= 0) {
        
        clearInterval(timerInterval);
        
      }
    }, 1000);

    
  }

//displays questions
  function giveQuestions(){
    cont.setAttribute("style","display: block; padding: 30px; text-align: center;");
    startButton.setAttribute("style","display: none;");
    pEl.setAttribute("style","display: none;");
    h1El.textContent = questions[questionIndex].question;

    choiceA.textContent = questions[questionIndex].answers[0];
    choiceA.setAttribute("data-set", questions[questionIndex].answers[0]);
    choiceA.addEventListener("click", nextQuestion);

    choiceB.textContent = questions[questionIndex].answers[1];
    choiceB.setAttribute("data-set", questions[questionIndex].answers[1]);
    choiceB.addEventListener("click", nextQuestion);

    
    choiceC.textContent = questions[questionIndex].answers[2];
    choiceC.setAttribute("data-set",questions[questionIndex].answers[2]);
    choiceC.addEventListener("click", nextQuestion);
    

    choiceD.textContent = questions[questionIndex].answers[3];
    choiceD.setAttribute("data-set", questions[questionIndex].answers[3]);
    choiceD.addEventListener("click", nextQuestion);
    

  }

  //displays the next question, also deducts timer if answered incorrectly
  function nextQuestion(event){
    
    var user  = event.target.textContent;
    if (user === questions[questionIndex].correct){
        questionIndex++;
        if(questionIndex === questions.length || timeLeft <= 0){
            
            endGame(timeLeft)
        }
        else{
            giveQuestions()
        }
        
    }
    else{
        if(timeLeft < 15){
            timeLeft = 0
        }
        else{
            timeLeft = timeLeft - 15;
        }
        
        questionIndex++;
        if(questionIndex === questions.length || timeLeft <= 0){
            endGame(timeLeft)
        }
        else{
            giveQuestions()
        }
    }

  }

  //preventing submit default
  form.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var userText = username.value;
    
    scores.push(userText);
  
    storeUsers();
    renderUsers()
  });

  //storing our scores
  function storeUsers() {
    
    localStorage.setItem("scores", JSON.stringify(scores));
}

//rendering our stored scores
function renderUsers() {
    for (var i = 0; i < scores.length; i++) {
      var score = scores[i];
  
      var li = document.createElement("li");
      li.textContent = score;
      li.setAttribute("data-index", i);
  
      scoreList.appendChild(li);
    }
  }

  function init() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
      scores = storedScores;
    }
    renderUsers();
  }

  //ending game message
  function endGame(time){
      h1El.textContent = "All done! Your time left was  " + time + " seconds! The more time spared the better!";
      cont.style.display = "none";
      container.style.display = "block";
  }

