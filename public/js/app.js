/**
 * app.js
 * Orquestrador principal.
 * 1. Animação do envelope
 * 2. Registra páginas no SwipeRouter
 * 3. Inicializa tudo
 */
document.addEventListener('DOMContentLoaded', () => {

  ParticlesEngine.init();
  PetalsEngine.init();
  MemoriesModule.bindModal();

  const intro    = document.getElementById('intro');
  const enterBtn = document.getElementById('enter-btn');
  const envFlap  = document.getElementById('env-flap');
  const envSeal  = document.getElementById('env-seal');
  const letterCard = document.getElementById('letter-card');

  function triggerOpen() {
    envFlap.classList.add('open');
    envSeal.classList.add('hidden-seal');

    setTimeout(() => {
      letterCard.classList.add('rising');
    }, 300);
  }

  envSeal.addEventListener('click', triggerOpen);

  enterBtn.addEventListener('click', () => {
    intro.classList.add('leaving');
    setTimeout(() => {
      intro.classList.add('hidden');
      document.getElementById('main-site').classList.remove('hidden');
      _initSite();
    }, 680);
  });

  function _initSite() {
    SwipeRouter.addPage({
      id: 'home',
      label: 'Início',
      loader: () => PoemsModule.buildHomePage(),
    });

    SwipeRouter.addPage({
      id: 'poems',
      label: 'Poemas',
      loader: () => PoemsModule.buildPoemsPage(),
    });

    SwipeRouter.addPage({
      id: 'memories',
      label: 'Memórias',
      loader: () => MemoriesModule.buildMemoriesPage(),
    });

    SwipeRouter.init();

    const nav = document.querySelector('.nav');
    const container = document.getElementById('swipe-container');

    container.addEventListener('scroll', () => {
      nav.style.boxShadow = container.scrollTop > 10
        ? '0 2px 20px rgba(200,80,100,0.08)'
        : '';
    }, { passive: true });
  }

});
