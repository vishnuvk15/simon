var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
$(".btn").text("Start");

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("h1").text("Level " + level);
  level++;
  $(".btn").text("Restart");

  playSound(randomChosenColour);
  while (userClickedPattern.length > 0) {
    userClickedPattern.pop();
  }
}


$(".btn").click(function() {

    startOver();
    nextSequence();

})

var userChosenColour;
$(".btns").click(function() {

   userChosenColour = this.id;
  animatePress(userChosenColour);
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(level - 1)


})


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("."+currentColour).addClass("pressed");
  setTimeout(function() {
    $("."+currentColour).removeClass("pressed");
  }, 100);
}



function checkAnswer(currentLevel) {
  var lengthUserclicked = userClickedPattern.length -1;
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('crect');
    setTimeout(function() {
      nextSequence();
    }, 1000);
  } else if( gamePattern[lengthUserclicked]===userClickedPattern[lengthUserclicked] ){
    console.log("continue");
  }
  else {
    var gameOver = new Audio ("sounds/wrong.mp3");
    gameOver.play();
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Restart")
  };
}
function startOver() {
  level = 0;
  while (gamePattern.length > 0) {
    gamePattern.pop();
  };

}
