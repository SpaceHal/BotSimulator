//'use strict';
class cBot{
    /***
     Roboter Klasse mit differentiellem Antrieb. 
    Die Klasse bestimmt nur die aktuelle Position des Bots
    anhand der Orientierung und der Drehgeschwindigkeit der 
    Räder. */


    constructor(log){
        this.log = log;

        this.offSetX = 0;         // Verschiebung des Roboters auf PImage
        this.offSetY = 0;
        this.colRobo = color(200);
        this.botColor = "#999c";
        this.wheelColor = "#333f";
    

        
        this.angularVelLeft;                  // aktuelle Winkelgeschwindigkeit der Räder
        this.angularVelRight;
        this.maxAngularV;                     // aktuelle Maximalgeschwindigkeit der Räder. Wird über 'set maxMotor' festgelegt
        this.limitAngularV = 0.2;             // Absolutes Limit der Winkelgeschwindigkeit. Kann niemals überschritten werden.      

        this.motorR = 0;                      // Motorgeschwindigkeit -255 ... 255 (Vergleichbar mit PWM Wert beim Arduino-Roboter)
        this.motorL = 0;                      // mit 'set motorL' wird 'angularVelLeft' festgelegt
        this.maxMotor;                        // Referenzgeschwindigkeit der Räder (als PWM Wert)

        this.avgSpeed;                        // berechnete Durchschnittsgeschwindigkeit des Bots in Pixel/Second

        this.radDm = 40;                      //radius of the wheels
        this.breite = 80;                     //distance between wheels, breite des Robots
        this.laenge = 140;                    // Länge des Roboters
        this.wheelWidth = 15;
        this.wheelCornerRadius = 8;
      
        this.lastUpdate = millis();


        this.startPosition = createVector(220, 105);
        this.position = this.startPosition.copy();
        this.heading = 0;

    

    }

     //<>//


 /*

  
    /*
    Der Vektor *position (x) zeigt immer auf den Achsenmittelpunkt
     
     H         H
     H----x----H
     H         H 
     */
  


  


    /**
   * @param {number} pSpeed
   */
    maxMotorSpeed(pSpeed){
      this.maxAngularV = map(pSpeed,-255,255, -this.limitAngularV, this.limitAngularV);
      this._maxMotor = pSpeed;
    }
  
    get motorL() {
        this._motorL = map(this.angularVelLeft, -this.limitAngularV, this.limitAngularV, -255, 255);
      return this._motorL;
    }
    get motorR() {
        this._motorR = map(this.angularVelRight, -this.limitAngularV, this.limitAngularV, -255, 255);
      return this._motorR;
    }
  
    set motorL(pSpeed) {
        if(Number.isInteger(pSpeed)){
            this.angularVelLeft = map(pSpeed, -255, 255, -this.limitAngularV, this.limitAngularV);
            this._motorL = pSpeed;
        }
        else  this._motorL = 0;
    }
  
    set motorR(pSpeed) {
        if(Number.isInteger(pSpeed)){
            this.angularVelRight = map(pSpeed, -255, 255, -this.limitAngularV, this.limitAngularV);
            this._motorR = pSpeed;
        }
        else this._motoR = 0;
    }
  
  
    //Differentieller Antrieb (Differental DRive): 
    // Bestimmt die absolute Lage des Roboters aus der Winkelgeschwindigkeit der Räder und der Orientierung
    update_ddr() {
        let now = millis();
        let d_x = (this.radDm/2)*(this.angularVelLeft+this.angularVelRight)*cos(this.heading);
        let d_y = (this.radDm/2)*(this.angularVelLeft+this.angularVelRight)*sin(this.heading);
        let d_heading = (this.radDm/this.breite)*(this.angularVelLeft-this.angularVelRight);
  
        this.heading += d_heading;
        this.heading = atan2(sin(this.heading), cos(this.heading));    //transform heading into <-PI, PI> interval
        this.position.x += d_x;  
        this.position.y += d_y;
        this.avgSpeed = abs(d_x+d_y)/(2*(now-this.lastUpdate))*1000;
  
        this.lastUpdate = now;

        //if (log)
            //print("MotorSpeed (" + this.getMotorL() + "," + this.getMotorR() + ")");
    }
  
    get speed() {
      return this.avgSpeed;
    }
  
    resetPostion() {
        this.position.x = this.startPosition.x;
        this.position.y = this.startPosition.y;
  
        this.heading = 0;
    }
  
    show() {
      this.update_ddr();
      rectMode(CENTER);
      stroke(150);
  
      push();  // transformation
      translate(this.position.x+this.offSetX, this.position.y+this.offSetY);
      rotate(this.heading);
      // -----  Chassis -------
      stroke(80);
      strokeWeight(3);
      fill(this.botColor);
      rect(0, 0, this.laenge, this.breite, 7 );   
      // ------  Räder --------
      strokeWeight(1);
      fill(this.wheelColor);
      rect(0, -this.breite/2, this.radDm, this.wheelWidth, this.wheelCornerRadius); // wheel
      rect(0, +this.breite/2, this.radDm, this.wheelWidth, this.wheelCornerRadius); // wheel
      stroke(0, 100);
      line(0, +this.breite/10, 0, -this.breite/10);
      line(+this.breite/10, 0, -this.breite/10, 0);
      pop();
  
      //fill(0, 102, 153, 204);
      //text("L: "+str(this.angularVelLeft), 700, 15);
      //text("R: "+str(this.angularVelRight), 700, 30);
    }

  
    set winkelV(wV) {
      this.angularVelLeft = constrain(wV, -this.maxAngularV, this.maxAngularV);
      this.angularVelRight = constrain(wV, -this.maxAngularV, this.maxAngularV);
    }
  
    stop() {
      this.angularVelLeft=0;
      this.angularVelRight=0;
    }
  }

