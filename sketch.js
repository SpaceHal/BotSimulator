
//'use strict';
p5.disableFriendlyErrors = true; // disables FES
var cnv;

let bot;
let sensor;
let pidControl;

let pgWorld;      // The area where the robot is moving around
let imgTrack;     // track to follow (aka line)

let kpSlider, kpText;
let sensText;
let slider;
let cbActive;  // checkbox active

let active = true;

let lastCall = 0;
let now;


// -------------- Sensor -----------
let sensorPosition = new p5.Vector(0, 60);
let sensorSize = 15;

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}


function checkLoop() {
  if (this.checked()) {  // does 'this' refer to the checkbox object?
    loop();
  } else {
    noLoop();
  }
}



function windowResized() {
  //centerCanvas();
}


//setTimeout(setup, 0);
function setup() {
  // Check BOX
  imgTrack = loadImage("track.png"); // Bild des Linien-Parcours  
  image(imgTrack, 0, 0, 800, 600);
  
  checkbox = createCheckbox('active', true);
  checkbox.parent('control');
  checkbox.changed(checkLoop);

  cnv = createCanvas(800, 600);
  cnv.parent('container');


 

  bot = new cBot(false);
  sensor = new cSensor(imgTrack, bot, sensorPosition, sensorSize);
  pidControl = new cPidControl(bot);
 
  /* PID Slider */
  kpSlider = select('#sliderProp');
  kpText = select('#txtProp');
  pidControl.kp = kpSlider.value();


  kiSlider = select('#sliderInt');
  kiText = select('#txtInt');
  pidControl.ki = kiSlider.value();


  kdSlider = select('#sliderDiff');
  kdText = select('#txtDiff');
  pidControl.kd = kdSlider.value();


  velSlider = select('#sliderVel');
  velText = select('#txtVel');
  //pidControl.kd = kdSlider.value();
  

  //sensText = createElement('p','Some text');
  //sensText.className = "alert";  
  //sensText.position(500,100);
  sensText = select('#txSensor');
  //document.body.append(div);





}

function sliderPidUpdate(){

  let kpValue = kpSlider.value();
  pidControl.kp = 1.2**(kpValue -96.2)
  kpText.html("Kp: " + expo(pidControl.kp,2));

  let kiValue = kiSlider.value();
  pidControl.ki = 1.2**(kiValue -96.2);
  kiText.html("Ki: " + expo(pidControl.ki,2));

  let kdValue = kdSlider.value();
  pidControl.kd = 1.2**(kdValue -96.2);
  kdText.html("Kd: " + expo(pidControl.kd,2));

  let velValue = velSlider.value();
  velText.html("max. Speed: " + velValue);
  bot.maxMotorSpeed(velValue)

}



function draw() {
  //image(pgWorld, 0, 0);
  now = millis();
  print('time difference:' + (now-lastCall));
  lastCall = now;


  image(imgTrack, 0, 0, 800, 600);

  bot.show();
  sensor.show();
  let val = sensor.readSensorValue();

  sliderPidUpdate()

  pidControl.update(val);
  sensText.value(val.toFixed(1));

  //let valSlider = slider.input();
  //console.log(valSlider);
  //requestAnimationFrame(draw);

}
