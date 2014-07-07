

// define variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
var source;

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

var boomBox = document.querySelector('.boom-box');

var listenerData = document.querySelector('.listener-data');
var pannerData = document.querySelector('.panner-data');

// set up listener and panner position information
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var xPos = WIDTH/2;
var yPos = HEIGHT/2;
var zPos = 295;

leftBound = (-xPos) + 50;
rightBound = xPos - 50;

xIterator = WIDTH/150;

// listener will always be in the same place for this demo
listener.setPosition(xPos,yPos,300);
listenerData.innerHTML = 'Listener data: X ' + xPos + ' Y ' + yPos + ' Z ' + 300;

// panner will move as the boombox graphic moves around on the screen
function positionPanner() {
  panner.setPosition(xPos,yPos,zPos);
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

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();
}

// wire up buttons to stop and play audio

var pulseWrapper = document.querySelector('.pulse-wrapper');

play.onclick = function() {
  getData();
  source.start(0);
  play.setAttribute('disabled', 'disabled');
  pulseWrapper.classList.add('pulsate');
}

stop.onclick = function() {
  source.stop(0);
  play.removeAttribute('disabled');
  pulseWrapper.classList.remove('pulsate');
}

// controls to move left and right past the boom box
// and zoom in and out

var leftButton = document.querySelector('.left');
var rightButton = document.querySelector('.right');
var zoomInButton = document.querySelector('.zoom-in');
var zoomOutButton = document.querySelector('.zoom-out');

var boomX = 0;
var boomY = 0;
var boomZoom = 0.25;

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
  
  if(boomZoom <= 0.25) {
    boomZoom = 0.25;
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
}

rightButton.onmousedown = moveRight;
rightButton.onmouseup = function () {
  window.cancelAnimationFrame(rightLoop);
}

zoomInButton.onmousedown = zoomIn;
zoomInButton.onmouseup = function () {
  window.cancelAnimationFrame(zoomInLoop);
}

zoomOutButton.onmousedown = zoomOut;
zoomOutButton.onmouseup = function () {
  window.cancelAnimationFrame(zoomOutLoop);
}