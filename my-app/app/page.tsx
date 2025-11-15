'use client';

import { useState } from 'react';
import ResearchTool from './components/ResearchTool';
import NewsTool from './components/NewsTool';
import WeatherTool from './components/WeatherTool';
import { Search, Newspaper, Cloud } from 'lucide-react';

type Tool = 'research' | 'news' | 'weather';

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('research');

  const tools = [
    { id: 'research', name: 'Research', icon: Search, component: ResearchTool },
    { id: 'news', name: 'News', icon: Newspaper, component: NewsTool },
    { id: 'weather', name: 'Weather', icon: Cloud, component: WeatherTool },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Multi-Tool Agent
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as Tool)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-200 ${
                    activeTool === tool.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  {tool.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tool Content */}
        <div className="max-w-4xl mx-auto">
          {tools.map((tool) => {
            const Component = tool.component;
            return (
              <div
                key={tool.id}
                className={activeTool === tool.id ? 'block' : 'hidden'}
              >
                <Component />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
