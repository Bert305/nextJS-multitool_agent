'use client';

import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Calendar, Sparkles, Loader2 } from 'lucide-react';

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

interface NewsResponse {
  articles: Article[];
  totalResults: number;
}

export default function NewsTool() {
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');
  const [aiSummary, setAiSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  const fetchNews = async (selectedCategory: string) => {
    setLoading(true);
    setNews(null);
    setAiSummary('');

    try {
      const response = await fetch(`/api/news?category=${selectedCategory}&country=us`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('News fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const generateSummary = async () => {
    if (!news) return;

    setSummaryLoading(true);
    try {
      const content = `Top News Articles (${category} category):\n\n${news.articles.slice(0, 10).map(article => `- ${article.title}: ${article.description}`).join('\n')}`;
      
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, type: 'news' }),
      });

      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Summary error:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="text-green-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">News Tool</h2>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-green-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading news...</span>
        </div>
      )}

      {news && !loading && (
        <div className="space-y-6">
          {/* News Stats */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-200">
              Found {news.totalResults} articles in {category} category
            </p>
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

          {/* Articles */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Latest Articles
            </h3>
            <div className="space-y-4">
              {news.articles
                .filter(article => article.title !== '[Removed]')
                .map((article, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {article.urlToImage && (
                      <div className="flex-shrink-0">
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-24 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {article.source.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.publishedAt)}
                          </div>
                        </div>
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