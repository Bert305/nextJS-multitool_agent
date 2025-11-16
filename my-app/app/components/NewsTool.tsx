// NewsTool.tsx
// -------------
// Client-side React component for the Next.js + TypeScript AI Agent.
// It:
// - Fetches US news by category from /api/news
// - Lets the user choose a category (business, sports, tech, etc.)
// - Calls /api/ai-summary to generate an AI summary of the top articles
// - Renders a list of articles with images, dates, sources, and links

'use client';

import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Calendar, Sparkles, Loader2 } from 'lucide-react';

// Shape of a single news article returned from the /api/news endpoint
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

// Shape of the full response from the /api/news endpoint
interface NewsResponse {
  articles: Article[];
  totalResults: number;
}

// Main React component for the News Tool
export default function NewsTool() {
  // Holds the news response (articles + total count).
  // Starts as null until we fetch data.
  const [news, setNews] = useState<NewsResponse | null>(null);

  // Loading state for when we are fetching news from /api/news
  const [loading, setLoading] = useState(false);

  // Currently selected news category (e.g., "general", "business", etc.)
  const [category, setCategory] = useState('general');

  // Text of the AI-generated summary for the current list of articles
  const [aiSummary, setAiSummary] = useState('');

  // Loading state while the AI summary is being generated from /api/ai-summary
  const [summaryLoading, setSummaryLoading] = useState(false);

  // List of categories the user can select from the dropdown
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  /**
   * Fetches news for a given category from the backend API.
   * - Resets existing news and AI summary
   * - Shows a loading spinner while the request is in progress
   */
  const fetchNews = async (selectedCategory: string) => {
    setLoading(true);      // start loading state
    setNews(null);         // clear previous news
    setAiSummary('');      // clear previous summary

    try {
      // Call your Next.js API route, passing category and country (US)
      const response = await fetch(`/api/news?category=${selectedCategory}&country=us`);
      const data = await response.json();

      // Save the fetched news in state
      setNews(data);
    } catch (error) {
      // Log any errors to the console for debugging
      console.error('News fetch error:', error);
    } finally {
      // Always stop loading indicator, success or failure
      setLoading(false);
    }
  };

  /**
   * useEffect hook:
   * - Runs on initial mount and whenever `category` changes
   * - Automatically fetches news for the selected category
   */
  useEffect(() => {
    fetchNews(category);
  }, [category]);

  /**
   * Calls the AI summary API with the top news articles.
   * - Builds a text representation of the top 10 articles
   * - Sends that text to /api/ai-summary with type 'news'
   * - Saves the returned AI summary into state
   */
  const generateSummary = async () => {
    // If there is no news yet, do nothing
    if (!news) return;

    setSummaryLoading(true); // Show loading state for the summary

    try {
      // Create a simple text payload with top article titles + descriptions
      const content = `Top News Articles (${category} category):\n\n${news.articles
        .slice(0, 10) // take only the first 10 articles
        .map(article => `- ${article.title}: ${article.description}`)
        .join('\n')}`;

      // Call your AI summary API route
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The backend will use `content` and `type` to decide how to summarize
        body: JSON.stringify({ content, type: 'news' }),
      });

      const data = await response.json();

      // Save the AI-generated summary text into state
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Summary error:', error);
    } finally {
      setSummaryLoading(false); // Turn off loading spinner
    }
  };

  /**
   * Helper function to format the article publish date into:
   * "MMM DD, YYYY, HH:MM" (e.g. "Nov 16, 2025, 03:30")
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Component render: UI layout and display logic
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="text-green-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">News Tool</h2>
      </div>

      {/* Category dropdown selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Update selected category
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {/* Render each category as an option */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading spinner while fetching news */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-green-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading news...</span>
        </div>
      )}

      {/* Main content: shown only when we have news and not loading */}
      {news && !loading && (
        <div className="space-y-6">
          {/* Small info box with number of results */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-200">
              Found {news.totalResults} articles in {category} category
            </p>
          </div>

          {/* Button to generate AI summary of the latest articles */}
          <div className="flex justify-center">
            <button
              onClick={generateSummary}
              disabled={summaryLoading}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {/* Show spinner while summary is generating, otherwise sparkles icon */}
              {summaryLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              Generate AI Summary
            </button>
          </div>

          {/* Render AI summary if we have one */}
          {aiSummary && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                AI Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {aiSummary}
              </p>
            </div>
          )}

          {/* List of latest articles */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Latest Articles
            </h3>

            <div className="space-y-4">
              {news.articles
                // Filter out placeholder articles some APIs return as "[Removed]"
                .filter(article => article.title !== '[Removed]')
                .map((article, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail image if provided */}
                      {article.urlToImage && (
                        <div className="flex-shrink-0">
                          <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-24 h-24 object-cover rounded-lg"
                            // If the image fails to load, hide the image element
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Article text content */}
                      <div className="flex-1">
                        {/* Article title */}
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          {article.title}
                        </h4>

                        {/* Short description text, truncated to two lines */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                          {article.description}
                        </p>

                        {/* Footer: source name, date, and external link */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            {/* Source badge */}
                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {article.source.name}
                            </span>

                            {/* Published date with calendar icon */}
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(article.publishedAt)}
                            </div>
                          </div>

                          {/* "Read More" link to the original article */}
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-green-500 hover:text-green-600 text-sm"
                          >
                            <ExternalLink size={16} />
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
