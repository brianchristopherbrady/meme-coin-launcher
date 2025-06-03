require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const path = require('path');

// Register routes
fastify.register(require('./routes/generate'));
fastify.register(require('./routes/wallet'));

// Serve static files for generated images
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../public/images'),
  prefix: '/images/'
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 