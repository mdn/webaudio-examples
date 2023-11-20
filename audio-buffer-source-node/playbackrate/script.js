let audioCtx;
let buffer;
let source;

const play = document.getElementById("play");
const stop = document.getElementById("stop");

const playbackControl = document.getElementById("playback-rate-control");
const playbackValue = document.getElementById("playback-rate-value");

async function loadAudio() {
  try {
    // Load an audio file
    const response = await fetch("rnb-lofi-melody-loop.wav");
    // Decode it
    buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

play.addEventListener("click", async () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    await loadAudio();
  }
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.loop = true;
  source.playbackRate.value = playbackControl.value;
  source.start();
  play.disabled = true;
  stop.disabled = false;
  playbackControl.disabled = false;
});

stop.addEventListener("click", () => {
  source.stop();
  play.disabled = false;
  stop.disabled = true;
  playbackControl.disabled = true;
});

playbackControl.oninput = () => {
  source.playbackRate.value = playbackControl.value;
  playbackValue.textContent = playbackControl.value;
};
