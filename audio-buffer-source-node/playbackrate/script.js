const audioCtx = new AudioContext();
let buffer;
let source;

const play = document.getElementById("play");
const stop = document.getElementById("stop");

const playbackControl = document.getElementById("playback-rate-control");
const playbackValue = document.getElementById("playback-rate-value");

async function fetchAudio(name) {
  try {
    const response = await fetch(name);
    return audioCtx.decodeAudioData(await response.arrayBuffer());
  } catch (err) {
    console.error(
      `Unable to fetch the audio file: ${name} Error: ${err.message}`
    );
  }
}

async function loadAudio() {
  buffer = await fetchAudio("rnb-lofi-melody-loop.wav");
  play.disabled = false;
}

play.addEventListener("click", () => {
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.loop = true;
  source.playbackRate.value = playbackControl.value;
  source.start();
  play.disabled = true;
  playbackControl.disabled = false;
});

stop.addEventListener("click", () => {
  source.stop();
  play.disabled = false;
  playbackControl.disabled = true;
});

playbackControl.oninput = () => {
  source.playbackRate.value = playbackControl.value;
  playbackValue.textContent = playbackControl.value;
};

loadAudio();
