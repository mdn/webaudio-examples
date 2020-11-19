# webaudio-examples
Code examples that accompany the MDN Web Audio documentation https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

## AnalyserNode
The [audio-analyser](https://github.com/mdn/webaudio-examples/tree/master/audio-analyser) directory contains a very simple example showing a graphical visualization of an audio signal drawn with data taken from an <code>[AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)</code>. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-analyser/).

## Audio Basics
The [audio-basics](https://github.com/mdn/webaudio-examples/tree/master/audio-basics) directory contains a fun example showing a retro-style "boombox" that allows audio to be played, stereo-panned, and volume-adjusted. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-basics/).

## AudioBuffer
The [audio-buffer](https://github.com/mdn/webaudio-examples/tree/master/audio-buffer) directory contains a very simple example showing how to use an audio buffer in the Web Audio API. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-buffer/).

## AudioParam
The [audio-param](https://github.com/mdn/webaudio-examples/tree/master/audio-param) directory contains some simple examples showing how to use the methods of the Web Audio API <code>AudioParam</code> interface. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam). [Run example live](http://mdn.github.io/webaudio-examples/audio-param/).

## AudioContext States
The [audiocontext-states](https://github.com/mdn/webaudio-examples/tree/master/audiocontext-states) directory contains a simple demo of the new Web Audio API <code>AudioContext</code> states, including the states property and the <code>close()</code>, <code>resume()</code> and <code>suspend()</code> methods. See [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) for more details. [Run the demo live](http://mdn.github.io/webaudio-examples/audiocontext-states/).

## Compressor Example
The [compressor-example](https://github.com/mdn/webaudio-examples/tree/master/compressor-example) directory contains a simple demo to show usage of the Web Audio API <code>createDynamicsCompressor()</code> method and <code>DynamicsCompressorNode</code>. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createDynamicsCompressor](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createDynamicsCompressor). [Run the example live](http://mdn.github.io/webaudio-examples/compressor-example/).

## createMediaStreamDestination
The [create-media-stream-destination](https://github.com/mdn/webaudio-examples/tree/master/create-media-stream-destination) directory contains a simple example showing how the Web Audio API <code>[AudioContext.createMediaStreamDestination](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination)</code> can be used to output a stream - in this case to a <code>MediaRecorder</code> instance, to output a sinewave to an opus file. [Run the demo live](http://mdn.github.io/webaudio-examples/create-media-stream-destination/).

## decodeAudioData
The [decode-audio-data](https://github.com/mdn/webaudio-examples/tree/master/decode-audio-data) directory contains a simple example demonstrating usage of the Web Audio API <code>decodeAudioData()</code> method. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData). [View example live](http://mdn.github.io/webaudio-examples/decode-audio-data/).

## IIRFilterNode
The [iirfilter-node](https://github.com/mdn/webaudio-examples/tree/master/iirfilter-node) directory contains an example showing usage of an [IIRFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/IIRFilterNode). [Run the demo live](http://mdn.github.io/webaudio-examples/iirfilter-node/).

## createMediaElementSource
The [media-source-buffer](https://github.com/mdn/webaudio-examples/tree/master/media-source-buffer) directory contains a simple example demonstrating usage of the Web Audio API <code>AudioContext.createMediaElementSource()</code> method. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource) or [view the demo live](http://mdn.github.io/webaudio-examples/media-source-buffer/).

## OfflineAudioContext
The [offline-audio-context](https://github.com/mdn/webaudio-examples/tree/master/offline-audio-context) directory contains a simple example to show how a Web Audio API <code>OfflineAudioContext</code> object can be used to rapidly process/render audio in the background to create a buffer, which can then be used in any way you please. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext). [Run example live](http://mdn.github.io/webaudio-examples/offline-audio-context/).

## OfflineAudioContext Promise
The [offline-audio-context-promise](https://github.com/mdn/webaudio-examples/tree/master/offline-audio-context-promise) directory contains a simple example to show how a Web Audio API <code>OfflineAudioContext</code> object can be used to rapidly process/render audio in the background to create a buffer, which can then be used in any way you please. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/startRendering(promise)](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/startRendering(promise)). [Run the example live](http://mdn.github.io/webaudio-examples/offline-audio-context-promise/).

## PannerNode
The [panner-node](https://github.com/mdn/webaudio-examples/tree/master/panner-node) directory contains a demo to show basic usage of a Web Audio API <code>PannerNode</code> to control audio spatialization. See [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createPanner](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createPanner) for more details. [Run the example live](http://mdn.github.io/webaudio-examples/panner-node/).

## ScriptProcessorNode
The [script-processor-node](https://github.com/mdn/webaudio-examples/tree/master/script-processor-node) directory contains a simple demo showing how to use the Web Audio API's <code>ScriptProcessorNode</code> to process a loaded audio track, adding a little bit of white noise to each audio sample. For more information see [ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) documentation and the [live demo](http://mdn.github.io/webaudio-examples/script-processor-node/).

## Step Sequencer
The [step-sequencer](https://github.com/mdn/webaudio-examples/tree/master/step-sequencer) directory contains a simple step-sequencer that loops and manipulates sounds based on a dial-up modem. For more information see [Advanced techniques: creating sound, sequencing, timing, scheduling](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques). See the [live demo](http://mdn.github.io/webaudio-examples/step-sequencer/) also.

## StereoPannerNode
The [stereo-panner-node](https://github.com/mdn/webaudio-examples/tree/master/stereo-panner-node) directory contains a simple example to show how the Web Audio API <code>StereoPannerNode</code> can be used to pan an audio stream. See [https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode) for more details.
[Run the example live](http://mdn.github.io/webaudio-examples/stereo-panner-node/).

## createMediaStreamSource
The [stream-source-buffer](https://github.com/mdn/webaudio-examples/tree/master/stream-source-buffer) directory contains a simple example demonstrating usage of the Web Audio API <code>AudioContext.createMediaElementSource()</code> method. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource). [View example live](http://mdn.github.io/webaudio-examples/stream-source-buffer/).
