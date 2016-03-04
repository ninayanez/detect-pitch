if (window.location.protocol != 'https:') 
  window.location = 'https://ninayanez.github.io/detect-pitch'

navigator.webkitGetUserMedia({audio:true,video:false}, function (stream) {
  var context = new AudioContext()
  var mic = context.createMediaStreamSource(stream)
  var buf = 4096
  var recorder = context.createScriptProcessor(buf,1,1)

  recorder.onaudioprocess = function (e) {
    var d = e.inputBuffer.getChannelData(0)
    console.log(d)
  }

  mic.connect(recorder)
  recorder.connect(context.destination)
}, function (e) {
  if (e) console.error(e)
})
