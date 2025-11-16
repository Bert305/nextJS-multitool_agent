// app/api/news/route.ts
// ----------------------
// This API route fetches news headlines from NewsAPI.org.
// It is used by the NewsTool.tsx component.
//
// Request:  GET /api/news?category=business&country=us
// Response: { articles: [...], totalResults: number }
//
// Data Source:
// https://newsapi.org/v2/top-headlines

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Handle GET requests to /api/news
export async function GET(req: NextRequest) {
  try {
    // Extract query params from the URL
    const { searchParams } = new URL(req.url);

    // Category of news (default: "general")
    const category = searchParams.get('category') || 'general';

    // Country filter (default: "us")
    const country = searchParams.get('country') || 'us';

    /**
     * Call the NewsAPI.org Top Headlines endpoint
     *
     * Required params:
     * - apiKey   → Your NewsAPI API key stored in .env.local
     * - country  → Country code ("us")
     * - category → News category (business, sports, tech, etc.)
     *
     * pageSize: Limits the number of articles returned (20 here).
     */
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        apiKey: process.env.NEWSAPI_API_KEY,
        category: category,
        country: country,
        pageSize: 20,
      },
    });

    // Return articles back to the frontend
    return NextResponse.json({
      articles: response.data.articles,       // Array of article objects
      totalResults: response.data.totalResults, // Total matching results
    });

  } catch (error) {
    // Log server-side error for debugging
    console.error('News API error:', error);

    // Return generic error message to the client
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
