window.addEventListener("DOMContentLoaded", loadPage, false);

// define variables
const audioCtx = new AudioContext();
let buffer;
let source;

const play = document.getElementById("play");
const stop = document.getElementById("stop");

const playbackControl = document.getElementById("playback-rate-control");
const playbackValue = document.getElementById("playback-rate-value");

const loopstartControl = document.getElementById("loopstart-control");
const loopstartValue = document.getElementById("loopstart-value");

const loopendControl = document.getElementById("loopend-control");
const loopendValue = document.getElementById("loopend-value");

function loadPage() {
  getAudio("viper");
}

async function getAudio(name) {
  try {
    const response = await fetch(`${name}.mp3`);
    audioCtx.decodeAudioData(await response.arrayBuffer(), (buf) => {
      // executes when buffer has been decoded
      buffer = buf;
      const max = Math.floor(buf.duration);
      loopstartControl.max = max;
      loopendControl.max = max;
      play.disabled = false; // buffer loaded, enable play button
    });
  } catch (err) {
    console.error(
      `Unable to fetch the audio file: ${name} Error: ${err.message}`
    );
  }
}

play.onclick = () => {
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = playbackControl.value;
  source.connect(audioCtx.destination);
  source.loop = true;
  source.loopStart = loopstartControl.value;
  source.loopEnd = loopendControl.value;
  source.start();
  play.disabled = true;
  playbackControl.disabled = false;
  loopstartControl.disabled = false;
  loopendControl.disabled = false;
};

stop.onclick = () => {
  source.stop();
  play.disabled = false;
  playbackControl.disabled = true;
  loopstartControl.disabled = true;
  loopendControl.disabled = true;
};

playbackControl.oninput = () => {
  source.playbackRate.value = playbackControl.value;
  playbackValue.textContent = playbackControl.value;
};

loopstartControl.oninput = () => {
  source.loopStart = loopstartControl.value;
  loopstartValue.textContent = loopstartControl.value;
};

loopendControl.oninput = () => {
  source.loopEnd = loopendControl.value;
  loopendValue.textContent = loopendControl.value;
};