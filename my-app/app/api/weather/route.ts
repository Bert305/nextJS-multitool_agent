// app/api/weather/route.ts
// -------------------------
// This API route fetches live weather data for a given location.
// It serves WeatherTool.tsx inside your AI multi-tool dashboard.
//
// Request:  GET /api/weather?location=Miami
// Response: { location: {}, current: {} }
//
// Data Source: Weatherstack API
// https://weatherstack.com/documentation
//
// NOTE: Only comments added. No logic changed.

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Handle GET requests to /api/weather
export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);

    // Get the location (default to New York if none provided)
    const location = searchParams.get('location') || 'New York';

    /**
     * Call the Weatherstack API.
     *
     * Required params:
     * - access_key → Your Weatherstack API key (from .env.local)
     * - query → City, ZIP, or full location name
     * - units → 'f' for Fahrenheit (US weather format)
     */
    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: process.env.WEATHERSTACK_API_KEY,
        query: location,
        units: 'f', // Fahrenheit for US display
      },
    });

    /**
     * Weatherstack returns an "error" field inside the data object
     * instead of using HTTP error codes.
     *
     * Example:
     * { success: false, error: { code: 615, info: "Something went wrong" } }
     */
    if (response.data.error) {
      return NextResponse.json(
        { error: response.data.error.info },
        { status: 400 }
      );
    }

    // Return the formatted weather data back to the frontend
    return NextResponse.json({
      location: response.data.location,  // Includes city, region, country, local time
      current: response.data.current,    // Contains temperature, humidity, wind, etc.
    });

  } catch (error) {
    // Log detailed error server-side for debugging
    console.error('Weather API error:', error);

    // Return generic error message to the client
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
