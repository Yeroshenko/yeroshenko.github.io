nextParticle = new NextParticle({
  image: document.all.logo,
  width: window.innerWidth,
  height: window.innerHeight,
  maxWidth: 800,
  particleGap: 2,
  gravity: 0.1,
  mouseForce: -80,
  particleGap: 2
})
window.onresize = function () {
  if (window.innerWidth > 600) {
    nextParticle.width = window.innerWidth - 20
    nextParticle.height = window.innerHeight - 20
    nextParticle.start()
  }
}
