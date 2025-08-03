# Contributing to BrewLog

Thank you for your interest in contributing to BrewLog! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Provide detailed steps to reproduce the bug
- Include your browser/OS information
- Add screenshots if applicable

### Suggesting Features
- Use the GitHub issue tracker
- Describe the feature in detail
- Explain why this feature would be useful
- Consider the impact on existing functionality

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development
1. Fork and clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Start the development servers:
   ```bash
   ./start-servers.sh
   ```
4. Make your changes
5. Test your changes thoroughly

## 📝 Code Style Guidelines

### JavaScript/TypeScript
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code style
- Use TypeScript for type safety

### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Use proper prop types
- Follow the existing component structure

### CSS/Styling
- Use Tailwind CSS classes
- Follow the existing design patterns
- Ensure responsive design
- Maintain accessibility standards

## 🧪 Testing

### Backend Testing
- Test all API endpoints
- Verify error handling
- Check data validation

### Frontend Testing
- Test all user interactions
- Verify responsive design
- Check accessibility
- Test on different browsers

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors
- [ ] Responsive design works
- [ ] Accessibility standards met

### Pull Request Template
- **Description**: What does this PR do?
- **Type of Change**: Bug fix, feature, documentation, etc.
- **Testing**: How was this tested?
- **Screenshots**: If applicable

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## 📞 Getting Help

- Check existing issues and discussions
- Join our community discussions
- Reach out to maintainers

## 📄 License

By contributing to BrewLog, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to BrewLog! 🎉 