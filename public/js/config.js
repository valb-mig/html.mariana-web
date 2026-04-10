const CONFIG = {
  API_BASE_URL: 'https://ts-mariana-api-nu.vercel.app',

  ENDPOINTS: {
    POEMS:    '/poems',
    MEMORIES: '/memories',
    FEATURED: '/poems/featured',
  },

  FEATURED_POEM_INTERVAL_MS: 12000,
};

Object.freeze(CONFIG);
Object.freeze(CONFIG.ENDPOINTS);
