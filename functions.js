//-----HELPER FUNCTIONS-----

//End game screen
function endGame() {
  if (f){
     f = false
     doodle.y = height/2;
     doodle.x = width/2
     doodle.bounce = MIDDLE-70
     platforms.push(new Board(width/2-30, height/2))

  } else {
    highestScore = max(highestScore , score)
    background(50);
    fill(255, 0, 0)
    noStroke()
    textSize(70)
    text("Game Over!", 100, 150)
    fill(0)
    text("Score: ", 50, 300)
    text(score, 300, 300)
    text("Best: ", 50, 400)
    text(highestScore, 300, 400)

    if (keyIsDown(82)) {
      score = 0
      endG = false
      f = true;
      
    }
  }
}

function displayScore(score) {
  noStroke();
  fill(40, 40, 200, 120);
  rect(0, 0, width, 30)
  fill(0);
  text(score, 30, 25);
}
