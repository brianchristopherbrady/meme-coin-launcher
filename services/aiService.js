const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateMemeCoinDetails() {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a creative meme coin generator. Generate fun, catchy names and descriptions."
      }, {
        role: "user",
        content: "Generate a meme coin name, ticker (3-4 letters), and brief description."
      }]
    });

    const response = completion.choices[0].message.content;
    // Parse the response to extract name, ticker, and description
    // You'll want to structure the prompt to get consistent formatting
    return {
      name: "Example Coin", // Parse from response
      ticker: "EXC",
      description: "To the moon!" 
    };
  }

  async generateMemeImage(prompt) {
    const response = await this.openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = response.data[0].url;
    
    // Download and save image
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    const fileName = `meme-${Date.now()}.png`;
    const filePath = path.join(__dirname, '../public/images', fileName);
    
    await fs.writeFile(filePath, Buffer.from(buffer));
    
    return `/images/${fileName}`;
  }
}

module.exports = new AIService(); 