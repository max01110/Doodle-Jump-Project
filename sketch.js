/*
By: Maxime Michet
Date: 2020-05-31
Doodle Jump Game
*/


//--Main Game Variables--
var frequency = 40;
var count = 0;
var platforms = [];
var GRAVITY = 0.3;
var MIDDLE = 380;
var centerY = 0;
var doodleState;
var once = false;
var score = 0;
var vel = 0;
var endG = false;
var f = true;
var highestScore = 0
var scoreIncrement = 1;
var start;

var backgroudMusic;
function setup() {
	createCanvas(550, 650);
	//Loading images (loaded using https://imgur.com/ in order to bypass CORS issue)
	bg = loadImage("https://i.imgur.com/2X8PwB7.png");
	doodleImg = loadImage("https://i.imgur.com/8bFrvli.png")
	platformsImg = loadImage("https://i.imgur.com/WZJcrSR.png")
	// backgroudMusic = loadSound('sounds/bg.mp3');
	// backgroudMusic.play();

	//Declare objects
	doodle = new Doodle(height-80, 80);
	platforms.push(new Board(width/2-30, height/2));
	//Create random platforms
 	for (var i=0; i<frequency; i++) {
		 platforms.push(new Board(random(0,width), random(0, height)));
	}

	start = height/2

}

function draw() {
	if (endG) { //check if player lost
		endGame();
	} else {
		//Utility functions
    	imageMode(CORNER);
		background(bg);
		strokeWeight(2);
		stroke(150)
		textSize(30)
		fill(255)
		displayScore(score);

		//Makes game move up faster or slower
		if (doodle.y < 100) {
			centerY = 4
			scoreIncrement = 3;
		} else if (doodle.y < 200){
				centerY = 3
				scoreIncrement = 2;
		} else {
				centerY = 2;
				scoreIncrement = 1;
		}

		//Update platforms in order to make them move
		for (var y=0; y<platforms.length; y++) {
		platforms[y].y += centerY;
		platforms[y].drawBoard();
		}

		//Call methods to draw and make doodle move
		doodle.draw();
		doodle.jump();
		doodle.checkBottom();
		doodle.checkSides();

		//Store state in variable (U || D)
		doodleState = doodle.state();


		//update score
		score = max(score, round(start - doodle.y))
		start += centerY;

		//If doodle is too high
		if (doodle.y < 80) {
			doodle.bounce = height;
		} else {
			
			if (doodleState == 'D') { 
					centerY = 0;
					for (var plat=0; plat<platforms.length; plat++) { //If platform off screen, replace it with a new one
					 //Check that dold doodle bounces on a platform
				 	 if (doodle.x >= platforms[plat].x && doodle.x <= platforms[plat].x+60) { //check x vector of doodle
						 if (doodle.y + 20 >= platforms[plat].y && doodle.y+20 <= platforms[plat].y+30 && doodle.y <= 600) {
							 if (height/2-platforms[plat].y >= 0 ) { //check y vector
								  doodle.bounce = platforms[plat].y-20; //bounce on corresponding platform
							 } else {
								  doodle.bounce = platforms[plat].y-20;
							 }
							 break;
						 } else {
							 //don't bounce if doodle not on platforn
							 doodle.bounce = height;
						 }
					 }
				 }
			}

		}
		//If doodle touches bottom --> game over
		if (doodle.y > height - 15) {
			endG = true
		}

		//Renew platforms -- if platform offscreen, replace with a new one
		for (var j=0; j<platforms.length; j++) {
			if (platforms[j].y > height) {
				platforms[j] = new Board (random(0, width-60), -100)
			}
		}

		//Check for left or right arrow to move doodle
		if (keyIsDown(LEFT_ARROW)) {
			doodle.x -= 5;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			doodle.x += 5;
		}

	
	}
}
