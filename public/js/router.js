const SwipeRouter = (() => {

  const pages    = [];
  let current    = 0;
  let container;

  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging  = false;

  function addPage({ id, label, loader }) {
    pages.push({ id, label, loader, loaded: false });
  }

  function init() {
    container = document.getElementById('swipe-container');

    pages.forEach((page, i) => {
      const slot = document.createElement('div');
      slot.className = 'swipe-page';
      slot.id = `page-${page.id}`;
      slot.dataset.index = i;
      container.appendChild(slot);
    });

    _goTo(0, false);
    _bindTouch();
    _bindKeyboard();
  }

  async function _goTo(index, animate = true) {
    if (index < 0 || index >= pages.length) return;
    current = index;

    container.style.transition = animate
      ? 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
    container.style.transform = `translateX(-${index * 100}vw)`;


    const page = pages[index];
    if (!page.loaded) {
      await _loadPage(index);
    }

    [index - 1, index + 1].forEach(adj => {
      if (adj >= 0 && adj < pages.length && !pages[adj].loaded) {
        setTimeout(() => _loadPage(adj), 800);
      }
    });
  }

  async function _loadPage(index) {
    const page = pages[index];
    if (page.loaded) return;

    const slot = document.getElementById(`page-${page.id}`);

    slot.innerHTML = `
      <div class="loading-state" style="padding-top: 80px;">
        <div class="loading-hearts"><span>♡</span><span>♡</span><span>♡</span></div>
        <p>carregando...</p>
      </div>
    `;

    try {
      const el = await page.loader();
      slot.innerHTML = '';
      slot.appendChild(el);
      page.loaded = true;
    } catch (err) {
      console.error(`[SwipeRouter] Erro ao carregar página "${page.id}":`, err);
      slot.innerHTML = `
        <div class="error-state" style="padding-top: 80px;">
          <p>💔 Não consegui carregar esta página.</p>
          <button class="retry-btn" onclick="SwipeRouter._retryPage(${index})">
            Tentar novamente
          </button>
        </div>
      `;
    }
  }

  function _retryPage(index) {
    pages[index].loaded = false;
    _loadPage(index);
  }

  function _bindTouch() {
    container.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging  = false;
    }, { passive: true });

    container.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;

      if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        isDragging = true;
      }

      if (isDragging) {
        const base = -(current * window.innerWidth);
        container.style.transition = 'none';
        container.style.transform = `translateX(${base + dx * 0.45}px)`;
      }
    }, { passive: true });

    container.addEventListener('touchend', e => {
      if (!isDragging) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      isDragging = false;

      if (dx < -50 && current < pages.length - 1) _goTo(current + 1);
      else if (dx > 50 && current > 0)             _goTo(current - 1);
      else                                          _goTo(current); // volta ao lugar
    });
  }

  function _bindKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' && current < pages.length - 1) _goTo(current + 1);
      if (e.key === 'ArrowLeft'  && current > 0)                 _goTo(current - 1);
    });
  }

  function goTo(id) {
    const index = pages.findIndex(p => p.id === id);
    if (index !== -1) _goTo(index);
  }

  return { addPage, init, goTo, _retryPage };
})();
