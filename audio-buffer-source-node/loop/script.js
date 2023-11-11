const audioCtx = new AudioContext();
let buffer;
let source;

const play = document.getElementById("play");
const stop = document.getElementById("stop");

const loopstartControl = document.getElementById("loopstart-control");
const loopstartValue = document.getElementById("loopstart-value");

const loopendControl = document.getElementById("loopend-control");
const loopendValue = document.getElementById("loopend-value");

async function loadAudio() {
  buffer = await fetchAudio("rnb-lofi-melody-loop.wav");
  const max = Math.floor(buffer.duration);
  loopstartControl.setAttribute("max", max);
  loopendControl.setAttribute("max", max);
  play.disabled = false;
}

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

play.addEventListener("click", () => {
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.loop = true;
  source.loopStart = loopstartControl.value;
  source.loopEnd = loopendControl.value;
  source.start();
  play.disabled = true;
  loopstartControl.disabled = false;
  loopendControl.disabled = false;
});

stop.addEventListener("click", () => {
  source.stop();
  play.disabled = false;
  loopstartControl.disabled = true;
  loopendControl.disabled = true;
});

loopstartControl.addEventListener("input", () => {
  source.loopStart = loopstartControl.value;
  loopstartValue.textContent = loopstartControl.value;
});

loopendControl.addEventListener("input", () => {
  source.loopEnd = loopendControl.value;
  loopendValue.textContent = loopendControl.value;
});

loadAudio();
