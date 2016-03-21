import detectPitch from '../pitch.js'
import p from './paper-core.min.js'

const NUM_SAMPLES = 4096
const interval = 20
let signal = new Float32Array(NUM_SAMPLES)
let ymax = window.innerHeight/300


// use https
window.addEventListener('load', (e) => { 
  if (window.location.protocol != 'https:') 
    window.location.protocol = 'https:'
}, false)


// setup canvas
const ctx = document.createElement('canvas')
document.body.style.padding = 0
document.body.style.margin = 0
document.body.appendChild(ctx)
ctx.style.backgroundColor = 'pink'
ctx.height = window.innerHeight
ctx.width = window.innerWidth

p.setup(ctx)


// get mic input
navigator.webkitGetUserMedia({ 
  audio: true,
  video: false
}, (stream) => {
  const context = new AudioContext()
  const mic = context.createMediaStreamSource(stream)
  const analyser = context.createAnalyser()

  mic.connect(analyser)
  // analyser.connect(context.destination)

  function process () {
    requestAnimationFrame(process)

    analyser.getFloatTimeDomainData(signal)

    const period = detectPitch(signal, 0.6)
    let pitch = -1

    if(period) {
      pitch = Math.round(44100.0 / period)
      const x = parseInt(peak.position.x + (peak.bounds.width*0.5)) + interval
      const y = window.innerHeight - (pitch*ymax)
      peak.add(new p.Segment([x,y],[-11,0],[11,0]))

      if (peak.position.x + (peak.bounds.width * 0.5) > window.innerWidth) {
        peak.position.x = (window.innerWidth-peak.position.x) + (interval+5)
        peak.removeSegments(0,1)
      }

      p.view.draw()
    }
  }

  process()

}, (e) => {
  if (e) console.error(e)
})


const peak = new p.Path([0,window.innerHeight-25],[0,window.innerHeight-25])
peak.strokeColor = '#333'
peak.strokeWidth = 2

const graph = new p.Group()

const drawGraph = function () {
  for (var i=0;i<16;i++) {
    const y = window.innerHeight-((i*20)*ymax)
    graph.addChildren([
      new p.PointText({
        point: [6,y+11],
        content: i*20+'hz',
        fontSize: 11,
        fontFamily: 'monospace',
        fillColor: 'rgba(0,0,255,0.6)'
      }),
      new p.Path.Line({
        from: [0,y],
        to: [window.innerWidth,y],
        strokeColor: 'rgba(0,0,255,0.4)'
      })
    ])
  }
  graph.addChildren([
    new p.Path.Line({
      from: [0,window.innerHeight-(185*ymax)],
      to: [window.innerWidth,window.innerHeight-(185*ymax)],
      strokeWidth: 2,
      strokeColor: 'rgba(197, 68, 192, 0.81)'
    })
  ])
  p.view.draw()
}


drawGraph()


window.addEventListener('resize', (e) => {
  console.log(e)
})


window.addEventListener('mousewheel', (e) => {
  console.log(e.target)
  if (e.target.tagName == 'CANVAS') return

  const range = (e.target.className.match('cutoff')) 
    ? false
    : true

  let val = parseInt(e.target.value)

  if (e.deltaY < 0) {
    if (e.target.value < 0) return
    e.target.value = val--
  } else {
    const max = (range) ? 10000 : 10;
    if (e.target.value > max) return
    e.target.value = val++
  }
})


document.body.querySelector('.cutoff').addEventListener('change', (e) => {
  console.log(e)
}, false)


document.body.querySelector('.range').addEventListener('change', (e) => {
  console.log(e)
}, false)
