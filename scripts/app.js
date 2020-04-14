let heading = document.querySelector('h1');
heading.textContent = 'CLICK ANYWHERE TO START'
document.body.addEventListener('click', init);


function init() {
  heading.textContent = 'Voice-change-O-matic';
  document.body.removeEventListener('click', init)

  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }


  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {

      // First get ahold of the legacy getUserMedia, if present
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }



  // set up forked web audio context, for multiple browsers
  // window. is needed otherwise Safari explodes

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var voiceSelect = document.getElementById("voice");
  var source;
  var stream;

  // grab the mute button to use below

  var mute = document.querySelector('.mute');

  //set up the different audio nodes we will use for the app

  var analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  var distortion = audioCtx.createWaveShaper();
  var gainNode = audioCtx.createGain();
  var biquadFilter = audioCtx.createBiquadFilter();
  var convolver = audioCtx.createConvolver();

  // distortion curve for the waveshaper, thanks to Kevin Ennis
  // http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

  // grab audio track via XHR for convolver node

  var soundSource;

  ajaxRequest = new XMLHttpRequest();

  ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

  ajaxRequest.responseType = 'arraybuffer';


  ajaxRequest.onload = function() {
    var audioData = ajaxRequest.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        soundSource = audioCtx.createBufferSource();
        convolver.buffer = buffer;
      }, function(e){ console.log("Error with decoding audio data" + e.err);});

    //soundSource.connect(audioCtx.destination);
    //soundSource.loop = true;
    //soundSource.start();
  };

  ajaxRequest.send();

  // set up canvas context for visualizer

  var canvas = document.querySelector('.visualizer');
  var canvasCtx = canvas.getContext("2d");

  var intendedWidth = document.querySelector('.wrapper').clientWidth;

  canvas.setAttribute('width',intendedWidth);

  var visualSelect = document.getElementById("visual");

  var drawVisual;

  //main block for doing the audio recording

  if (navigator.mediaDevices.getUserMedia) {
     console.log('getUserMedia supported.');
     var constraints = {audio: true}
     navigator.mediaDevices.getUserMedia (constraints)
        .then(
          function(stream) {
             source = audioCtx.createMediaStreamSource(stream);
             source.connect(distortion);
             distortion.connect(biquadFilter);
             biquadFilter.connect(gainNode);
             convolver.connect(gainNode);
             gainNode.connect(analyser);
             analyser.connect(audioCtx.destination);

          	 visualize();
             voiceChange();
        })
        .catch( function(err) { console.log('The following gUM error occured: ' + err);})
  } else {
     console.log('getUserMedia not supported on your browser!');
  }

  function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;


    var visualSetting = visualSelect.value;
    console.log(visualSetting);

    if(visualSetting === "sinewave") {
      analyser.fftSize = 2048;
      var bufferLength = analyser.fftSize;
      console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      var draw = function() {

        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

          var v = dataArray[i] / 128.0;
          var y = v * HEIGHT/2;

          if(i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
      };

      draw();

    } else if(visualSetting == "frequencybars") {
      analyser.fftSize = 256;
      var bufferLengthAlt = analyser.frequencyBinCount;
      console.log(bufferLengthAlt);
      var dataArrayAlt = new Uint8Array(bufferLengthAlt);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      var drawAlt = function() {
        drawVisual = requestAnimationFrame(drawAlt);

        analyser.getByteFrequencyData(dataArrayAlt);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
        var barHeight;
        var x = 0;

        for(var i = 0; i < bufferLengthAlt; i++) {
          barHeight = dataArrayAlt[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
          canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

          x += barWidth + 1;
        }
      };

      drawAlt();

    } else if(visualSetting == "off") {
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.fillStyle = "red";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    }

  }

  function voiceChange() {

    distortion.oversample = '4x';
    biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0)

    var voiceSetting = voiceSelect.value;
    console.log(voiceSetting);

    //when convolver is selected it is connected back into the audio path
    if(voiceSetting == "convolver") {
      biquadFilter.disconnect(0);
      biquadFilter.connect(convolver);
    } else {
      biquadFilter.disconnect(0);
      biquadFilter.connect(gainNode);

      if(voiceSetting == "distortion") {
        distortion.curve = makeDistortionCurve(400);
      } else if(voiceSetting == "biquad") {
        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0)
        biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0)
      } else if(voiceSetting == "off") {
        console.log("Voice settings turned off");
      }
    }
  }

  // event listeners to change visualize and voice settings

  visualSelect.onchange = function() {
    window.cancelAnimationFrame(drawVisual);
    visualize();
  };

  voiceSelect.onchange = function() {
    voiceChange();
  };

  mute.onclick = voiceMute;

  function voiceMute() {
    if(mute.id === "") {
      gainNode.gain.value = 0;
      mute.id = "activated";
      mute.innerHTML = "Unmute";
    } else {
      gainNode.gain.value = 1;
      mute.id = "";
      mute.innerHTML = "Mute";
    }
  }
}
