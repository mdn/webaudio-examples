

// define variables

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
var source;

var pre = document.querySelector('pre');
var myScript = document.querySelector('script');
var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

var boomBox = document.querySelector('.boom-box');

// set up panner position information

var xPos = window.innerWidth/2;
var yPos = window.innerHeight/2;
var zPos = 300;

listener.setPosition(xPos,yPos,0);

function positionPanner() {
  panner.setPosition(xPos,yPos,zPos);
  console.log("hi");
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
var boomZoom = 1;


var zoomInLoop;
var zoomOutLoop

function moveRight() {
  boomX += -10;
  xPos += -10;
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  positionPanner();
  rightLoop = requestAnimationFrame(moveRight);
  return rightLoop;
}

function moveLeft() {
  boomX += 10;
  xPos += 10;
  positionPanner();
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  leftLoop = requestAnimationFrame(moveLeft);
  return leftLoop;
}

function zoomIn() {
  boomZoom += 0.05;
  zPos += 20;

  if(boomZoom > 10) {
    boomZoom = 10;
  }
  
  positionPanner();
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  zoomInLoop = requestAnimationFrame(zoomIn);
  return zoomInLoop;
}

function zoomOut() {
  boomZoom += -0.05;
  zPos += -20;
  
  if(boomZoom <= 0) {
    boomZoom = 0.05;
  }
  
  positionPanner();
  boomBox.style.transform = "translate(" + boomX + "px , " + boomY + "px) scale(" + boomZoom + ")";
  zoomOutLoop = requestAnimationFrame(zoomOut);
  return zoomOutLoop;
}

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