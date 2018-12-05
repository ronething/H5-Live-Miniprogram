var Hls = window.Hls;
var video = document.getElementById('video');
var btn = document.querySelector(".btn");
var player = document.querySelector(".player");
if (Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource('http://live.streamingfast.net/hls-live/goodtv/_definst_/liveevent/live-ch2-3.m3u8');
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    // video.play();
  });
}
// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
// This is using the built-in support of the plain video element, without using hls.js.
// Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
// white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = 'http://live.streamingfast.net/hls-live/goodtv/_definst_/liveevent/live-ch2-3.m3u8';
  video.addEventListener('loadedmetadata', function () {
    // video.play();
  });
}

btn.addEventListener("click", function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
})

video.addEventListener("play", function () {
  player.className = "player";
})

video.addEventListener("pause", function () {
  player.className = "player pause";
})

video.addEventListener("click", function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
})
