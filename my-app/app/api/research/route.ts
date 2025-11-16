// app/api/research/route.ts
// --------------------------
// This API route sends a research query to the Tavily Search API.
// It powers the ResearchTool.tsx component.
//
// Request:  POST /api/research
// Body:     { query: "your topic" }
// Response: { answer: string, results: [] }
//
// Tavily API Docs:
// https://docs.tavily.com/api-reference/search


import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Handles POST requests to /api/research
export async function POST(req: NextRequest) {
  try {
    // Extract "query" from the JSON body
    const { query } = await req.json();

    // Validate required field
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    /**
     * Send research request to Tavily Search API
     *
     * Parameters:
     * - api_key → from .env.local (TAVILY_API_KEY)
     * - query → user search topic
     * - search_depth → deep search for higher-quality responses
     * - include_answer → Tavily’s “instant answer” field
     * - include_raw_content → OFF (keeps results clean)
     * - max_results → limit number of returned pages
     */
    const response = await axios.post('https://api.tavily.com/search', {
      api_key: process.env.TAVILY_API_KEY,
      query: query,
      search_depth: 'advanced',
      include_answer: true,
      include_raw_content: false,
      max_results: 10,
    });

    // Return Tavily's structured results
    return NextResponse.json({
      answer: response.data.answer,     // AI-powered short answer to the query
      results: response.data.results,   // List of search results (title, url, summary, score)
    });

  } catch (error) {
    // Log full error on the server for debugging
    console.error('Search error:', error);

    // Respond with a user-friendly error
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
