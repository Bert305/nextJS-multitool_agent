// ResearchTool.tsx
// ------------------
// This client-side component provides:
// - A search bar for entering any research topic
// - A call to /api/research (Tavily + AI agent search)
// - Rendering of research results + scores + URLs
// - An AI-generated summary using /api/ai-summary
//
// This is one of the 3 tools in the Multi-Tool Next.js AI Agent.

// Marks this component as a client component (required for useState/useEffect)
'use client';

import { useState } from 'react';
import { Search, ExternalLink, Loader2, Sparkles } from 'lucide-react';

// Represents a single research result item returned from the /api/research endpoint
interface SearchResult {
  title: string;
  url: string;
  content: string;
  score: number; // relevance score from Tavily or your search engine
}

// Represents the full research response from /api/research
interface ResearchResponse {
  answer: string;           // Quick plain-language answer from Tavily
  results: SearchResult[];  // List of top matching search results
}

export default function ResearchTool() {
  // The user’s search query (input text)
  const [query, setQuery] = useState('');

  // Whether the research request is currently loading
  const [loading, setLoading] = useState(false);

  // Response data from /api/research, or null before loading
  const [results, setResults] = useState<ResearchResponse | null>(null);

  // AI-generated summary text
  const [aiSummary, setAiSummary] = useState('');

  // Whether the summary request is loading
  const [summaryLoading, setSummaryLoading] = useState(false);

  /**
   * Handles form submission.
   * Sends the user's query to /api/research (POST).
   * Resets state and shows loading indicator while waiting.
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ignore empty queries
    if (!query.trim()) return;

    // Reset UI state before fetching
    setLoading(true);
    setResults(null);
    setAiSummary('');

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the user's query to the backend
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResults(data); // store research results
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false); // turn off loading spinner
    }
  };

  /**
   * Generate an AI summary of:
   * - the quick answer
   * - the top 5 research results
   *
   * Sends data to /api/ai-summary for OpenAI summarization.
   */
  const generateSummary = async () => {
    if (!results) return;

    setSummaryLoading(true);

    try {
      // Prepare the content that will be summarized
      const content = `Research Query: ${query}\n\nAnswer: ${results.answer}\n\nTop Results:\n${results.results
        .slice(0, 5)
        .map(r => `- ${r.title}: ${r.content}`)
        .join('\n')}`;

      // Call AI summary route
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send content with type="research" so the API knows how to format the summary
        body: JSON.stringify({ content, type: 'research' }),
      });

      const data = await response.json();
      setAiSummary(data.summary); // Save AI-generated summary text
    } catch (error) {
      console.error('Summary error:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Search className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Research Tool</h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          {/* Input box */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your research query..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Search button */}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {/* Loading spinner OR search icon */}
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            Search
          </button>
        </div>
      </form>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Quick Answer from the search API */}
          {results.answer && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Quick Answer
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{results.answer}</p>
            </div>
          )}

          {/* AI Summary trigger button */}
          <div className="flex justify-center">
            <button
              onClick={generateSummary}
              disabled={summaryLoading}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {summaryLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              Generate AI Summary
            </button>
          </div>

          {/* AI Summary Output */}
          {aiSummary && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                AI Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{aiSummary}</p>
            </div>
          )}

          {/* Research Results List */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Search Results ({results.results.length})
            </h3>

            <div className="space-y-4">
              {results.results.map((result, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Article Title */}
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {result.title}
                      </h4>

                      {/* Snippet of content */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-3">
                        {result.content}
                      </p>

                      {/* Relevance score */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                          Score: {result.score.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* External link to the actual article */}
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
                    >
                      <ExternalLink size={16} />
                      Visit
                    </a>
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
