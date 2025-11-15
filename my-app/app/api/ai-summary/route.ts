import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    let prompt = '';
    switch (type) {
      case 'research':
        prompt = `Summarize this research data and provide key insights:\n\n${content}`;
        break;
      case 'news':
        prompt = `Provide a brief summary of these news articles, highlighting the most important stories:\n\n${content}`;
        break;
      case 'weather':
        prompt = `Interpret this weather data and provide a user-friendly summary with recommendations:\n\n${content}`;
        break;
      default:
        prompt = `Analyze and summarize the following content:\n\n${content}`;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant that provides clear, concise summaries and insights.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI summary' },
      { status: 500 }
    );
  }
}