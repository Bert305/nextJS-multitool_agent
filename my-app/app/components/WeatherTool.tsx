// WeatherTool.tsx
// ------------------
// Client-side component for fetching and displaying weather data
// from your /api/weather endpoint (Weatherstack API wrapper).
//
// Features:
// - Popular US cities dropdown
// - Custom location input
// - Fetches live weather data (temperature, humidity, UV index, etc.)
// - AI-generated weather summary & recommendations
// - Weather icons based on conditions
//
// NOTE: No logic or behavior has been changed — comments only.

'use client';

import { useState, useEffect } from 'react';
import { Cloud, MapPin, Thermometer, Wind, Eye, Droplets, Sparkles, Loader2 } from 'lucide-react';

// Types describing Weatherstack API response shape
interface WeatherLocation {
  name: string;
  country: string;
  region: string;
  localtime: string;
}

interface WeatherCurrent {
  temperature: number;
  weather_descriptions: string[];
  weather_icons: string[];
  wind_speed: number;
  wind_dir: string;
  pressure: number;
  humidity: number;
  visibility: number;
  uv_index: number;
  feelslike: number;
}

interface WeatherResponse {
  location: WeatherLocation;
  current: WeatherCurrent;
}

export default function WeatherTool() {
  // State: holds the current weather data
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  // Loading indicator (weather fetch)
  const [loading, setLoading] = useState(false);

  // Currently selected location
  const [location, setLocation] = useState('New York');

  // AI summary text
  const [aiSummary, setAiSummary] = useState('');

  // Loading state for AI summary
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Predefined list of popular US cities for quick selection
  const popularUSCities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
    'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington DC',
    'Boston', 'Nashville', 'Las Vegas', 'Portland', 'Miami'
  ];

  /**
   * Fetch weather data from your /api/weather route.
   * Resets previous data + shows spinner while loading.
   */
  const fetchWeather = async (selectedLocation: string) => {
    setLoading(true);
    setWeather(null);
    setAiSummary('');

    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(selectedLocation)}`);
      const data = await response.json();

      // Only update state if backend responded successfully
      if (response.ok) {
        setWeather(data);
      } else {
        console.error('Weather API error:', data.error);
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * On mount, fetch weather for default location.
   */
  useEffect(() => {
    fetchWeather(location);
  }, []);

  /**
   * Called when the user selects a new location or enters a custom one.
   * Triggers a new weather fetch.
   */
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    fetchWeather(newLocation);
  };

  /**
   * Generates an AI summary of the weather conditions.
   * Calls /api/ai-summary with the weather content block.
   */
  const generateSummary = async () => {
    if (!weather) return;

    setSummaryLoading(true);

    try {
      // Build a text summary that the AI can rewrite nicely.
      const content = `Weather for ${weather.location.name}, ${weather.location.region}:
Temperature: ${weather.current.temperature}°F (feels like ${weather.current.feelslike}°F)
Conditions: ${weather.current.weather_descriptions.join(', ')}
Humidity: ${weather.current.humidity}%
Wind: ${weather.current.wind_speed} mph ${weather.current.wind_dir}
Pressure: ${weather.current.pressure} mb
Visibility: ${weather.current.visibility} km
UV Index: ${weather.current.uv_index}
Local Time: ${weather.location.localtime}`;

      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: 'weather' }),
      });

      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Summary error:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  /**
   * Returns an emoji weather icon based on the description.
   * Used for a simple visual representation (sunny, cloudy, rain, etc.).
   */
  const getWeatherIcon = (descriptions: string[]) => {
    const description = descriptions[0]?.toLowerCase() || '';

    if (description.includes('sunny') || description.includes('clear')) return '☀️';
    if (description.includes('cloud') || description.includes('overcast')) return '☁️';
    if (description.includes('rain') || description.includes('drizzle')) return '🌧️';
    if (description.includes('snow')) return '❄️';
    if (description.includes('thunder') || description.includes('storm')) return '⛈️';
    if (description.includes('fog') || description.includes('mist')) return '🌫️';

    return '🌤️';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Cloud className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Weather Tool</h2>
      </div>

      {/* Location Selection Dropdown + Custom Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>

        <div className="flex gap-2">
          {/* Dropdown list of popular US cities */}
          <select
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {popularUSCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Custom text input for any other location */}
          <input
            type="text"
            placeholder="Or enter custom location"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                if (value.trim()) handleLocationChange(value.trim());
              }
            }}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading weather...</span>
        </div>
      )}

      {/* Render weather only when loaded */}
      {weather && !loading && (
        <div className="space-y-6">
          
          {/* Main Weather Card */}
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.location.name}, {weather.location.region}, {weather.location.country}
              </h3>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-6xl">
                {getWeatherIcon(weather.current.weather_descriptions)}
              </div>

              <div>
                {/* Temperature */}
                <div className="text-4xl font-bold text-gray-800 dark:text-white">
                  {weather.current.temperature}°F
                </div>

                {/* Feels like */}
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Feels like {weather.current.feelslike}°F
                </div>

                {/* Visible description */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {weather.current.weather_descriptions.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary Button */}
          <div className="flex justify-center">
            <button
              onClick={generateSummary}
              disabled={summaryLoading}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {summaryLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              Generate AI Summary
            </button>
          </div>

          {/* AI Summary Output */}
          {aiSummary && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                AI Summary & Recommendations
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{aiSummary}</p>
            </div>
          )}

          {/* Detailed Weather Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Temperature */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="text-red-500" size={20} />
                <span className="font-medium text-gray-700 dark:text-gray-300">Temperature</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.current.temperature}°F
              </p>
            </div>

            {/* Humidity */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="text-blue-500" size={20} />
                <span className="font-medium text-gray-700 dark:text-gray-300">Humidity</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.current.humidity}%
              </p>
            </div>

            {/* Wind */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="text-green-500" size={20} />
                <span className="font-medium text-gray-700 dark:text-gray-300">Wind</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.current.wind_speed} mph {weather.current.wind_dir}
              </p>
            </div>

            {/* Visibility */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="text-purple-500" size={20} />
                <span className="font-medium text-gray-700 dark:text-gray-300">Visibility</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.current.visibility} km
              </p>
            </div>

            {/* UV Index */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-orange-500 text-xl">☀️</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">UV Index</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.current.uv_index}
              </p>
            </div>

            {/* Pressure */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 text-xl">🌡️</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">Pressure</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {weather.current.pressure} mb
              </p>
            </div>

          </div>

          {/* Local Time */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Local Time: {weather.location.localtime}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
