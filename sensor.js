//'use strict';
class cSensor{

    constructor(pImgWorld, pRoboter, pPosition, pSize){
      
        this.log = true;
        this.value = 0;     // Detektierter Helligkeitswert am Boden (0 ... 255)
      
        this.offSetX = 0;
        this.offSetY = 0;
        this.senColor = "#f009";

        this.img = pImgWorld;
        this.firstTime = true;
        this.roboter = pRoboter;
        this.position = pPosition; // Relative Position zur ?Mitte? des Roboters
        this.size = pSize;

        this.kernel = this.generateGausianKernel(pSize, pSize/4.0);
        
    }

    generateGausianKernel(pSize, pSigma) {
     let lKernel = new Array(pSize);
        let fac = 1/(2*PI*sq(pSigma));
        for ( let x = 0; x<pSize; x++) {
          lKernel[x] = new Array(pSize);
            for ( let y =0; y<pSize; y++) {
              lKernel[x][y]=fac*exp(-(sq(x-pSize/2)+sq(y-pSize/2))/(2*sq(pSigma)));
            }
        }
        return lKernel;
       //this.printKernel(); 
    }

    printKernel() {
        let sum=0;
        for (let x = 0; x<this.kernel.length; x++) {
            console.log("x="+nf(x, 2, 0)+":  ");
          for (let y = 0; y<this.kernel.length; y++) {
            console.log(" [" + y + "]" + nf(this.kernel[x][y], 1, 5));
            sum += this.kernel[x][y];
          }
          //print();
        }
        
         // Die Summe aller Werte sollte nahe 1 (>0.95) sein
        print("\nSumme: "+ sum);
      }

    show() {
        rectMode(CENTER);
        stroke(150);
    
        push();  // transformation
        translate(this.roboter.position.x+this.offSetX, this.roboter.position.y+this.offSetY);
        rotate(this.roboter.heading);
        blendMode(OVERLAY);
        fill(this.senColor);
        stroke(0);
        ellipse(this.position.y, this.position.x, this.size/2, this.size/2 ); // 
    
        pop();
    }

      /* https://processing.org/examples/convolution.html */
    /* https://de.wikipedia.org/wiki/Faltungsmatrix */
    convolutionGray(x, y) {
        // convolution for gray scale pictures
        let offset = Math.floor(this.size / 2);
    
        let sum = 0; // Kernel sum for this pixel
        if (this.img.pixels.length < (600*800)){
          this.img.loadPixels();
          this.firstTime = false;
        }
        for (let ky = 0; ky < this.size; ky++) {
          for (let kx = 0; kx < this.size; kx++) {
            // Calculate the adjacent pixel for this kernel point
                  // What pixel are we testing
            const xloc = (x + kx - offset);
            const yloc = (y + ky - offset);
            let loc = (xloc + this.img.width * yloc) * 4;
            
            // Make sure we haven't walked off our image, we could do better here
            //loc = constrain(loc, 0 , img.pixels.length - 1);
            if (loc > this.img.pixels.length - 1){
              sum += 255; // white, if outside of image
            }
            else{
              sum += this.kernel[ky][kx] * this.img.pixels[loc];
            }

            // Multiply adjacent pixels based on the kernel values
          }
        }
        return sum;
      }

      readSensorValue() {
        /* ==================   ACHTUNG  ==========================
         Die richtige Koordinatentransformation ist diese hier. Da aber der gesamte Roboter in West->Ost Richtung
         orientiert ist, aber die Lage der Sensoren sich auf ein Süd-> Nordausrichtung beziehen, musste sie
         geändert werde!!!
         float absX = roboter.position.x + position.x*cos(roboter.heading) - position.y*sin(roboter.heading);
         float absY = roboter.position.y + position.x*sin(roboter.heading) + position.y*cos(roboter.heading);
         ============================================================ */
    


        let absX = Math.round(this.roboter.position.x + this.position.y*cos(this.roboter.heading) - this.position.x*sin(this.roboter.heading));
        let absY = Math.round(this.roboter.position.y + this.position.y*sin(this.roboter.heading) + this.position.x*cos(this.roboter.heading));

        if(absX >= width || absX <= 0 || absY >= height || absY <= 0 ){
          this.roboter.resetPostion();
          return 255/2;
        }
  
        let sum = constrain(this.convolutionGray(absX, absY),0,255);
        if(isNaN(sum)) {sum = 0;}
    
       
        this.value = sum;
        return sum;
      }


}
