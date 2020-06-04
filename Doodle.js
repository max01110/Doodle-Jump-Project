class Doodle {
  constructor(y, w) {
    this.y = y
    this.x =  width/2
    this.w = w
    this.vel = 0; //velocity
    this.bounce = MIDDLE; //where doodle bounces
  }
  //Method to draw doodle
  draw() {
    doodleImg.resize(this.w, this.w)
    imageMode(CENTER);  
    image(doodleImg, this.x, this.y)
    // stroke(150);
    // noStroke();
    // ellipse(this.x, this.y, this.w);
 
  }
  //Method to make doodle jump
  jump() {
    this.y += this.vel;
    this.vel += GRAVITY;
  }

  //Bounce
  checkBottom() {
    if (this.y >= this.bounce) {
      this.y = this.bounce;
      doodle.vel = -7;
    }
  }

  //Returns state of doodle (up or down)
  state() {
    if (this.vel > 0) {
      return 'D';
    } else if (this.vel <= 0) {
      once = false;
      return 'U';
    }
  }

  //Checks if it hits right side --> appear on left side and vice-versa
  checkSides() {
    if (this.x <= -this.w/2) {
      this.x = width;
    }

    if (this.x >= width + this.w/2) {
      this.x = -this.w/2;
    }
  }

}
