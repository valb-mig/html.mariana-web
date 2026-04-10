const PoemsModule = (() => {

  function _formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  function _typeBadge(type) {
    const labels = { poem: 'Poema', quote: 'Frase', letter: 'Carta' };
    const el = document.createElement('span');
    el.className = `poem-type-badge ${type || 'poem'}`;
    el.textContent = labels[type] || type || 'Poema';
    return el;
  }

  function _buildCard(poem, index) {
    const card = document.createElement('article');
    card.className = 'poem-card';
    card.style.animationDelay = `${index * 0.08}s`;

    card.appendChild(_typeBadge(poem.type));

    const title = document.createElement('h3');
    title.className = 'poem-title';
    title.textContent = poem.title || '';
    card.appendChild(title);

    const body = document.createElement('p');
    body.className = 'poem-body';
    body.textContent = poem.body || '';
    card.appendChild(body);

    const lines = (poem.body || '').split('\n').length;
    if (lines > 6 || (poem.body || '').length > 280) {
      const btn = document.createElement('button');
      btn.className = 'poem-expand-btn';
      btn.textContent = 'Ler mais ↓';
      btn.dataset.expanded = 'false';
      btn.addEventListener('click', () => {
        const expanded = btn.dataset.expanded === 'true';
        card.classList.toggle('expanded', !expanded);
        btn.dataset.expanded = String(!expanded);
        btn.textContent = !expanded ? 'Recolher ↑' : 'Ler mais ↓';
      });
      card.appendChild(btn);
    }

    if (poem.created_at) {
      const date = document.createElement('time');
      date.className = 'poem-date';
      date.textContent = _formatDate(poem.created_at);
      card.appendChild(date);
    }

    return card;
  }

  async function buildHomePage() {
    const wrap = document.createElement('div');
    wrap.className = 'home-page';

    const greeting = document.createElement('p');
    greeting.className = 'home-greeting';
    greeting.textContent = 'para você, com amor ♡';
    wrap.appendChild(greeting);

    const poemWrap = document.createElement('div');
    poemWrap.innerHTML = `
      <div class="home-poem-loading loading-state">
        <div class="loading-hearts"><span>♡</span><span>♡</span><span>♡</span></div>
        <p>carregando...</p>
      </div>
    `;
    wrap.appendChild(poemWrap);

    const hint = document.createElement('div');
    hint.className = 'home-swipe-hint';
    hint.innerHTML = `<span>deslize para ver mais</span><span class="hint-arrow">→</span>`;
    wrap.appendChild(hint);

    try {
      const poem = await ApiService.getFeaturedPoem();
      poemWrap.innerHTML = '';

      const inner = document.createElement('div');
      inner.className = 'home-poem-wrap';

      if (poem.type) inner.appendChild(_typeBadge(poem.type));

      if (poem.title) {
        const t = document.createElement('h2');
        t.className = 'home-poem-title';
        t.textContent = poem.title;
        inner.appendChild(t);
      }

      const b = document.createElement('p');
      b.className = 'home-poem-body';
      b.textContent = poem.body || '';
      inner.appendChild(b);

      if (poem.created_at) {
        const d = document.createElement('time');
        d.className = 'home-poem-date';
        d.textContent = _formatDate(poem.created_at);
        inner.appendChild(d);
      }

      poemWrap.appendChild(inner);
    } catch (err) {
      poemWrap.innerHTML = `
        <div class="error-state">
          <p>💔 Não consegui carregar o poema agora.</p>
        </div>
      `;
    }

    return wrap;
  }

  async function buildPoemsPage() {
    const wrap = document.createElement('div');
    wrap.className = 'poems-page';

    // Header
    wrap.innerHTML = `
      <div class="page-header">
        <div class="page-tag">✦ para você</div>
        <h2 class="page-title">Poemas & Frases</h2>
      </div>
    `;

    const grid = document.createElement('div');
    grid.className = 'poems-grid';
    wrap.appendChild(grid);

    try {
      const poems = await ApiService.getPoems();

      if (!poems || poems.length === 0) {
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">✍️</div>
            <p>Em breve, palavras cheias de amor por você...</p>
          </div>
        `;
      } else {
        poems.forEach((poem, i) => grid.appendChild(_buildCard(poem, i)));
      }
    } catch (err) {
      grid.innerHTML = `
        <div class="error-state">
          <p>💔 Não consegui carregar os poemas.</p>
        </div>
      `;
    }

    return wrap;
  }

  return { buildHomePage, buildPoemsPage };
})();
