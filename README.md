# Multi-Tool Agent 🤖

A powerful full-stack AI-powered agent built with Next.js and TypeScript that combines research, news, and weather capabilities into a single intuitive interface. This application leverages multiple APIs and OpenAI to provide comprehensive insights and summaries.

![Multi-Tool Agent](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 Research Tool
- **Advanced Search**: Powered by Tavily API for comprehensive web research
- **Search Results**: Get top 10 most relevant results with scores
- **Quick Answers**: Instant answers to your queries
- **AI Summaries**: OpenAI-generated insights and key takeaways
- **Source Links**: Direct access to original sources

### 📰 News Tool
- **Latest News**: Real-time news from NewsAPI
- **Category Filtering**: Browse by Business, Technology, Health, Sports, etc.
- **US-Focused**: Tailored for United States news coverage
- **Rich Media**: Article images and source attribution
- **AI Analysis**: Summarized news briefs with key highlights

### 🌤️ Weather Tool
- **US Weather Data**: Comprehensive weather information for US cities
- **Popular Cities**: Quick access to major US metropolitan areas
- **Custom Locations**: Search any US location
- **Detailed Metrics**: Temperature, humidity, wind, pressure, visibility, UV index
- **AI Recommendations**: Weather-based suggestions and insights
- **Real-time Data**: Current conditions with local time

### 🧠 AI Integration
- **OpenAI Summaries**: Intelligent analysis across all tools
- **Context-Aware**: Tool-specific prompts for better results
- **Actionable Insights**: Not just data, but recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- API keys (see setup section)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Bert305/nextJS-multitool_agent.git
cd nextJS-multitool_agent/my-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the `my-app` directory:
```env
OPENAI_API_KEY=your_openai_api_key
WEATHERSTACK_API_KEY=your_weatherstack_api_key
NEWSAPI_API_KEY=your_newsapi_api_key
TAVILY_API_KEY=your_tavily_api_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add to your `.env.local` file

### Tavily API Key (Research)
1. Go to [Tavily](https://tavily.com/)
2. Sign up for an account
3. Generate your API key
4. Add to your `.env.local` file

### NewsAPI Key
1. Visit [NewsAPI](https://newsapi.org/)
2. Register for a free account
3. Get your API key from the dashboard
4. Add to your `.env.local` file

### WeatherStack API Key
1. Go to [WeatherStack](https://weatherstack.com/)
2. Sign up for a free account
3. Copy your access key
4. Add to your `.env.local` file

## 🏗️ Project Structure

```
my-app/
├── app/
│   ├── api/                    # API Routes
│   │   ├── research/          # Tavily search integration
│   │   ├── news/              # NewsAPI integration
│   │   ├── weather/           # WeatherStack integration
│   │   └── ai-summary/        # OpenAI integration
│   ├── components/            # React Components
│   │   ├── ResearchTool.tsx   # Research interface
│   │   ├── NewsTool.tsx       # News interface
│   │   └── WeatherTool.tsx    # Weather interface
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main application
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## 🛠️ Technologies Used

- **Frontend**: Next.js 15+, React 19, TypeScript 5+
- **Styling**: Tailwind CSS 4, Lucide React Icons
- **APIs**: 
  - OpenAI GPT-3.5-turbo
  - Tavily Search API
  - NewsAPI
  - WeatherStack API
- **HTTP Client**: Axios
- **Development**: ESLint, PostCSS

## 🎯 Usage Examples

### Research Tool
1. Enter your research query (e.g., "artificial intelligence trends 2024")
2. View instant answers and search results
3. Click "Generate AI Summary" for insights
4. Follow source links for detailed information

### News Tool
1. Select a news category or use "General"
2. Browse latest articles with images
3. Generate AI summaries of top stories
4. Click "Read More" to view full articles

### Weather Tool
1. Select a US city from the dropdown or enter custom location
2. View current conditions and detailed metrics
3. Generate AI weather recommendations
4. Plan activities based on conditions

## 🔧 Configuration

### API Rate Limits
- **OpenAI**: Depends on your plan
- **NewsAPI**: 1000 requests/day (free tier)
- **WeatherStack**: 1000 requests/month (free tier)
- **Tavily**: Check your plan limits

### Customization
- Modify API endpoints in `/app/api/` directories
- Update UI components in `/app/components/`
- Adjust styling in `globals.css` and component files
- Configure OpenAI models in `/app/api/ai-summary/route.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **Railway**: Add environment variables and deploy
- **Docker**: Create Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for AI capabilities
- [Tavily](https://tavily.com/) for advanced search
- [NewsAPI](https://newsapi.org/) for news data
- [WeatherStack](https://weatherstack.com/) for weather information
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Bert305/nextJS-multitool_agent/issues) page
2. Create a new issue with detailed information
3. Provide error messages and steps to reproduce

## 🔄 Updates & Roadmap

### Current Version: 1.0.0
- ✅ Research functionality with Tavily
- ✅ News aggregation with NewsAPI  
- ✅ Weather data with WeatherStack
- ✅ AI summaries with OpenAI
- ✅ Responsive design

### Planned Features
- 🔄 Historical weather data
- 🔄 News sentiment analysis
- 🔄 Export functionality (PDF, CSV)
- 🔄 User preferences and favorites
- 🔄 Advanced search filters
- 🔄 Mobile app companion

---

**Built with ❤️ using Next.js and AI**