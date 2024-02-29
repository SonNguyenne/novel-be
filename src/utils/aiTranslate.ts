import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const aiTranslate = async (body: string, type?: string) => {
  const prompt = `Dịch đoạn tiếng Trung này từ truyện sang tiếng Việt: ${body}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
};
