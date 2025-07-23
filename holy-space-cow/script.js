/*
  Sick? Definitely!
*/

const toggleButton = document.getElementById("toggle-btn");

let soundStarted = false;
let isPlaying = false;
const audioContext = new AudioContext();
// soundData is defined in assets.js
// It is an ogg file encoded as a Data URI (MIME type plus base64 string).
const mooSound = new Audio(mooSoundDataUri);
mooSound.crossOrigin = "anonymous";
mooSound.loop = true;
const source = audioContext.createMediaElementSource(mooSound);

// The gain node lets us toggle sound on/off, but we also use it to increase
// volume when the object is near and decrease volume when far away.
const gainNode = audioContext.createGain();
gainNode.gain.value = 0;
const reverbNode = audioContext.createConvolver();
// impulseResponse is defined in assets.js
// It's a base64 encoded string.
// Convert it to a binary array first
const reverbSoundArrayBuffer = base64ToArrayBuffer(impulseResponse);
// Pans the sound left/right. Synced with the object's screen position.
const pannerNode = audioContext.createStereoPanner();

// Connect the audio chain together
source.connect(gainNode);
gainNode.connect(pannerNode);
pannerNode.connect(reverbNode);
reverbNode.connect(audioContext.destination);

let tick = (3 / 2) * Math.PI;
const updateTime = 200;
const timeForOneRev = 30000;
// From 0 to 2π should take timeForOneRev ms
const increaseFactor = (Math.PI * 2) / (timeForOneRev / updateTime);

function updatePanValue() {
  if (isPlaying) {
    const panValue = Math.sin(tick);
    pannerNode.pan.value = panValue;

    const gainValue = (Math.cos(tick) / 2 + 0.5) * 0.9 + 0.1;
    gainNode.gain.value = gainValue;
  }
  tick += increaseFactor;
}

// http://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function toggleSound() {
  if (!soundStarted) {
    // Start playing only when user has interacted
    mooSound.play();
    soundStarted = true;
  }
  isPlaying = !isPlaying;
  if (isPlaying) {
    toggleButton.innerHTML = "<h3>Stop sound!</h3>";
  } else {
    gainNode.gain.value = 0;
    toggleButton.innerHTML = "<h3>Start sound</h3>";
  }
}

function random(max) {
  return Math.floor(Math.random() * max);
}

function addStar(type, zIndex) {
  const div = document.createElement("div");
  div.classList.add("star", type);
  div.style.top = random(window.innerHeight) + "px";
  div.style.zIndex = zIndex;
  document.body.appendChild(div);
}

audioContext.decodeAudioData(
  reverbSoundArrayBuffer,
  (buffer) => {
    reverbNode.buffer = buffer;
  },
  (e) => {
    console.error("Error when decoding audio data", e.err);
  }
);

setInterval(updatePanValue, updateTime);

for (let i = 0; i < 20; ++i) {
  const delay = i * 333;
  setTimeout(addStar, delay, "small", -200);
  setTimeout(addStar, delay + 333, "medium", -100);
  setTimeout(addStar, delay + 666, "big");
}

toggleButton.addEventListener("click", toggleSound);
