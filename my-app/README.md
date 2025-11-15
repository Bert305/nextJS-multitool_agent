# Multi-Tool Full-Stack Agent

A powerful Next.js application that combines multiple AI-powered tools for research, news, and weather information. Built with TypeScript and modern React patterns.

## Features

### 🔍 Research Tool
- **Search Engine**: Powered by Tavily API for comprehensive web searches
- **Smart Results**: Get search results with relevance scores and direct links
- **AI Summary**: Generate intelligent summaries using OpenAI GPT

### 📰 News Tool
- **Live News**: Fetch the latest news using NewsAPI
- **Category Filter**: Browse news by category (Business, Technology, Health, etc.)
- **US Focus**: Specifically configured for United States news
- **AI Analysis**: Get AI-generated summaries of top news stories

### 🌤️ Weather Tool
- **US Cities**: Pre-loaded with major US cities for quick access
- **Custom Locations**: Search for any location in the US
- **Detailed Data**: Temperature, humidity, wind, pressure, UV index, and more
- **AI Recommendations**: Get weather insights and recommendations

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **APIs**: OpenAI, Tavily, NewsAPI, WeatherStack

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# WeatherStack API Key
WEATHERSTACK_API_KEY=your_weatherstack_api_key_here

# NewsAPI API Key
NEWSAPI_API_KEY=your_newsapi_api_key_here

# Tavily API Key
TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Get API Keys

#### OpenAI API Key
1. Go to [OpenAI API](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key to your `.env.local` file

#### WeatherStack API Key
1. Visit [WeatherStack](https://weatherstack.com/)
2. Sign up for a free account
3. Get your API access key from the dashboard
4. Copy the key to your `.env.local` file

#### NewsAPI Key
1. Go to [NewsAPI](https://newsapi.org/)
2. Register for a free account
3. Get your API key from the dashboard
4. Copy the key to your `.env.local` file

#### Tavily API Key
1. Visit [Tavily](https://tavily.com/)
2. Sign up for an account
3. Generate an API key
4. Copy the key to your `.env.local` file

### 4. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Usage Guide

### Research Tool
1. Enter your research query in the search box
2. View the quick answer and search results
3. Click "Generate AI Summary" for an intelligent analysis
4. Visit source links by clicking the "Visit" buttons

### News Tool
1. Select a news category from the dropdown
2. Browse the latest articles with images and descriptions
3. Click "Generate AI Summary" for a curated overview
4. Read full articles by clicking "Read More"

### Weather Tool
1. Select a US city from the dropdown or enter a custom location
2. View current weather conditions and detailed metrics
3. Click "Generate AI Summary" for weather insights and recommendations
4. Check temperature, humidity, wind, and other conditions

## API Endpoints

The application includes the following API routes:

- `/api/research` - Tavily search integration
- `/api/news` - NewsAPI integration  
- `/api/weather` - WeatherStack integration
- `/api/ai-summary` - OpenAI summary generation

## Project Structure

```
my-app/
├── app/
│   ├── api/                 # API routes
│   │   ├── research/        # Tavily search
│   │   ├── news/           # NewsAPI integration
│   │   ├── weather/        # WeatherStack integration
│   │   └── ai-summary/     # OpenAI integration
│   ├── components/          # React components
│   │   ├── ResearchTool.tsx
│   │   ├── NewsTool.tsx
│   │   └── WeatherTool.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── public/                 # Static assets
├── .env.local             # Environment variables
├── package.json           # Dependencies
└── README.md              # This file
```

## Features in Detail

### AI Integration
- **GPT-3.5 Turbo**: Used for generating summaries and insights
- **Context-Aware**: Different prompts for research, news, and weather
- **Token Optimization**: Limited to 500 tokens for concise responses

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Dark Mode**: Automatic dark/light theme support
- **Modern UI**: Clean, professional interface with smooth animations

### Error Handling
- **API Fallbacks**: Graceful handling of API failures
- **User Feedback**: Loading states and error messages
- **Input Validation**: Proper validation for user inputs

## Troubleshooting

### Common Issues

1. **API Keys Not Working**
   - Ensure all API keys are correctly added to `.env.local`
   - Check that the file is in the root directory (same level as `package.json`)
   - Restart the development server after adding keys

2. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run lint`

3. **API Rate Limits**
   - Most APIs have free tier limits
   - Consider upgrading API plans for production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
