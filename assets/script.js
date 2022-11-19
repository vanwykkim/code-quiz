var startBtn = document.querySelector("#startQuiz");
var submitBtn = document.querySelector("#submit");
var clearScoresBtn = document.querySelector("#clearHighScores");
var goBackBtn = document.querySelector("#goBack");
var timeEl = document.querySelector(".timerShow");
var timerInterval

//hold out here to keep value when function ends to use for score
var timerTime;
//when zero quiz is complete
var complete;

function setTime(){
    timerInterval = setInterval(function() {
        
        timeEl.textContent =  "Time left: " + timerTime;
        timerTime--;
       
       
    }, 1000);
     //stop if out of time or out of questions
    if(timerTime <= 0 || complete <= 0) {
        // Stops countdown
        clearInterval(timerInterval);
        }
}   

//function to do the quiz
function startQuiz(){
    //amount of time for quiz
    timerTime = 75;
    //number of questions to ask
    complete = 5;
    setTime();

    //remove 5 seconds for wrong answers
    // while(timerTime > 0 && complete > 0){
    //     complete--;

    // }


}

// //function to submit a high score to the list
// function submitScore(event){
  //  event.preventDevault();}

// //function to clear the stored high scores
// function clearHighScores(){;}

// // function to return you to the quiz page from scores
// function goBack(){;}

 startBtn.addEventListener("click", startQuiz);
// submitBtn.addEventListener("submit", "handleFormSubmit");
// clearScoresBtn.addEventListener("click", clearHighScores);
// goBackBtn.addEventListener("click", goBack);