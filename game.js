
var buttonColors=["red","blue","green","yellow"]; //For colors of the game

var gamePattern = []; //To hold the game pattern
var userClickedPattern = []; //Holds User's Click Patterns during

var gameStatus = false; //If game is started or NOT
var level = 0; //Game current Level Holder

//Detects Keydown for the Start of The Game
$(document).keydown(function () {
    if (!gameStatus) {
        $("#level-title").html("Level " + level);
        nextSquence();
        gameStatus = true;
    }
});

//Button Click Behaviours
$(".btn").click(function () { 
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);
    // console.log("User: "+ userClickedPattern);
    
    playSound(chosenColor);
    animatePress(chosenColor);
    
    checkAnswer(userClickedPattern.length-1);

});

//Checks the Answer if it is correct
//If not: Modifies the Body's attributes and calls startOver() function
//If: Lets user to keep playing
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
    
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSquence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          },500);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
}
}

//Playing Sounds
function playSound(name) {  
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animation of Pressed
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");

     setTimeout(function () {
         $("."+currentColor).removeClass("pressed");
},100);}

//To Active Next Sequence of the Game
function nextSquence() {
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber]; //To choose random color from the buttonColors array
    animatePress(randomChosenColor);
    gamePattern.push(randomChosenColor);
    // console.log("Current Level: "+level+" \n"+ gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").html("Level " + level);
    console.log("Level= " + level + " :" + gamePattern);
}

//Start Over Function
function startOver(){
    level = 0;
    gamePattern = [];
    gameStatus = false;
}