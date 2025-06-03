require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const fastify = require('fastify')({ logger: true });
const path = require('path');

const start = async () => {
  try {
    // Register CORS first
    await fastify.register(require('@fastify/cors'), {
      origin: true,
    });

    // Register other plugins
    fastify.register(require('./routes/generate'), { prefix: '/api/generate' });
    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, '../public/images'),
        prefix: '/images/',
      });

    // Root route
    fastify.get('/', async (request, reply) => {
      reply.send({ status: 'Backend is live 🚀' });
    });

    await fastify.listen({ port: 3001 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
