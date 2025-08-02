# Contributing to Coffee Review App

Thank you for your interest in contributing to the Coffee Review App! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/coffee-review-app.git
   cd coffee-review-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### File Structure
```
src/
├── components/     # React components
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx        # Main app component
├── main.tsx       # App entry point
└── index.css      # Global styles
```

### Component Guidelines
- Use functional components with hooks
- Keep components focused on a single responsibility
- Use TypeScript interfaces for props
- Export components as default exports
- Use meaningful component names

### Styling
- Use CSS classes for styling
- Follow the existing color scheme and design patterns
- Make components responsive
- Use consistent spacing and typography

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Step-by-step instructions
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable

## 💡 Feature Requests

When suggesting features:

1. **Description**: Clear description of the feature
2. **Use case**: Why this feature would be useful
3. **Implementation ideas**: How it could be implemented
4. **Mockups**: If applicable

## 🔧 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots if UI changes

### Commit Message Format
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions and components
- Document complex algorithms
- Include usage examples

### README Updates
- Update README.md for new features
- Add installation instructions for new dependencies
- Update usage examples

## 🎨 Design Guidelines

### Color Scheme
- Primary: #8B4513 (Coffee Brown)
- Secondary: #A0522D (Saddle Brown)
- Background: Gradient from #667eea to #764ba2
- Text: #333 (Dark Gray)
- Accent: #FFD700 (Gold for stars)

### Typography
- Font Family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
- Headings: Bold, coffee brown color
- Body: Regular weight, dark gray

### Components
- Use consistent border radius (8px, 10px, 15px, 20px)
- Maintain consistent spacing
- Use subtle shadows for depth
- Implement smooth transitions

## 🤝 Community Guidelines

### Be Respectful
- Be kind and respectful to other contributors
- Provide constructive feedback
- Help newcomers feel welcome

### Communication
- Use clear, concise language
- Ask questions when needed
- Share knowledge and help others

### Code of Conduct
- Follow the project's code of conduct
- Report any violations
- Maintain a positive environment

## 📋 Issue Templates

### Bug Report Template
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 12.0]
- Node.js: [e.g., 16.0.0]

## Additional Information
[Screenshots, logs, etc.]
```

### Feature Request Template
```markdown
## Feature Description
[Clear description of the feature]

## Use Case
[Why this feature would be useful]

## Implementation Ideas
[How it could be implemented]

## Additional Information
[Mockups, examples, etc.]
```

## 🏷️ Labels

We use the following labels for issues and PRs:
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## 📞 Getting Help

If you need help:
1. Check the existing issues and documentation
2. Ask questions in issues or discussions
3. Join our community channels (if available)

Thank you for contributing to the Coffee Review App! ☕✨ 