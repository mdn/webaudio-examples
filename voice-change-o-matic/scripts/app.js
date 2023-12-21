const heading = document.querySelector("h1");
heading.textContent = "CLICK HERE TO START";
document.body.addEventListener("click", init);

async function init() {
  heading.textContent = "Voice-change-O-matic";
  document.body.removeEventListener("click", init);

  const audioCtx = new AudioContext();
  const voiceSelect = document.getElementById("voice");
  let source;
  let stream;

  // Grab the mute button to use below
  const mute = document.querySelector(".mute");

  // Set up the different audio nodes we will use for the app
  const analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  const distortion = audioCtx.createWaveShaper();
  const gainNode = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();
  const convolver = audioCtx.createConvolver();

  const echoDelay = createEchoDelayEffect(audioCtx);

  // Distortion curve for the waveshaper, thanks to Kevin Ennis
  // http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
  function makeDistortionCurve(amount) {
    let k = typeof amount === "number" ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Grab audio track via fetch() for convolver node
  try {
    const response = await fetch(
      "https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg"
    );
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudio = await audioCtx.decodeAudioData(arrayBuffer);
    convolver.buffer = decodedAudio;
  } catch (error) {
    console.error(
      `Unable to fetch the audio file: ${name} Error: ${error.message}`
    );
  }

  // Set up canvas context for visualizer
  const canvas = document.querySelector(".visualizer");
  const canvasCtx = canvas.getContext("2d");

  const intendedWidth = document.querySelector(".wrapper").clientWidth;
  canvas.setAttribute("width", intendedWidth);
  const visualSelect = document.getElementById("visual");
  let drawVisual;

  // Main block for doing the audio recording
  const constraints = { audio: true };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      convolver.connect(gainNode);
      echoDelay.placeBetween(gainNode, analyser);
      analyser.connect(audioCtx.destination);

      visualize();
      voiceChange();
    })
    .catch(function (err) {
      console.error("The following gUM error occured: " + err);
    });

  function visualize() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const visualSetting = visualSelect.value;
    console.log(visualSetting);

    if (visualSetting === "sinewave") {
      analyser.fftSize = 2048;
      const bufferLength = analyser.fftSize;
      console.log(bufferLength);

      // We can use Float32Array instead of Uint8Array if we want higher precision
      // const dataArray = new Float32Array(bufferLength);
      const dataArray = new Uint8Array(bufferLength);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      const draw = () => {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0, 0, 0)";

        canvasCtx.beginPath();

        const sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * HEIGHT) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(WIDTH, HEIGHT / 2);
        canvasCtx.stroke();
      };

      draw();
    } else if (visualSetting == "frequencybars") {
      analyser.fftSize = 256;
      const bufferLengthAlt = analyser.frequencyBinCount;
      console.log(bufferLengthAlt);

      // See comment above for Float32Array()
      const dataArrayAlt = new Uint8Array(bufferLengthAlt);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      const drawAlt = () => {
        drawVisual = requestAnimationFrame(drawAlt);

        analyser.getByteFrequencyData(dataArrayAlt);

        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLengthAlt; i++) {
          const barHeight = dataArrayAlt[i];

          canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          canvasCtx.fillRect(
            x,
            HEIGHT - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }
      };

      drawAlt();
    } else if (visualSetting == "off") {
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.fillStyle = "red";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  }

  function voiceChange() {
    distortion.oversample = "4x";
    biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0);

    const voiceSetting = voiceSelect.value;
    console.log(voiceSetting);

    if (echoDelay.isApplied()) {
      echoDelay.discard();
    }

    // When convolver is selected it is connected back into the audio path
    if (voiceSetting == "convolver") {
      biquadFilter.disconnect(0);
      biquadFilter.connect(convolver);
    } else {
      biquadFilter.disconnect(0);
      biquadFilter.connect(gainNode);

      if (voiceSetting == "distortion") {
        distortion.curve = makeDistortionCurve(400);
      } else if (voiceSetting == "biquad") {
        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0);
        biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0);
      } else if (voiceSetting == "delay") {
        echoDelay.apply();
      } else if (voiceSetting == "off") {
        console.log("Voice settings turned off");
      }
    }
  }

  function createEchoDelayEffect(audioContext) {
    const delay = audioContext.createDelay(1);
    const dryNode = audioContext.createGain();
    const wetNode = audioContext.createGain();
    const mixer = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    delay.delayTime.value = 0.75;
    dryNode.gain.value = 1;
    wetNode.gain.value = 0;
    filter.frequency.value = 1100;
    filter.type = "highpass";
    return {
      apply() {
        wetNode.gain.setValueAtTime(0.75, audioContext.currentTime);
      },
      discard() {
        wetNode.gain.setValueAtTime(0, audioContext.currentTime);
      },
      isApplied() {
        return wetNode.gain.value > 0;
      },
      placeBetween(inputNode, outputNode) {
        inputNode.connect(delay);
        delay.connect(wetNode);
        wetNode.connect(filter);
        filter.connect(delay);

        inputNode.connect(dryNode);
        dryNode.connect(mixer);
        wetNode.connect(mixer);
        mixer.connect(outputNode);
      },
    };
  }

  // Event listeners to change visualize and voice settings
  visualSelect.addEventListener("change", () => {
    cancelAnimationFrame(drawVisual);
    visualize();
  });

  voiceSelect.addEventListener("change", () => {
    voiceChange();
  });

  mute.addEventListener("click", () => {
    if (mute.id === "") {
      gainNode.gain.value = 0;
      mute.id = "activated";
      mute.innerHTML = "Unmute";
    } else {
      gainNode.gain.value = 1;
      mute.id = "";
      mute.innerHTML = "Mute";
    }
  });
}
