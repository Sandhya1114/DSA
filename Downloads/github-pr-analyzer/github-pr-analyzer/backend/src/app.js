const fastify = require('fastify');
const cors = require('@fastify/cors');
const prRoutes = require('./routes/prRoutes');

function buildApp() {
  const app = fastify({ logger: true });

  app.register(cors, {
    origin: process.env.CLIENT_URL || '*',
  });

  app.get('/health', async () => ({ status: 'ok' }));

  app.register(prRoutes, { prefix: '/api/pr' });

  return app;
}

module.exports = buildApp;
