/*
class cChart {

    contructor(pAxis, pTitle){

    

    this.log = true;
    //String title;
    const numOfElements = 80;
    const dx = 10;

    //float yScale;
    //float minValue;
    //float maxValue;
    //float minValue2;  // zweit kleinster
    //float maxValue2;  // zweit größter
    // http://tutorials.jenkov.com/java-collections/queue.html
  
    List<Float> data; 

    this.axis = pAxis;
    this.data = [];  // Array declaration
    this.title = pTitle;
    this.yScale = 0.5;

    }


  
    add(pValue) {
      if (log)
        print("Added Value: " + pValue );
      if (data.size()>numOfElements) {
        let remValue = data.remove(0);
        if (remValue <= minValue) { // find new max
          minValue = Collections.max(data);
        } else if (remValue >= maxValue) {
          maxValue = Collections.min(data);
        }
      }
  
      data.add(pValue);
      if (pValue < minValue) {
        minValue = pValue;
      } else if (pValue > maxValue) {
        maxValue = pValue;
      }
    }
  
  
  
    draw() {
      float lastY=0;
      axis.pgAxis.beginDraw();
      axis.pgAxis.clear();   // funktioniert nicht wie gedacht ....
      axis.pgAxis.background(10, 10, 50);  // transparent white
  
      axis.pgAxis.stroke(200);
      for (int i = 0; i<data.size(); i++) {
        axis.pgAxis.line(i*dx, lastY*yScale, (i+1)*dx, data.get(i)*yScale);
        lastY = data.get(i);
      }
      axis.pgAxis.endDraw();
      image(axis.pgAxis, 0, 600);
    }
  };

  */