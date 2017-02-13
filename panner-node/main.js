// set up listener and panner position information
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var xPos = Math.floor(WIDTH/2);
var yPos = Math.floor(HEIGHT/2);
var zPos = 295;

// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var panner = audioCtx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 1;
panner.maxDistance = 10000;
panner.rolloffFactor = 1;
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0;

if(panner.orientationX) {
  panner.orientationX.value = 1;
  panner.orientationY.value = 0;
  panner.orientationZ.value = 0;
} else {
  panner.setOrientation(1,0,0);
}

var listener = audioCtx.listener;

if(listener.forwardX) {
  listener.forwardX.value = 0;
  listener.forwardY.value = 0;
  listener.forwardZ.value = -1;
  listener.upX.value = 0;
  listener.upY.value = 1;
  listener.upZ.value = 0;
} else {
  listener.setOrientation(0,0,-1,0,1,0);
}

var source;

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

var boomBox = document.querySelector('.boom-box');

var listenerData = document.querySelector('.listener-data');
var pannerData = document.querySelector('.panner-data');

leftBound = (-xPos) + 50;
rightBound = xPos - 50;

xIterator = WIDTH/150;

// listener will always be in the same place for this demo

if(listener.positionX) {
  listener.positionX.value = xPos;
  listener.positionY.value = yPos;
  listener.positionZ.value = 300;
} else {
  listener.setPosition(xPos,yPos,300);
}

listenerData.innerHTML = 'Listener data: X ' + xPos + ' Y ' + yPos + ' Z ' + 300;

// panner will move as the boombox graphic moves around on the screen
function positionPanner() {
  if(panner.positionX) {
    panner.positionX.value = xPos;
    panner.positionY.value = yPos;
    panner.positionZ.value = zPos;
  } else {
    panner.setPosition(xPos,yPos,zPos);
  }
  pannerData.innerHTML = 'Panner data: X ' + xPos + ' Y ' + yPos + ' Z ' + zPos;
}


// use XHR to load an audio track, and
// decodeAudioData to decode it and stick it in a buffer.
// Then we put the buffer into the source

function getData() {
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();

  request.open('GET', 'viper.ogg', true);

  request.responseType = 'arraybuffer';


  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer;
        source.buffer = myBuffer;

        source.connect(panner);
        panner.connect(audioCtx.destination);
        positionPanner();
        source.loop = true;
      },

      function(e){
        console.log("Error with decoding audio data" + e.err);
      });

  };

  request.send();
}

// wire up buttons to stop and play audio

var pulseWrapper = document.querySelector('.pulse-wrapper');

play.onclick = function() {
  getData();
  source.start(0);
  play.setAttribute('disabled', 'disabled');
  pulseWrapper.classList.add('pulsate');
};

stop.onclick = function() {
  source.stop(0);
  play.removeAttribute('disabled');
  pulseWrapper.classList.remove('pulsate');
};

// controls to move left and right past the boom box
// and zoom in and out

var leftButton = document.querySelector('.left');
var rightButton = document.querySelector('.right');
var zoomInButton = document.querySelector('.zoom-in');
var zoomOutButton = document.querySelector('.zoom-out');

var boomX = 0;
var boomY = 0;
var boomZoom = 0.50;

function moveRight() {
  boomX += -xIterator;
  xPos += -0.066;

  if(boomX <= leftBound) {
    boomX = leftBound;
    xPos = (WIDTH/2) - 5;
  }

  boomBox.style.webkitTransform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  positionPanner();
  rightLoop = requestAnimationFrame(moveRight);
  return rightLoop;
}

function moveLeft() {
  boomX += xIterator;
  xPos += 0.066;

  if(boomX > rightBound) {
    boomX = rightBound;
    xPos = (WIDTH/2) + 5;
  }

  positionPanner();
  boomBox.style.webkitTransform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  leftLoop = requestAnimationFrame(moveLeft);
  return leftLoop;
}

function zoomIn() {
  boomZoom += 0.05;
  zPos += 0.066;

  if(boomZoom > 4) {
    boomZoom = 4;
    zPos = 299.9;
  }

  positionPanner();
  boomBox.style.webkitTransform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  zoomInLoop = requestAnimationFrame(zoomIn);
  return zoomInLoop;
}

function zoomOut() {
  boomZoom += -0.05;
  zPos += -0.066;

  if(boomZoom <= 0.5) {
    boomZoom = 0.5;
    zPos = 295;
  }

  positionPanner();
  boomBox.style.webkitTransform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  zoomOutLoop = requestAnimationFrame(zoomOut);
  return zoomOutLoop;
}

// In each of the cases below, onmousedown runs the functions above
// onmouseup cancels the resulting requestAnimationFrames.

leftButton.onmousedown = moveLeft;
leftButton.onmouseup = function () {
  window.cancelAnimationFrame(leftLoop);
};

rightButton.onmousedown = moveRight;
rightButton.onmouseup = function () {
  window.cancelAnimationFrame(rightLoop);
};

zoomInButton.onmousedown = zoomIn;
zoomInButton.onmouseup = function () {
  window.cancelAnimationFrame(zoomInLoop);
};

zoomOutButton.onmousedown = zoomOut;
zoomOutButton.onmouseup = function () {
  window.cancelAnimationFrame(zoomOutLoop);
};
