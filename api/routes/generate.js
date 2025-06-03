const aiService = require('../../services/aiService');

async function routes(fastify, options) {
  fastify.post('/', async (request, reply) => {
    try {
      console.log("POST /api/generate hit");

      // Generate brand identity
      const brandDetails = await aiService.generateBrandIdentity();

      // Generate logo image
      const imagePrompt = `Create a clean, modern logo for a brand called ${brandDetails.name}`;
      const imageUrl = await aiService.generateLogoImage(imagePrompt);

      return {
        ...brandDetails,
        imageUrl
      };
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to generate brand identity' });
    }
  });
}

module.exports = routes;
