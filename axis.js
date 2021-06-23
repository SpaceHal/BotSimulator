
class cAxis {


  
    constructor(pX, pY){
        this.posX = pX;
        this.posY = pY;
    }
    Axis( pX,  pY) {
    const axisWidth = 940;

      posX = pX;
      posY = pY;
      this.pgAxis = createGraphics(1000, 200);
      this.pgAxis.beginDraw();
      this.pgAxis.clear();
      this.pgAxis.background(10, 10, 50);
      // nothing to draw
      // image(imgTrack,200,0);
      this.pgAxis.noFill();
      this.pgAxis.stroke(255);
      this.pgAxis.rect(30, 30, axisWidth, 140);
  
      this.pgAxis.endDraw();
      image(pgAxis, 0, 600);
    }
  };
  