/**
 * petals.js
 * Pétalas caindo no fundo
 */
const PetalsEngine = (() => {
  const EMOJIS = ['🌸', '🌺', '✿', '❀', '♡', '🌷'];
  const MAX_PETALS = 16;
  let container;

  function init() {
    container = document.getElementById('petals-container');
    if (!container) return;
    setInterval(spawnPetal, 1400);
  }

  function spawnPetal() {
    if (container.children.length >= MAX_PETALS) return;

    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    const duration = Math.random() * 8 + 8;
    const delay    = Math.random() * 2;
    const left     = Math.random() * 100;
    const size     = Math.random() * 14 + 10;

    petal.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(petal);

    setTimeout(() => petal.remove(), (duration + delay + 1) * 1000);
  }

  return { init };
})();
