# webaudio-examples
Code examples that accompany the MDN Web Audio documentation https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

## Audio analyser
The [audio-analyser](https://github.com/mdn/webaudio-examples/tree/master/audio-analyser) directory contains a very simple example showing a graphical visualization of an audio signal drawn with data taken from an <code>[AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)</code> interface. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-analyser/).

## Audio basics
The [audio-basics](https://github.com/mdn/webaudio-examples/tree/master/audio-basics) directory contains a fun example showing a retro-style "boombox" that allows audio to be played, stereo-panned, and volume-adjusted. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-basics/).

## Audio buffer
The [audio-buffer](https://github.com/mdn/webaudio-examples/tree/master/audio-buffer) directory contains a very simple example showing how to use an <code>[AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)</code> interface in the Web Audio API. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-buffer/).

## Audio param
The [audio-param](https://github.com/mdn/webaudio-examples/tree/master/audio-param) directory contains some simple examples showing how to use the methods of the Web Audio API <code>[AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam)</code> interface. [Run example live](http://mdn.github.io/webaudio-examples/audio-param/).

## Audio context states
The [audiocontext-states](https://github.com/mdn/webaudio-examples/tree/master/audiocontext-states) directory contains a simple demo of the new Web Audio API <code>[AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)</code> methods, including the <code>states</code> property and the <code>close()</code>, <code>resume()</code>, and <code>suspend()</code> methods. [Run the demo live](http://mdn.github.io/webaudio-examples/audiocontext-states/).

## Compressor example
The [compressor-example](https://github.com/mdn/webaudio-examples/tree/master/compressor-example) directory contains a simple demo to show usage of the Web Audio API <code>[BaseAudioContext.createDynamicsCompressor()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createDynamicsCompressor)</code> method and <code>[DynamicsCompressorNode](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode)</code> interface. [Run the example live](http://mdn.github.io/webaudio-examples/compressor-example/).

## Create media stream destination
The [create-media-stream-destination](https://github.com/mdn/webaudio-examples/tree/master/create-media-stream-destination) directory contains a simple example showing how the Web Audio API <code>[AudioContext.createMediaStreamDestination()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination)</code> method can be used to output a stream - in this case to a <code>[MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)</code> instance - to output a sinewave to an [opus](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs#Opus) file. [Run the demo live](http://mdn.github.io/webaudio-examples/create-media-stream-destination/).

## Decode audio data
The [decode-audio-data](https://github.com/mdn/webaudio-examples/tree/master/decode-audio-data) directory contains a simple example demonstrating usage of the Web Audio API <code>[BaseAudioContext.decodeAudioData()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData)</code> method. [View example live](http://mdn.github.io/webaudio-examples/decode-audio-data/).

## IIR filter node
The [iirfilter-node](https://github.com/mdn/webaudio-examples/tree/master/iirfilter-node) directory contains an example showing usage of an [IIRFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/IIRFilterNode) interface. [Run the demo live](http://mdn.github.io/webaudio-examples/iirfilter-node/).

## Media source buffer
The [media-source-buffer](https://github.com/mdn/webaudio-examples/tree/master/media-source-buffer) directory contains a simple example demonstrating usage of the Web Audio API <code>[AudioContext.createMediaElementSource()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource)</code> method. [View the demo live](http://mdn.github.io/webaudio-examples/media-source-buffer/).

## Multi track
The [multi-track](https://github.com/mdn/webaudio-examples/tree/master/multi-track) directory contains an example of connecting separate independently-playable audio tracks to a single <code>[AudioDestinationNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode)</code> interface. [Run the example live](http://mdn.github.io/webaudio-examples/multi-track/).

## Offline audio context
The [offline-audio-context](https://github.com/mdn/webaudio-examples/tree/master/offline-audio-context) directory contains a simple example to show how a Web Audio API <code>[OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)</code> interface can be used to rapidly process/render audio in the background to create a buffer, which can then be used in any way you please. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext). [Run example live](http://mdn.github.io/webaudio-examples/offline-audio-context/).

## Offline audio context promise
The [offline-audio-context-promise](https://github.com/mdn/webaudio-examples/tree/master/offline-audio-context-promise) directory contains a simple example to show how a Web Audio API <code>[OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)</code> interface can be used to rapidly process/render audio in the background to create a buffer, which can then be used in any way you please. [Run the example live](http://mdn.github.io/webaudio-examples/offline-audio-context-promise/).

## Output timestamp
The [output-timestamp](https://github.com/mdn/webaudio-examples/tree/master/output-timestamp) directory contains an example of how the <code>[AudioContext.getOutputTimestamp()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/getOutputTimestamp)</code> property can be used to log <code>contextTime</code> and <code>performanceTime</code> to the console. [Try the demo live](https://mdn.github.io/webaudio-examples/output-timestamp/).

## Panner node
The [panner-node](https://github.com/mdn/webaudio-examples/tree/master/panner-node) directory contains a demo to show basic usage of the Web Audio API <code>[BaseAudioContext.createPanner()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createPanner)</code> method to control audio spatialization. [Run the example live](http://mdn.github.io/webaudio-examples/panner-node/).

## Script processor node
The [script-processor-node](https://github.com/mdn/webaudio-examples/tree/master/script-processor-node) directory contains a simple demo showing how to use the Web Audio API's <code>[ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode)</code> interface to process a loaded audio track, adding a little bit of white noise to each audio sample. See the [live demo](http://mdn.github.io/webaudio-examples/script-processor-node/).

## Spacialization
The [spacialization](https://github.com/mdn/webaudio-examples/tree/master/spacialization) directory contains an example of how the various properties of a <code>[PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode)</code> interface can be adjusted to emulate sound in a three-dimensional space. For more information see [Web audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics). Try the [live demo](http://mdn.github.io/webaudio-examples/spacialization/).

## Step sequencer
The [step-sequencer](https://github.com/mdn/webaudio-examples/tree/master/step-sequencer) directory contains a simple step-sequencer that loops and manipulates sounds based on a dial-up modem. For more information see [Advanced techniques: creating sound, sequencing, timing, scheduling](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques). See the [live demo](http://mdn.github.io/webaudio-examples/step-sequencer/) also.

## Stereo panner node
The [stereo-panner-node](https://github.com/mdn/webaudio-examples/tree/master/stereo-panner-node) directory contains a simple example to show how the Web Audio API <code>[StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode)</code> interface can be used to pan an audio stream. [Run the example live](http://mdn.github.io/webaudio-examples/stereo-panner-node/).

## Stream source buffer
The [stream-source-buffer](https://github.com/mdn/webaudio-examples/tree/master/stream-source-buffer) directory contains a simple example demonstrating usage of the Web Audio API <code>[AudioContext.createMediaElementSource()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource)</code> method. [View example live](http://mdn.github.io/webaudio-examples/stream-source-buffer/).
