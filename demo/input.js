var _ = require('underscore')
var detectPitch = require('../pitch')

var NUM_SAMPLES = 4096
var signal = new Float32Array(NUM_SAMPLES)

navigator.webkitGetUserMedia({
  audio: true,
  video: false
}, function (stream) {
  var context = new AudioContext()
  var mic = context.createMediaStreamSource(stream)
  var buf = 4096
  var analyser = context.createAnalyser()

  mic.connect(analyser)
  analyser.connect(context.destination)

  function process () {
    requestAnimationFrame(process)

    analyser.getFloatTimeDomainData(signal)

    var period = detectPitch(signal, 0.2)
    var pitch = -1

    if(period) {
      pitch = Math.round(44100.0 / period)
      console.log(pitch)
    }
  }

  process()

}, function (e) {
  if (e) console.error(e)
})

window.onload = function () {
  if (window.location.protocol != 'https:') 
    window.location.protocol = 'https:'
}
