# Deployment Guide

This guide covers different ways to deploy the BrewLog Coffee Community application.

## 🚀 Quick Deploy Options

### 1. Docker Compose (Recommended for Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/brewlog-coffee-community.git
cd brewlog-coffee-community

# Start with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
```

### 2. Local Development

```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Or use the provided script
./start-servers.sh
```

## ☁️ Cloud Deployment

### Vercel (Frontend)

1. **Connect your GitHub repository to Vercel**
2. **Configure build settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

4. **Deploy!**

### Railway (Backend)

1. **Connect your GitHub repository to Railway**
2. **Configure the service:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=4000
   ```

4. **Deploy!**

### Heroku

#### Frontend Deployment
```bash
# Create Heroku app
heroku create your-brewlog-frontend

# Set buildpack
heroku buildpacks:set mars/create-react-app

# Deploy
git push heroku main
```

#### Backend Deployment
```bash
# Create Heroku app
heroku create your-brewlog-backend

# Set Node.js buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main
```

### DigitalOcean App Platform

1. **Connect your GitHub repository**
2. **Configure services:**

   **Frontend Service:**
   - Source Directory: `frontend`
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment Variables: `NEXT_PUBLIC_API_URL`

   **Backend Service:**
   - Source Directory: `backend`
   - Build Command: `npm install`
   - Run Command: `npm start`

3. **Deploy!**

## 🐳 Docker Deployment

### Production Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://your-backend-url:4000
    depends_on:
      - backend
    restart: always
```

### Kubernetes Deployment

Create deployment files for both frontend and backend services.

## 🔧 Environment Configuration

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NODE_ENV=production
```

### Backend Environment Variables

```env
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📊 Monitoring & Logging

### Application Monitoring

- **Frontend**: Use Vercel Analytics or Google Analytics
- **Backend**: Use Railway/Heroku logs or set up external monitoring

### Health Checks

The backend includes a health check endpoint:
```
GET /health
```

## 🔒 Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CORS**: Configure CORS properly for your domains
3. **Environment Variables**: Never commit sensitive data
4. **Rate Limiting**: Consider implementing rate limiting
5. **Input Validation**: Validate all user inputs

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS configuration in backend
2. **Build Failures**: Ensure all dependencies are installed
3. **Port Conflicts**: Check if ports 3000/4000 are available
4. **Environment Variables**: Verify all required env vars are set

### Debug Commands

```bash
# Check if servers are running
curl http://localhost:4000/reviews
curl http://localhost:3000

# View logs
docker-compose logs
npm run dev:backend
npm run dev:frontend
```

## 📈 Performance Optimization

1. **Frontend**: Enable Next.js optimizations
2. **Backend**: Implement caching strategies
3. **Database**: Add proper indexing (when database is added)
4. **CDN**: Use CDN for static assets

## 🔄 CI/CD Pipeline

The repository includes GitHub Actions workflows for:
- Automated testing
- Build verification
- Deployment automation

Configure your deployment secrets in GitHub repository settings.

---

For more detailed deployment instructions, refer to the platform-specific documentation. 