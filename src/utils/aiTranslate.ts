import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiTranslate = async (body?: string, genre?: string) => {
  const content: string = `Translate from a Chinese novel to Vietnamese. ${
    genre && `The novel falls into the ${genre} genre.`
  } The text is: ${body}. The translation should be in a natural and expressive style.`;

  const data = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-3.5-turbo-0125',
  });

  return data['choices'][0]['message']['content'];
};
