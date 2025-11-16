// app/api/ai-summary/route.ts
// ---------------------------
// This API route takes some raw content (research results, news, or weather data)
// plus a `type`, and asks OpenAI to generate a concise, user-friendly summary.
//
// It is used by:
// - ResearchTool.tsx  → type: 'research'
// - NewsTool.tsx      → type: 'news'
// - WeatherTool.tsx   → type: 'weather'
//
// Request:  POST /api/ai-summary
// Body:     { content: string, type?: 'research' | 'news' | 'weather' | string }
// Response: { summary: string } on success

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client using API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Handle POST requests to /api/ai-summary
export async function POST(req: NextRequest) {
  try {
    // Extract content and type from the JSON request body
    const { content, type } = await req.json();

    // Basic validation: content is required for summarization
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Build a prompt that is tailored to the provided `type`
    let prompt = '';
    switch (type) {
      case 'research':
        // Summarize research results and highlight key insights
        prompt = `Summarize this research data and provide key insights:\n\n${content}`;
        break;
      case 'news':
        // Summarize multiple news articles, focusing on the most important stories
        prompt = `Provide a brief summary of these news articles, highlighting the most important stories:\n\n${content}`;
        break;
      case 'weather':
        // Turn raw weather metrics into a friendly explanation + recommendations
        prompt = `Interpret this weather data and provide a user-friendly summary with recommendations:\n\n${content}`;
        break;
      default:
        // Fallback for any other content type
        prompt = `Analyze and summarize the following content:\n\n${content}`;
    }

    // Call OpenAI Chat Completions API to generate a summary
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Model used for summarization
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI assistant that provides clear, concise summaries and insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,   // Limit length of the summary
      temperature: 0.7,  // Slight creativity while staying on-topic
    });

    // Return the summary text back to the client
    return NextResponse.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    // Log any errors for server-side debugging
    console.error('OpenAI API error:', error);

    // Send a generic error message to the client
    return NextResponse.json(
      { error: 'Failed to generate AI summary' },
      { status: 500 }
    );
  }
}
