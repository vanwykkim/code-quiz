//Jquery Dom Hooks to elements
var startBtnEl = $("#startQBtn");
var submitBtnEl = $("#submitBtn");
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

//hold out here to keep value when function ends to use for score
var timerTime;
//when zero quiz is complete
var complete;

function init(){
    startScreenEl.show();
    quizScreenEl.hide();
    endScreenEl.hide();
    startOverBtnEl.hide();
    clearScoresBtnEl.hide();
}

function setTime(){
    timerTime = 11;
    //number of questions to ask
    complete = 5;
    
  
    timerInterval = setInterval(function() {
        
        timeEl.textContent =  "Time left: " + timerTime;
        timerTime--;
        if(timerTime <= 0 || complete <= 0) {
            // Stops countdown
            clearInterval(timerInterval);
          
            quizScreenEl.hide();
            endScreenEl.show();
            timeEl.textContent =  "QUIZ is over - Time left: 0";
        }
       
    }, 1000);
     //stop if out of time or out of questions
   
}   

//function to do the quiz
function startQuiz(){
    //amount of time for quiz
    //timerTime = 75;
    //number of questions to ask
   // complete = 5;
    setTime();
    // if(timerTime <= 0 || complete <= 0) {
    //     // Stops countdown
    //     clearInterval(timerInterval);
      
    //     quizScreenEl.hide();
    //     endScreenEl.show();
    // }
    //remove 5 seconds for wrong answers
    // while(timerTime > 0 && complete > 0){
    //     complete--;

    // }

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
});

quizBtnsEl.on("click", function(){
    var answer = this.innerHTML;

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

