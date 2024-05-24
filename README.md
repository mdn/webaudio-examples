# webaudio-examples

Code examples that accompany the [MDN Web Audio documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

## Serving the examples

To preview the examples, clone the repository and navigate to the example you want to view.
For example, if you have Python installed, you can use the following commands to serve the `audio-analyser` example:

```bash
cd audio-analyser
python3 -m http.server
```

> [!NOTE]
> If you're using the built-in Python HTTP server, be sure to use at least [Python version `3.10.12`](https://www.python.org/downloads/release/python-31012/).

Then navigate to `http://localhost:8000` in your browser.

For more information on serving files locally using different languages or technologies, see [Running a simple local HTTP server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server#running_a_simple_local_http_server).

## Repository contents

### Audio analyser

The [audio-analyser](https://github.com/mdn/webaudio-examples/tree/main/audio-analyser) directory contains a very simple example showing a graphical visualization of an audio signal drawn with data taken from an [`AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) interface. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-analyser/).

### Audio basics

The [audio-basics](https://github.com/mdn/webaudio-examples/tree/main/audio-basics) directory contains a fun example showing a retro-style "boombox" that allows audio to be played, stereo-panned, and volume-adjusted. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-basics/).

### Audio buffer

The [audio-buffer](https://github.com/mdn/webaudio-examples/tree/main/audio-buffer) directory contains a very simple example showing how to use an [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) interface in the Web Audio API. [Run the demo live](http://mdn.github.io/webaudio-examples/audio-buffer/).

### Audio param

The [audio-param](https://github.com/mdn/webaudio-examples/tree/main/audio-param) directory contains some simple examples showing how to use the methods of the Web Audio API [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) interface. [Run example live](http://mdn.github.io/webaudio-examples/audio-param/).

### Audio context states

The [audiocontext-states](https://github.com/mdn/webaudio-examples/tree/main/audiocontext-states) directory contains a simple demo of the new Web Audio API [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) methods, including the `states` property and the `close()`, `resume()`, and `suspend()` methods. [Run the demo live](http://mdn.github.io/webaudio-examples/audiocontext-states/).

### Audio worklet

The [audioworklet](https://github.com/mdn/webaudio-examples/tree/main/audioworklet) directory contains an example showing how to use the [`AudioWorklet`](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) interface. See also the guide on [background audio processing using AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet). [Run the example live](http://mdn.github.io/webaudio-examples/audioworklet/).

### Compressor example

The [compressor-example](https://github.com/mdn/webaudio-examples/tree/main/compressor-example) directory contains a simple demo to show usage of the Web Audio API [`BaseAudioContext.createDynamicsCompressor()`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createDynamicsCompressor) method and [`DynamicsCompressorNode`](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode) interface. [Run the example live](http://mdn.github.io/webaudio-examples/compressor-example/).

### Create media stream destination

The [create-media-stream-destination](https://github.com/mdn/webaudio-examples/tree/main/create-media-stream-destination) directory contains a simple example showing how the Web Audio API [`AudioContext.createMediaStreamDestination()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination) method can be used to output a stream - in this case to a [`MediaRecorder`](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) instance - to output a sinewave to an [opus](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs#Opus) file. [Run the demo live](http://mdn.github.io/webaudio-examples/create-media-stream-destination/).

### Decode audio data

The [decode-audio-data](https://github.com/mdn/webaudio-examples/tree/main/decode-audio-data) directory contains a simple example demonstrating usage of the Web Audio API [`BaseAudioContext.decodeAudioData()`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) method. [View example live](http://mdn.github.io/webaudio-examples/decode-audio-data/promise).

### IIR filter node

The [iirfilter-node](https://github.com/mdn/webaudio-examples/tree/main/iirfilter-node) directory contains an example showing usage of an [`IIRFilterNode`](https://developer.mozilla.org/en-US/docs/Web/API/IIRFilterNode) interface. [Run the demo live](http://mdn.github.io/webaudio-examples/iirfilter-node/).

### Media source buffer

The [media-source-buffer](https://github.com/mdn/webaudio-examples/tree/main/media-source-buffer) directory contains a simple example demonstrating usage of the Web Audio API [`AudioContext.createMediaElementSource()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource) method. [View the demo live](http://mdn.github.io/webaudio-examples/media-source-buffer/).

### Multi track

The [multi-track](https://github.com/mdn/webaudio-examples/tree/main/multi-track) directory contains an example of connecting separate independently-playable audio tracks to a single [`AudioDestinationNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode) interface. [Run the example live](http://mdn.github.io/webaudio-examples/multi-track/).

### Offline audio context

The [offline-audio-context](https://github.com/mdn/webaudio-examples/tree/main/offline-audio-context) directory contains a simple example to show how a Web Audio API [`OfflineAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext) interface can be used to rapidly process/render audio in the background to create a buffer, which can then be used in any way you please. For more information, see [https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext). [Run example live](http://mdn.github.io/webaudio-examples/offline-audio-context/).

### Offline audio context promise

The [offline-audio-context-promise](https://github.com/mdn/webaudio-examples/tree/main/offline-audio-context-promise) directory contains a simple example to show how a Web Audio API [`OfflineAudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext) interface can be used to rapidly process/render audio in the background to create a buffer, which can then be used in any way you please. [Run the example live](http://mdn.github.io/webaudio-examples/offline-audio-context-promise/).

### Output timestamp

The [output-timestamp](https://github.com/mdn/webaudio-examples/tree/main/output-timestamp) directory contains an example of how the [`AudioContext.getOutputTimestamp()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/getOutputTimestamp) property can be used to log `contextTime` and `performanceTime` to the console. [Try the demo live](https://mdn.github.io/webaudio-examples/output-timestamp/).

### Panner node

The [panner-node](https://github.com/mdn/webaudio-examples/tree/main/panner-node) directory contains a demo to show basic usage of the Web Audio API [`BaseAudioContext.createPanner()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createPanner) method to control audio spatialization. [Run the example live](http://mdn.github.io/webaudio-examples/panner-node/).

### Script processor node

The [script-processor-node](https://github.com/mdn/webaudio-examples/tree/main/script-processor-node) directory contains a simple demo showing how to use the Web Audio API's [`ScriptProcessorNode`](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) interface to process a loaded audio track, adding a little bit of white noise to each audio sample. See the [live demo](http://mdn.github.io/webaudio-examples/script-processor-node/).

### Spatialization

The [spatialization](https://github.com/mdn/webaudio-examples/tree/main/spatialization) directory contains an example of how the various properties of a [`PannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode) interface can be adjusted to emulate sound in a three-dimensional space. For more information see [Web audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics). Try the [live demo](http://mdn.github.io/webaudio-examples/spatialization/).

### Step sequencer

The [step-sequencer](https://github.com/mdn/webaudio-examples/tree/main/step-sequencer) directory contains a simple step-sequencer that loops and manipulates sounds based on a dial-up modem. For more information see [Advanced techniques: creating sound, sequencing, timing, scheduling](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques). See the [live demo](http://mdn.github.io/webaudio-examples/step-sequencer/) also.

### Stereo panner node

The [stereo-panner-node](https://github.com/mdn/webaudio-examples/tree/main/stereo-panner-node) directory contains a simple example to show how the Web Audio API [`StereoPannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode) interface can be used to pan an audio stream. [Run the example live](http://mdn.github.io/webaudio-examples/stereo-panner-node/).

### Stream source buffer

The [stream-source-buffer](https://github.com/mdn/webaudio-examples/tree/main/stream-source-buffer) directory contains a simple example demonstrating usage of the Web Audio API [`MediaStreamAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode) object. [View example live](http://mdn.github.io/webaudio-examples/stream-source-buffer/).

### Violent theremin

Violent theremin uses the Web Audio API to generate sound, and HTML5 canvas for a bit of pretty visualization. The colors generated depend on the pitch and gain of the current note, which are themselves dependent on the mouse pointer position.

You can [view the demo](http://mdn.github.io/webaudio-examples/violent-theremin/) live here.

### Voice-change-O-matic

The [voice-change-o-matic](https://github.com/mdn/webaudio-examples/tree/main/voice-change-o-matic) directory contains a Web Audio API-powered voice changer and visualizer.

You can [view the demo](http://mdn.github.io/webaudio-examples/voice-change-o-matic/) live here.
