const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

class AIService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateBrandIdentity() {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-turbo",
      tool_choice: "required",
      messages: [
        {
          role: "user",
          content: "Generate a brand identity for a dropshipping store focused on eco-friendly travel accessories."
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "generate_brand",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string" },
                tagline: { type: "string" },
                aboutUs: { type: "string" },
                seoTags: { type: "array", items: { type: "string" } },
                font: { type: "string" },
                colorPalette: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of hex codes like [\"#A8D5BA\", \"#81B29A\", \"#3D5A80\", \"#EE6C4D\", \"#293241\"]"
                }
              },
              required: ["name", "tagline", "font", "colorPalette"]
            }
          }
        }
      ]
    });

    const toolCall = response.choices[0].message.tool_calls[0];
    const brandData = JSON.parse(toolCall.function.arguments);
    return brandData;
  }

  async generateLogoImage(prompt) {
    const response = await this.openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = response.data[0].url;
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();

    const fileName = `brand-logo-${Date.now()}.png`;
    const imagesDir = path.join(__dirname, '../public/images');
    await fs.mkdir(imagesDir, { recursive: true });

    const filePath = path.join(imagesDir, fileName);
    await fs.writeFile(filePath, Buffer.from(buffer));

    return `/images/${fileName}`;
  }
}

module.exports = new AIService();
