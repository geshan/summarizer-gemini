const { VertexAI } = require('@google-cloud/vertexai');

const vertex_ai = new VertexAI({ project: 'gemini-try-414805', location: 'us-central1' });
const model = 'gemini-pro';

const generativeModel = vertex_ai.preview.getGenerativeModel({
  model,
  generation_config: {
    "max_output_tokens": 2048,
    "temperature": 0.5,
    "top_p": 0.2,
    "top_k": 5
  },
  safety_settings: [
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_LOW_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_LOW_AND_ABOVE"
    }
  ],
});

async function getSummary(text) {
  const prompt = "As an expert writer with more than a decade of experience please summarize the following in under 125 words words. You are allowed to rephrase given the summary means the same as the original text:\n\n";

  const req = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${prompt}${text}`
          }
        ]
      }
    ],
  };

  const resp = await generativeModel.generateContent(req);
  const summary = resp.response?.candidates[0]?.content.parts[0].text;

  return summary;
};

module.exports = {
  getSummary
}
