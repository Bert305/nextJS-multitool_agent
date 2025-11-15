import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location') || 'New York';

    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: process.env.WEATHERSTACK_API_KEY,
        query: location,
        units: 'f', // Fahrenheit for US
      },
    });

    if (response.data.error) {
      return NextResponse.json(
        { error: response.data.error.info },
        { status: 400 }
      );
    }

    return NextResponse.json({
      location: response.data.location,
      current: response.data.current,
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}