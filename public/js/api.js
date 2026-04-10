/**
 * api.js
 * Camada de serviço para comunicação com a API PHP
 */
const ApiService = (() => {

  /**
   * Wrapper fetch com tratamento de erro centralizado
   * @param {string} endpoint
   * @returns {Promise<any>}
   */
  async function _get(endpoint) {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * Busca todos os poemas
   * @returns {Promise<Poem[]>}
   */
  async function getPoems() {
    return _get(CONFIG.ENDPOINTS.POEMS);
  }

  /**
   * Busca todas as memórias
   * @returns {Promise<Memory[]>}
   */
  async function getMemories() {
    return _get(CONFIG.ENDPOINTS.MEMORIES);
  }

  /**
   * Busca poema/frase em destaque
   * @returns {Promise<Poem>}
   */
  async function getFeaturedPoem() {
    return _get(CONFIG.ENDPOINTS.FEATURED);
  }

  return { getPoems, getMemories, getFeaturedPoem };
})();

/*
  Estrutura esperada da API:

  GET /poems
  [
    {
      "id": 1,
      "title": "Título do poema",
      "body": "Conteúdo do poema...",
      "type": "poem | quote | letter",
      "featured": true | false,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]

  GET /poems/featured
  { "id": 1, "title": "...", "body": "...", "type": "...", ... }

  GET /memories
  [
    {
      "id": 1,
      "title": "Título da memória",
      "description": "Descrição...",
      "image_base64": "data:image/jpeg;base64,/9j/...",
      "date": "2024-06-15",
      "created_at": "2024-06-16T08:00:00Z"
    }
  ]
*/
