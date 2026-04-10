/**
 * memories.js
 * Constrói a página de memórias para o SwipeRouter.
 */
const MemoriesModule = (() => {

  function _formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  function _openModal(memory) {
    const modal = document.getElementById('memory-modal');
    document.getElementById('modal-img').src         = memory.image_base64 || '';
    document.getElementById('modal-img').alt         = memory.title || 'Memória';
    document.getElementById('modal-title').textContent = memory.title || '';
    document.getElementById('modal-desc').textContent  = memory.description || '';
    document.getElementById('modal-date').textContent  = memory.date ? _formatDate(memory.date) : '';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function _closeModal() {
    document.getElementById('memory-modal').classList.add('hidden');
    document.body.style.overflow = '';
  }

  function _buildItem(memory, index) {
    const item = document.createElement('div');
    item.className = 'memory-item';
    item.style.animationDelay = `${index * 0.07}s`;

    const img = document.createElement('img');
    img.src     = memory.image_base64 || '';
    img.alt     = memory.title || 'Memória';
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'memory-overlay';
    overlay.innerHTML = `
      <div>
        <h4>${memory.title || ''}</h4>
        ${memory.date ? `<span>${_formatDate(memory.date)}</span>` : ''}
      </div>
    `;

    item.appendChild(img);
    item.appendChild(overlay);
    item.addEventListener('click', () => _openModal(memory));
    return item;
  }

  /* ---- Página de memórias ---- */
  async function buildMemoriesPage() {
    const wrap = document.createElement('div');
    wrap.className = 'memories-page';

    wrap.innerHTML = `
      <div class="page-header">
        <div class="page-tag">✦ nossas histórias</div>
        <h2 class="page-title">Memórias</h2>
      </div>
    `;

    const gallery = document.createElement('div');
    gallery.className = 'memories-gallery';
    wrap.appendChild(gallery);

    try {
      const memories = await ApiService.getMemories();

      if (!memories || memories.length === 0) {
        gallery.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📸</div>
            <p>Em breve, nossas memórias aqui...</p>
          </div>
        `;
      } else {
        memories.forEach((m, i) => gallery.appendChild(_buildItem(m, i)));
      }
    } catch (err) {
      gallery.innerHTML = `
        <div class="error-state">
          <p>💔 Não consegui carregar as memórias.</p>
        </div>
      `;
    }

    return wrap;
  }

  /* ---- Bind modal (chamado uma vez no app.js) ---- */
  function bindModal() {
    document.getElementById('modal-overlay').addEventListener('click', _closeModal);
    document.getElementById('modal-close').addEventListener('click', _closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') _closeModal(); });
  }

  return { buildMemoriesPage, bindModal };
})();
