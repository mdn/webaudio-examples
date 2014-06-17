// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// connect oscillator to gain node to speakers

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 1;

var initialFreq = 3000;
var initialVol = 0.5;

// set options for the oscillator

oscillator.type = 1; // square wave
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.start();

gainNode.gain.value = initialVol;

// Mouse pointer coordinates

var CurX;
var CurY;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

document.onmousemove = updatePage;

function updatePage(e) {
    KeyFlag = false;

    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    
    oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
    gainNode.gain.value = (CurY/HEIGHT) * maxVol;

    canvasDraw();
}

// mute button

var mute = document.querySelector('.mute');

mute.onclick = function() {
  if(mute.id == "") {
    gainNode.disconnect(audioCtx.destination);
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.connect(audioCtx.destination);
    mute.id = "";    
    mute.innerHTML = "Mute";
  }
}



// canvas visualization

function random(number1,number2) {
  var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  return randomNo;
} 

var canvas = document.querySelector('.canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT; 

var canvasCtx = canvas.getContext('2d');

function canvasDraw() {
  if(KeyFlag == true) {
    rX = KeyX;
    rY = KeyY;
  } else {
    rX = CurX;
    rY = CurY;
  }
  rC = Math.floor((gainNode.gain.value/maxVol)*30);
  
  canvasCtx.globalAlpha = 0.2;
  
  for(i=1;i<=15;i=i+2) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
    canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
    canvasCtx.fill();
    canvasCtx.closePath();     
  }    
}

// clear screen

var clear = document.querySelector('.clear');

clear.onclick = function() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

// keyboard controls

var body = document.querySelector('body');

var KeyX = 1;
var KeyY = 0.01;
var KeyFlag = false;

body.onkeydown = function(e) {
  KeyFlag = true;

  // 37 is arrow left, 39 is arrow right,
  // 38 is arrow up, 40 is arrow down

  if(e.keyCode == 37) {
    KeyX -= 20;
  };

  if(e.keyCode == 39) {
    KeyX += 20;
  };

  if(e.keyCode == 38) {
    KeyY -= 20;
  };

  if(e.keyCode == 40) {
    KeyY += 20;
  };

  // set max and min constraints for KeyX and KeyY

  if(KeyX < 1) {
    KeyX = 1;
  };

  if(KeyX > WIDTH) {
    KeyX = WIDTH;
  };

  if(KeyY < 0.01) {
    KeyY = 0.01;
  };

  if(KeyY > HEIGHT) {
    KeyY = HEIGHT;
  };

  oscillator.frequency.value = (KeyX/WIDTH) * maxFreq;
  gainNode.gain.value = (KeyY/HEIGHT) * maxVol;

  canvasDraw();
}
