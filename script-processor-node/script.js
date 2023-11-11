const myScript = document.querySelector("script");
const myPre = document.querySelector("pre");
const playButton = document.querySelector("button");

// Create AudioContext and buffer source
let audioCtx;
let source;

function init() {
  audioCtx = new AudioContext();
  source = audioCtx.createBufferSource();

  // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
  let scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
  console.log(scriptNode.bufferSize);

  // load in an audio track via XHR and decodeAudioData

  function getData() {
    request = new XMLHttpRequest();
    request.open("GET", "viper.ogg", true);
    request.responseType = "arraybuffer";
    request.onload = function () {
      let audioData = request.response;

      audioCtx.decodeAudioData(
        audioData,
        function (buffer) {
          myBuffer = buffer;
          source.buffer = myBuffer;
        },
        function (e) {
          "Error with decoding audio data" + e.err;
        }
      );
    };
    request.send();
  }

  // Give the node a function to process audio events
  scriptNode.onaudioprocess = function (audioProcessingEvent) {
    // The input buffer is the song we loaded earlier
    let inputBuffer = audioProcessingEvent.inputBuffer;

    // The output buffer contains the samples that will be modified and played
    let outputBuffer = audioProcessingEvent.outputBuffer;

    // Loop through the output channels (in this case there is only one)
    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      // Loop through the 4096 samples
      for (let sample = 0; sample < inputBuffer.length; sample++) {
        // make output equal to the same as the input
        outputData[sample] = inputData[sample];

        // add noise to each output sample
        outputData[sample] += (Math.random() * 2 - 1) * 0.2;
      }
    }
  };

  getData();

  source.connect(scriptNode);
  scriptNode.connect(audioCtx.destination);
  source.start();

  // When the buffer source stops playing, disconnect everything
  source.onended = function () {
    source.disconnect(scriptNode);
    scriptNode.disconnect(audioCtx.destination);
  };
}

// wire up play button
playButton.onclick = function () {
  if (!audioCtx) {
    init();
  }
};

//output the script into the pre element
myPre.innerHTML = myScript.innerHTML;
