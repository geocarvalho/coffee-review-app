# ☕ Coffee Review App

[![CI](https://github.com/your-username/coffee-review-app/workflows/CI/badge.svg)](https://github.com/your-username/coffee-review-app/actions)
[![Deploy](https://github.com/your-username/coffee-review-app/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/your-username/coffee-review-app/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A beautiful and intuitive web application for tracking and rating your coffee experiences. Built with React, TypeScript, and modern web technologies.

🌐 **Live Demo**: [https://your-username.github.io/coffee-review-app](https://your-username.github.io/coffee-review-app)

## Features

### 📝 Review Management
- **Comprehensive Coffee Tracking**: Record bean name, origin, roaster, roast level, and brewing method
- **Star Rating System**: Rate aroma, acidity, body, sweetness, aftertaste, and balance with intuitive star ratings (⭐ to ⭐⭐⭐⭐⭐)
- **General Score**: Automatic calculation of the mean score from all individual ratings
- **Photo Support**: Add photos to your reviews for visual reference
- **Rich Comments**: Write detailed notes about your coffee experience

### 🔍 Search & Filter
- **Smart Search**: Search across bean names, roasters, and origins
- **Advanced Filtering**: Filter by roaster and origin
- **Multiple Sort Options**: Sort by date, bean name, or average rating
- **Flexible Sorting**: Ascending or descending order

### 📊 Statistics Dashboard
- **Review Analytics**: Track total reviews, unique roasters, and origins
- **Average Ratings**: See your average scores across all rating categories
- **Top Roasters**: Discover your most-reviewed roasters
- **Visual Insights**: Color-coded ratings for quick assessment

### 💾 Data Persistence
- **Local Storage**: All data is saved locally in your browser
- **No Account Required**: Start using immediately without registration
- **Data Export**: Easy to backup and restore your reviews

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
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
   Navigate to `http://localhost:5173` to start using the app

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Usage Guide

### Adding a New Review

1. Click the **"Add New Review"** button
2. Fill in the required fields:
   - **Bean Name**: The name of the coffee bean
   - **Origin**: Country or region where the coffee is from
   - **Roaster**: The company that roasted the coffee
3. Select the **Roast Level** and **Brewing Method**
4. Rate each category with stars (⭐ to ⭐⭐⭐⭐⭐):
   - **Aroma**: The smell of the coffee
   - **Acidity**: The brightness and liveliness
   - **Body**: The weight and texture in your mouth
   - **Sweetness**: The natural sweetness
   - **Aftertaste**: The lingering flavors
   - **Balance**: How well all elements work together
5. View the **General Score** (automatically calculated mean of all ratings)
6. Add your overall comments
7. Optionally upload a photo
8. Click **"Save Review"**

### Managing Your Reviews

- **Edit**: Click the edit icon on any review card
- **Delete**: Click the trash icon (with confirmation)
- **Search**: Use the search bar to find specific reviews
- **Filter**: Use dropdown menus to filter by roaster or origin
- **Sort**: Choose how to sort your reviews

### Viewing Statistics

- Click **"Show Stats"** to see your coffee analytics
- View your average ratings across all categories
- See your general score averages
- Discover your most-reviewed roasters
- Track your coffee journey progress

## Data Structure

Each coffee review includes:

```typescript
interface CoffeeReview {
  id: string;
  beanName: string;
  origin: string;
  roaster: string;
  roastLevel: string;
  brewingMethod: string;
  aroma: number;        // 1-5 stars
  acidity: number;      // 1-5 stars
  body: number;         // 1-5 stars
  sweetness: number;    // 1-5 stars
  aftertaste: number;   // 1-5 stars
  balance: number;      // 1-5 stars
  generalScore?: number; // Auto-calculated mean of all ratings
  overallComment: string;
  imageUrl?: string;
  createdAt: string;
}
```

## Supported Brewing Methods

- V60
- AeroPress
- Espresso
- French Press
- Chemex
- Kalita Wave
- Moka Pot
- Pour Over
- Cold Brew
- Other

## Roast Levels

- Light
- Medium-Light
- Medium
- Medium-Dark
- Dark

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design patterns
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Local Storage API

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/your-username/coffee-review-app/issues/new?template=bug_report.md) and we'll fix it!

### 💡 Feature Requests

Have an idea for a new feature? [Let us know](https://github.com/your-username/coffee-review-app/issues/new?template=feature_request.md)!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://github.com/your-username/coffee-review-app#readme)
- 🐛 [Bug Reports](https://github.com/your-username/coffee-review-app/issues)
- 💡 [Feature Requests](https://github.com/your-username/coffee-review-app/issues)
- 💬 [Discussions](https://github.com/your-username/coffee-review-app/discussions)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [date-fns](https://date-fns.org/) - Date utilities

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/coffee-review-app&type=Date)](https://star-history.com/#your-username/coffee-review-app&Date)

---

**Happy coffee tasting! ☕✨**

If you find this project helpful, please consider giving it a ⭐ on GitHub! 