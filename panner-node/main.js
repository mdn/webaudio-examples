// set up listener and panner position information
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let xPos = Math.floor(WIDTH/2);
let yPos = Math.floor(HEIGHT/2);
let zPos = 295;

// play, stop, and other important dom nodes

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const boomBox = document.querySelector('.boom-box');
const listenerData = document.querySelector('.listener-data');
const pannerData = document.querySelector('.panner-data');
const pulseWrapper = document.querySelector('.pulse-wrapper');

//  movement controls and initial data

const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const zoomInButton = document.querySelector('.zoom-in');
const zoomOutButton = document.querySelector('.zoom-out');

let boomX = 0;
let boomY = 0;
let boomZoom = 0.50;

// variables to hold information that needs to be assigned upon play

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
let panner;
let listener;
let source;

function init() {
  audioCtx = new AudioContext();
  panner = audioCtx.createPanner();
  listener = audioCtx.listener;

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
      let audioData = request.response;

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

  getData();

  // controls to move left and right past the boom box
  // and zoom in and out

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
}
// wire up buttons to stop and play audio

stop.setAttribute('disabled', 'disabled');

play.onclick = function() {
  init();
  source.start(0);

  play.setAttribute('disabled', 'disabled');
  stop.removeAttribute('disabled');
  pulseWrapper.classList.add('pulsate');
};

stop.onclick = function() {
  source.stop(0);
  stop.setAttribute('disabled', 'disabled');
  play.removeAttribute('disabled');
  pulseWrapper.classList.remove('pulsate');
};
