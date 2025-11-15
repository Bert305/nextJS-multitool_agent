'use client';

import { useState } from 'react';
import { Search, ExternalLink, Loader2, Sparkles } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface ResearchResponse {
  answer: string;
  results: SearchResult[];
}

export default function ResearchTool() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResearchResponse | null>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResults(null);
    setAiSummary('');

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async () => {
    if (!results) return;

    setSummaryLoading(true);
    try {
      const content = `Research Query: ${query}\n\nAnswer: ${results.answer}\n\nTop Results:\n${results.results.slice(0, 5).map(r => `- ${r.title}: ${r.content}`).join('\n')}`;
      
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, type: 'research' }),
      });

      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Summary error:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Search className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Research Tool</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your research query..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            Search
          </button>
        </div>
      </form>

      {results && (
        <div className="space-y-6">
          {/* Quick Answer */}
          {results.answer && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Quick Answer</h3>
              <p className="text-gray-700 dark:text-gray-300">{results.answer}</p>
            </div>
          )}

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

          {/* AI Summary */}
          {aiSummary && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                AI Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{aiSummary}</p>
            </div>
          )}

          {/* Search Results */}
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
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {result.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-3">
                        {result.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                          Score: {result.score.toFixed(2)}
                        </span>
                      </div>
                    </div>
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