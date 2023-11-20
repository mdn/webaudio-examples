// Define both online and offline audio contexts
let audioCtx; // Must be initialized after a user interaction
const offlineCtx = new OfflineAudioContext(2, 44100 * 40, 44100);

// Define constants for dom nodes
const play = document.querySelector("#play");

function getData() {
  // Fetch an audio track, decode it and stick it in a buffer.
  // Then we put the buffer into the source and can play it.
  fetch("viper.ogg")
    .then((response) => response.arrayBuffer())
    .then((downloadedBuffer) => audioCtx.decodeAudioData(downloadedBuffer))
    .then((decodedBuffer) => {
      console.log("File downloaded.successfully.");
      const source = new AudioBufferSourceNode(offlineCtx, {
        buffer: decodedBuffer,
      });
      source.connect(offlineCtx.destination);
      return source.start();
    })
    .then(() => offlineCtx.startRendering())
    .then((renderedBuffer) => {
      console.log("Rendering completed successfully.");
      play.disabled = false;
      const song = new AudioBufferSourceNode(audioCtx, {
        buffer: renderedBuffer,
      });
      song.connect(audioCtx.destination);

      // Start the song
      song.start();
    })
    .catch((err) => {
      console.error(`Error encountered: ${err}`);
    });
}

// Activate the play button
play.onclick = () => {
  play.disabled = true;
  // We can initialize the context as the user clicked.
  audioCtx = new AudioContext();

  // Fetch the data and start the song
  getData();
};
