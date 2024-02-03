import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiTranslate = async (body: string, type?: string) => {
  const content: string = `${
    type !== 'content' ? 'Trả lời ngắn gọn cho' : ''
  } Kết quả của dịch ${
    type == 'author' ? `tên tác giả` : `đoạn văn bản`
  } dưới đây sang tiếng Việt một cách tự nhiên nhất: ${body}.`;

  const data = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  const result: string = data['choices'][0]['message']['content'];
  var matches = result.match(/"([^"]+)"/g);

  if (matches) {
    return matches[1].replace(/"/g, '');
  } else {
    return result;
  }
};
