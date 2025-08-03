# BrewLog - Coffee Community App

A full-stack coffee review and community application with a modern React/Next.js frontend and Express.js backend.

## 🚀 Features

### Core Functionality
- **Coffee Reviews Feed** - View and interact with coffee reviews
- **Add New Reviews** - Log your coffee brewing experiences
- **Shop Reviews** - Review coffee shops and cafes
- **Discover Section** - Explore trending coffees, roasters, origins, and brewing methods
- **User Profiles** - Personal profile with statistics and activity history

### Social Features
- **Like/Unlike Reviews** - Show appreciation for coffee reviews
- **Comments System** - Add comments to reviews with edit/delete functionality
- **Share Reviews** - Share coffee reviews via native sharing or clipboard
- **Real-time Updates** - All interactions update immediately

### User Experience
- **Responsive Design** - Works perfectly on mobile and desktop
- **Modern UI** - Beautiful interface built with Tailwind CSS
- **Interactive Elements** - Smooth animations and transitions
- **Edit & Delete** - Full CRUD operations for reviews and comments

## 📁 Project Structure

```
coffee_app/
├── backend/                 # Express.js API server
│   ├── index.js            # Main server file with all endpoints
│   ├── package.json        # Backend dependencies
│   └── package-lock.json   # Dependency lock file
├── frontend/               # Next.js React application
│   ├── pages/              # Next.js pages (Feed, Log Brew, Log Visit, Discover, Profile)
│   ├── components/         # Reusable React components
│   │   ├── ui/            # UI components (Button, Card, Avatar)
│   │   └── FloatingActionButton.tsx
│   ├── lib/               # Utility functions
│   ├── styles/            # Global CSS and Tailwind styles
│   ├── package.json       # Frontend dependencies
│   └── package-lock.json  # Dependency lock file
├── start-servers.sh       # Script to start both servers
├── stop-servers.sh        # Script to stop all servers
├── README.md              # This file
└── .gitignore            # Git ignore rules
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd coffee_app
   ```

2. **Start both servers with one command:**
   ```bash
   ./start-servers.sh
   ```

3. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

### Reviews
- `GET /reviews` - Get all coffee reviews
- `POST /reviews` - Create a new coffee review
- `PUT /reviews/:id` - Update a specific review
- `DELETE /reviews/:id` - Delete a specific review

### Social Features
- `POST /reviews/:id/like` - Like/unlike a review
- `POST /reviews/:id/comments` - Add a comment to a review
- `GET /reviews/:id/comments` - Get all comments for a review
- `PUT /reviews/:reviewId/comments/:commentId` - Edit a comment
- `DELETE /reviews/:reviewId/comments/:commentId` - Delete a comment

## 🎨 Pages & Features

### Feed Page (`/`)
- View all coffee reviews
- Like, comment, and share reviews
- Edit and delete your own reviews
- Responsive design with mobile navigation

### Log Brew Page (`/log-brew`)
- Comprehensive form for logging coffee brews
- Fields for coffee details, brewing method, tasting notes
- Form validation and submission

### Log Visit Page (`/log-visit`)
- Review coffee shops and cafes
- Upload photos and add detailed reviews
- Rate your experience

### Discover Page (`/discover`)
- **Trending Tab** - Popular coffees and brewing methods
- **Roasters Tab** - Top coffee roasters with ratings
- **Origins Tab** - Coffee origins and regions
- **Methods Tab** - Brewing methods with ratings

### Profile Page (`/profile`)
- User profile with statistics
- **Recent Brews Tab** - Your coffee reviews
- **Shop Reviews Tab** - Your cafe reviews
- **Favorites Tab** - Saved favorites (coming soon)
- **Statistics Tab** - Coffee journey analytics

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing
- **UUID** - Unique identifier generation

### Frontend
- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI components

## 🚀 Development

### Development Mode
```bash
# Backend with auto-restart
cd backend
npm run dev

# Frontend with hot reload
cd frontend
npm run dev
```

### Production Build
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices with:
- Touch-friendly interface
- Mobile navigation bar
- Responsive layouts
- Native sharing support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 