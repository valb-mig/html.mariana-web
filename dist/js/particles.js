/**
 * particles.js
 * Partículas flutuantes de coração no fundo
 */
const ParticlesEngine = (() => {
  let canvas, ctx, particles = [], animId;
  const PARTICLE_COUNT = 40;

  function init() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    spawnParticles();
    loop();
    window.addEventListener('resize', resize);
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawnParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(true));
    }
  }

  function createParticle(randomY = false) {
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 20,
      size: Math.random() * 10 + 6,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.05,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.015 + 0.005,
    };
  }

  function drawHeart(cx, cy, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#e8768a';
    ctx.translate(cx, cy);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.bezierCurveTo(-15, -22, -30, -10, -15, 5);
    ctx.lineTo(0, 22);
    ctx.lineTo(15, 5);
    ctx.bezierCurveTo(30, -10, 15, -22, 0, -10);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.4;
      p.y -= p.speedY;

      if (p.y < -40) {
        particles[i] = createParticle(false);
      }

      drawHeart(p.x, p.y, p.size, p.opacity);
    });

    animId = requestAnimationFrame(loop);
  }

  return { init };
})();
