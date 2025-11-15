import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'general';
    const country = searchParams.get('country') || 'us';

    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        apiKey: process.env.NEWSAPI_API_KEY,
        category: category,
        country: country,
        pageSize: 20,
      },
    });

    return NextResponse.json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    });
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}