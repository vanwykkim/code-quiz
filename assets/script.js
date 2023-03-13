//Jquery Dom Hooks to elements
var startBtnEl = $("#startQBtn");
var quizBtn1El = $("#1");
var quizBtn2El = $("#2");
var quizBtn3El = $("#3");
var quizBtn4El = $("#4");
var correctEl = $("#correct");
var submitBtnEl = $("#submitBtn");
var quizQuestionEl = $("#quizQuestion");
var quizBtnsEl = $(".qBtn");
var clearScoresBtnEl = $("#clearScoresBtn");
var startOverBtnEl = $("#startOverBtn");
var textboxEl = $('#initials');
var endScreenEl = $('#endScreen');
var startScreenEl = $('#startScreen');
var quizScreenEl = $('#quizScreen');
var timeEl = document.querySelector(".timerShow");
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var viewScoresEl = $('div.viewScoresClass');
var scoresListEl = $('#scoresList');
//var myModalEl = $('#myModal');
var timerInterval;
var myArray = new Array();
var quizArray = new Array();

//hold out here to keep value when function ends to use for score
var timerTime;
//when zero quiz is complete
var complete;
var correctAnswer;
var quizQuestion = "";
var answer1 = "";
var answer2 = "";
var answer3 = "";
var answer4 = "";

function init(){
    startScreenEl.show();
    quizScreenEl.hide();
    endScreenEl.hide();
    startOverBtnEl.hide();
    clearScoresBtnEl.hide();
}

function setTime(){
    //in startQuiz don't need here
    //timerTime = 11;
    //number of questions to ask
    //complete = 5;
    
  
    timerInterval = setInterval(function() {
        
        timeEl.textContent =  "Time left: " + timerTime;
        timerTime--;
        if(timerTime <= 0 || complete <= 0) {
            // Stops countdown
            clearInterval(timerInterval);
          
            quizScreenEl.hide();
            endScreenEl.show();
            if(timerTime < 0){
                timerTime = 0;
            }
            timeEl.textContent =  "QUIZ is over - Time left: " + timerTime;
        }
       
    }, 1000);
     //stop if out of time or out of questions
   
}   

//function to do the quiz
function startQuiz(){
    //amount of time for quiz
    timerTime = 75;
    //number of questions to ask
    complete = 5;
    setTime();

    //display first question
    quizQuestionEl.text("Which one of these is NOT a Javascript naming convention?");
    quizBtn1El.text("All names start with a letter or underscore");
    quizBtn2El.text("Names are case-sensitive");
    quizBtn3El.text("Names must be less than 50 char");
    quizBtn4El.text("Names have no length limit");
    correctAnswer = 3;
    correctEl.text("");  

}

function setHighScore(initials){
    if(initials!=null){
        myArray = JSON.parse(localStorage.getItem("storageArray"));
        let toStore = (initials + "   "+ timerTime);
        if(myArray == null) {
            myArray = [toStore];
        }else{
            myArray.unshift(toStore);
        }

        submitBtnEl.hide();
        startOverBtnEl.show();
        clearScoresBtnEl.show();
        textboxEl.hide();
        localStorage.setItem("storageArray", JSON.stringify(myArray));
    }
}

function showScores(){
    //make a model to show scores
            myArray = JSON.parse(localStorage.getItem("storageArray"));
            if(myArray != null) {
                for(var i = 0; i < myArray.length; i++) {
                    var scoreEl = $('<p>');
                    scoreEl.addClass("score");
                    scoreEl.text(myArray[i]);
                    scoresListEl.append(scoreEl);
                }
            }else{
                var scoreEl = $('<p>');
                scoreEl.text("No scores to display!");
                scoreEl.addClass("score");
                scoresListEl.append(scoreEl);
            }
            modal.style.display = "block";
}


viewScoresEl.click(function(){
    //show scores in modal
    showScores();
    console.log("where are my scores")
});
startBtnEl.on("click", function(){
    startQuiz();
    startScreenEl.hide();
    quizScreenEl.show();
});
// clearScoresBtn.addEventListener("click", clearHighScores);

startOverBtnEl.on("click", function(){
    //hide the whole intials section
    endScreenEl.hide()
    startScreenEl.show();
    textboxEl.show();
    submitBtnEl.show();
    startOverBtnEl.hide();
    clearScoresBtnEl.hide();
});

clearScoresBtnEl.on("click", function(){
    localStorage.clear();
});

init();

submitBtnEl.on("click", function(){
    var initials = textboxEl.val().trim();
    setHighScore(initials);
    showScores();
    textboxEl.val("");
});

quizBtnsEl.on("click", function(){
    var answer = this.id;
    complete--; 
    console.log("Complete " + complete);
    console.log("Answer " + answer);
     if (correctAnswer==answer) {
       correctEl.text("Your Last Answer Was: Correct");
     } else {
       correctEl.text("Your Last Answer Was: Wrong");
       timerTime = timerTime - 5;
       console.log(timerTime);
     }
     //get next question
     switch(complete){
        case 4:
            quizQuestion = "In JavaScript a global variable...";
            answer1 = "is only available in 1 function";
            answer2 = "is available for every function in that file";
            answer3 = "is always a constant";
            answer4 = "has an icon of the earth";
            correctAnswer = 2;
            break;
        case 3:
            quizQuestion = "In JavaScript functions ...";
            answer1 = "are objects";
            answer2 = "are people";
            answer3 = "always return true";
            answer4 = "never return anything";
            correctAnswer = 1;
            break;
        case 2:
            quizQuestion = "Another way to represent a JavaScript Empty String \"\" is NOT....";
            answer1 = "undefined";
            answer2 = "untrue";
            answer3 = "null";
            answer4 = "NaN";
            correctAnswer = "2";
            break;
        case 1:
            quizQuestion = "In javaScript A && B will evaluate to true if.....";
            answer1 = "only A is true";
            answer2 = "only B is true";
            answer3 = "both A and B are true";
            answer4 = "both A and B are false";
            correctAnswer = "3";
            break;
        default:
            break;
     }
     quizQuestionEl.text(quizQuestion);
     quizBtn1El.text(answer1);
     quizBtn2El.text(answer2);
     quizBtn3El.text(answer3);
     quizBtn4El.text(answer4);
});
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    scoresListEl.empty();
    //$("p").remove(".scores");
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

