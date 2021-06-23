class cPidControl{

    constructor(bot){
        this.bot = bot;
        this.log = false;

        this.er = 0;
        this.erLast = 0;
        this.integral = 0;
        this.derivative = 0;
        this.updateInterval = 20;

        this.ki = 0;
        this.kp = 0;
        this.kd = 0;

        this.black = 255;

        this.lastTime = millis();
        this.lastUpdate = millis();

    }

    // PID update for black line
    update(sensorVal) {
        let now = millis();
        if (now - this.lastUpdate > this.updateInterval)
        {
            this.lastUpdate = now; 
            this.er = sensorVal - (this.black/2.0); // >0 -> dann auf linie; >0 -> dann neben Linie
            let dT = (now-this.lastTime) ; // Zeitdifferenz in Millisekunden.
            this.lastTime = now;
            this.integral = this.er*dT;
            this.derivative = (this.er-this.erLast)/dT;
    
            let dAngV = this.ki*this.integral + this.kd * this.derivative + this.kp * this.er;
            if (this.log)
                print("dT: " + dT 
                + ", Error:" + this.er
                + ", kp: ", (this.kp * this.er)
                + ", kd: " + (this.kd * this.derivative)
                + ", deltaAngularV: ", dAngV);
                this.bot.angularVelLeft  = constrain(this.bot.maxAngularV + dAngV, 0, this.bot.maxAngularV); // mehr nach rechts, als linkes Rad schneller
                this.bot.angularVelRight = constrain(this.bot.maxAngularV - dAngV, 0, this.bot.maxAngularV); // und rechtes Rad langsamer
    
          //bot.setMotorL((int) constrain(bot.maxAngularV + dAngV, 0, bot.maxAngularV)); // mehr nach rechts, als linkes Rad schneller
          //bot.angularVelRight = constrain(bot.maxAngularV - dAngV, 0, bot.maxAngularV); // und rechtes Rad langsamer
    
          this.er_last = this.er;
        }
      }
}

