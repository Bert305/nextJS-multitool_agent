# Contributing to Multi-Tool Agent

Thank you for considering contributing to Multi-Tool Agent! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/nextJS-multitool_agent.git
   cd nextJS-multitool_agent/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Add your API keys (see README for details)

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Code Style

### TypeScript Guidelines
- Use TypeScript for all new files
- Define proper interfaces for API responses
- Use meaningful variable and function names
- Add proper type annotations

### React Best Practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Use proper key props for lists

### CSS/Styling
- Use Tailwind CSS utilities
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic class names when needed

## 🔧 Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code improvements

### Commit Messages
Use conventional commits format:
```
type(scope): description

Examples:
feat(research): add advanced search filters
fix(weather): handle API timeout errors
docs(readme): update installation instructions
```

## 🧪 Testing

### Before Submitting
1. Test all three tools (Research, News, Weather)
2. Verify AI summary generation works
3. Check responsive design on mobile
4. Ensure no TypeScript errors
5. Test with different API responses

### Manual Testing Checklist
- [ ] Research tool returns results and generates summaries
- [ ] News tool loads articles for different categories
- [ ] Weather tool shows data for various US cities
- [ ] All external links work correctly
- [ ] Loading states appear appropriately
- [ ] Error handling works for API failures

## 📋 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow code style guidelines
   - Add appropriate comments
   - Update documentation if needed

3. **Test thoroughly**
   - Test all functionality
   - Check for console errors
   - Verify responsive design

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use descriptive title and description
   - Link any related issues
   - Add screenshots if UI changes
   - Request review from maintainers

## 🐛 Reporting Bugs

When reporting bugs, please include:

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11, macOS 13]
- Browser: [e.g. Chrome 119, Safari 17]
- Node.js version: [e.g. 18.17.0]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, mockups, or screenshots.
```

## 🏗️ Architecture Guidelines

### API Routes Structure
```
app/api/
├── research/route.ts    # Tavily integration
├── news/route.ts        # NewsAPI integration  
├── weather/route.ts     # WeatherStack integration
└── ai-summary/route.ts  # OpenAI integration
```

### Component Structure
```
app/components/
├── ResearchTool.tsx     # Research interface
├── NewsTool.tsx         # News interface
└── WeatherTool.tsx      # Weather interface
```

### Adding New Tools
1. Create API route in `app/api/[tool-name]/route.ts`
2. Create component in `app/components/[ToolName].tsx`
3. Add to main navigation in `app/page.tsx`
4. Update documentation

## 🔐 Security Guidelines

### API Key Handling
- Never commit API keys to the repository
- Use environment variables for all secrets
- Validate API responses before processing
- Implement proper error handling

### Input Validation
- Sanitize user inputs
- Validate API parameters
- Handle edge cases gracefully
- Implement rate limiting where appropriate

## 📚 Resources

### Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### API Documentation
- [OpenAI API](https://platform.openai.com/docs)
- [Tavily API](https://docs.tavily.com/)
- [NewsAPI](https://newsapi.org/docs)
- [WeatherStack API](https://weatherstack.com/documentation)

## ❓ Questions?

If you have questions about contributing:
1. Check existing [Issues](https://github.com/Bert305/nextJS-multitool_agent/issues)
2. Create a new issue with the "question" label
3. Join our community discussions

Thank you for contributing! 🎉