class Board {
  constructor(x, y) {
    this.x = x
    this.y = y
    platformsImg.resize(60, 10)
  }

  //Draws the boards
  drawBoard() {
    image(platformsImg, this.x, this.y)
    //rect(this.x, this.y, 60, 10);
  }

}
