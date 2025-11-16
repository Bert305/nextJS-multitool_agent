// app/page.tsx
// -----------------------------
// This is the main homepage for the Multi-Tool AI Agent.
// It provides tab navigation between 3 tools:
//   - Research Tool   (Tavily search + AI summary)
//   - News Tool       (NewsAPI + AI summary)
//   - Weather Tool    (Weatherstack + AI summary)
//
// The page handles switching between tools but does NOT contain business logic.
// Each tool is its own self-contained component.

'use client';// Marks this as a client component (needed for useState)

import { useState } from 'react';
import ResearchTool from './components/ResearchTool';
import NewsTool from './components/NewsTool';
import WeatherTool from './components/WeatherTool';
import { Search, Newspaper, Cloud } from 'lucide-react';

// Union type that defines which tool is active
type Tool = 'research' | 'news' | 'weather';

export default function Home() {
  // Tracks which tool tab is currently selected
  const [activeTool, setActiveTool] = useState<Tool>('research');

  /**
   * Tool definitions for:
   * - rendering tab buttons
   * - rendering the correct component
   *
   * Contains:
   * - id       (tool name used internally)
   * - name     (label shown in UI)
   * - icon     (Lucide icon component)
   * - component (React component to render)
   */
  const tools = [
    { id: 'research', name: 'Research', icon: Search, component: ResearchTool },
    { id: 'news', name: 'News', icon: Newspaper, component: NewsTool },
    { id: 'weather', name: 'Weather', icon: Cloud, component: WeatherTool },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Main content wrapper */}
      <div className="container mx-auto px-4 py-8">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Multi-Tool Agent
        </h1>

        {/* ------------------------------ */}
        {/*       TAB NAVIGATION BAR       */}
        {/* ------------------------------ */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg flex">
            {tools.map((tool) => {
              const Icon = tool.icon; // dynamic icon component

              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as Tool)} // switch tools
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-200
                    ${
                      activeTool === tool.id
                        ? 'bg-blue-500 text-white shadow-md' // active tab style
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon size={20} />
                  {tool.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------ */}
        {/*      TOOL CONTENT RENDERER      */}
        {/* ------------------------------ */}
        <div className="max-w-4xl mx-auto">
          {tools.map((tool) => {
            const Component = tool.component;

            return (
              <div
                key={tool.id}
                // Only show the currently selected tool
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

