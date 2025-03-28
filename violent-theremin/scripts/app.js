const appContents = document.querySelector(".app-contents");
const startMessage = document.querySelector(".start-message");
let isAppInit = false;
appContents.style.display = "none";

startMessage.addEventListener("click", transitionScreen);

function transitionScreen() {
  // create web audio api context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  // remove start message button element and show app contents
  appContents.style.display = "block";
  document.body.removeChild(startMessage);

  init(audioCtx);
}

/**
 * Initializes the audio context and sets up the theremin functionality
 *
 * @param {AudioContext} audioCtx - The Web Audio API AudioContext used to generate and manipulate audio signals
 */
function init(audioCtx) {
  if (isAppInit) {
    return;
  }

  // create Oscillator and gain node
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // connect oscillator to gain node to speakers
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // create initial theremin frequency and volume values
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  const maxFreq = 6000;
  const maxVol = 0.02;
  const initialVol = 0.001;

  // set options for the oscillator
  oscillator.detune.value = 100; // value in cents
  oscillator.start(0);

  oscillator.onended = function () {
    console.log("Your tone has now stopped playing!");
  };

  gainNode.gain.value = initialVol;
  gainNode.gain.minValue = initialVol;
  gainNode.gain.maxValue = initialVol;

  // Mouse pointer coordinates
  let CurX;
  let CurY;

  document.addEventListener("mousemove", updatePage);
  document.addEventListener(
    "touchmove",
    (e) => {
      // prevent scrolling
      e.preventDefault();
      // use first touch point for mouse coordinates
      updatePage(e.touches[0]);
    },
    { passive: false }
  );

  // Get new mouse pointer coordinates when mouse is moved
  // then set new gain and pitch values
  document.onmousemove = updatePage;

  function updatePage(e) {
    KeyFlag = false;

    CurX = e.pageX;
    CurY = e.pageY;

    oscillator.frequency.value = (CurX / WIDTH) * maxFreq;
    gainNode.gain.value = (CurY / HEIGHT) * maxVol;

    canvasDraw();
  }

  // mute button
  const mute = document.querySelector(".mute");

  mute.onclick = function () {
    if (mute.getAttribute("data-muted") === "false") {
      gainNode.disconnect(audioCtx.destination);
      mute.setAttribute("data-muted", "true");
      mute.innerHTML = "Unmute";
    } else {
      gainNode.connect(audioCtx.destination);
      mute.setAttribute("data-muted", "false");
      mute.innerHTML = "Mute";
    }
  };

  // canvas visualization
  function random(number1, number2) {
    return number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  }

  const canvas = document.querySelector(".canvas");
  const canvasCtx = canvas.getContext("2d");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  function canvasDraw() {
    if (KeyFlag) {
      rX = KeyX;
      rY = KeyY;
    } else {
      rX = CurX;
      rY = CurY;
    }

    rC = Math.floor((gainNode.gain.value / maxVol) * 30);

    canvasCtx.globalAlpha = 0.2;

    for (let i = 1; i <= 15; i = i + 2) {
      canvasCtx.beginPath();
      canvasCtx.fillStyle =
        "rgb(" +
        100 +
        i * 10 +
        "," +
        Math.floor((gainNode.gain.value / maxVol) * 255) +
        "," +
        Math.floor((oscillator.frequency.value / maxFreq) * 255) +
        ")";
      canvasCtx.arc(
        rX + random(0, 50),
        rY + random(0, 50),
        rC / 2 + i,
        (Math.PI / 180) * 0,
        (Math.PI / 180) * 360,
        false
      );
      canvasCtx.fill();
      canvasCtx.closePath();
    }
  }

  // clear screen
  const clear = document.querySelector(".clear");

  clear.onclick = function () {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // keyboard controls
  const body = document.querySelector("body");

  let KeyX = 1;
  let KeyY = 0.01;
  let KeyFlag = false;

  const ARROW_LEFT = "ArrowLeft";
  const ARROW_RIGHT = "ArrowRight";
  const ARROW_UP = "ArrowUp";
  const ARROW_DOWN = "ArrowDown";

  body.onkeydown = function (e) {
    KeyFlag = true;

    if (e.code === ARROW_LEFT) {
      KeyX -= 20;
    }

    if (e.code === ARROW_RIGHT) {
      KeyX += 20;
    }

    if (e.code === ARROW_UP) {
      KeyY -= 20;
    }

    if (e.code === ARROW_DOWN) {
      KeyY += 20;
    }

    // set max and min constraints for KeyX and KeyY
    if (KeyX < 1) {
      KeyX = 1;
    }

    if (KeyX > WIDTH) {
      KeyX = WIDTH;
    }

    if (KeyY < 0.01) {
      KeyY = 0.01;
    }

    if (KeyY > HEIGHT) {
      KeyY = HEIGHT;
    }

    oscillator.frequency.value = (KeyX / WIDTH) * maxFreq;
    gainNode.gain.value = (KeyY / HEIGHT) * maxVol;

    canvasDraw();
  };

  isAppInit = true;
}
