const aiService = require('../../services/aiService');
const walletService = require('../../services/walletService');

async function routes(fastify, options) {
  fastify.post('/generate', async (request, reply) => {
    try {
      // Generate meme coin details
      const coinDetails = await aiService.generateMemeCoinDetails();
      
      // Generate meme image
      const imagePrompt = `Create a fun meme coin logo for ${coinDetails.name}`;
      const imageUrl = await aiService.generateMemeImage(imagePrompt);
      
      // Create wallet
      const wallet = await walletService.createWallet();
      
      return {
        ...coinDetails,
        imageUrl,
        wallet: wallet.publicKey
      };
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to generate meme coin' });
    }
  });
}

module.exports = routes; 