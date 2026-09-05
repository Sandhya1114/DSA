const { analyzePR, getHistory, getOne } = require('../controllers/prController');

async function prRoutes(fastify) {
  // POST /api/pr/analyze  { prUrl }
  fastify.post('/analyze', analyzePR);

  // GET /api/pr/history
  fastify.get('/history', getHistory);

  // GET /api/pr/:id
  fastify.get('/:id', getOne);
}

module.exports = prRoutes;
