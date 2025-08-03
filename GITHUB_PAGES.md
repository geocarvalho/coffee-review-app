# GitHub Pages Deployment Guide

This guide explains how to deploy the BrewLog application to GitHub Pages.

## 🚀 Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The CI/CD pipeline will automatically deploy to GitHub Pages

### 2. Configure Environment Variables

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following repository secret:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.railway.app`)

### 3. Deploy Backend

Since GitHub Pages only serves static content, you need to deploy the backend separately:

#### Option A: Railway (Recommended)
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Deploy and copy the generated URL

#### Option B: Heroku
```bash
# Create Heroku app
heroku create your-brewlog-backend

# Set Node.js buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main
```

#### Option C: Render
1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 4. Update Environment Variable

Once your backend is deployed, update the `NEXT_PUBLIC_API_URL` secret with your backend URL.

## 🔧 Configuration

### Frontend Configuration

The frontend is configured for static export in `frontend/next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
```

### API Configuration

All API calls use the environment variable:

```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
```

## 📋 Deployment Process

### Automatic Deployment

1. **Push to main branch** → Triggers CI/CD pipeline
2. **Tests run** → Ensures code quality
3. **Build process** → Creates static files
4. **Deploy to GitHub Pages** → Publishes to `https://yourusername.github.io/your-repo`

### Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
cd frontend
npm install

# Build for production
npm run build

# The build output will be in the `out` directory
```

## 🌐 Accessing Your App

- **GitHub Pages URL**: `https://yourusername.github.io/your-repo`
- **Backend API**: Your deployed backend URL

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your backend has CORS configured for your GitHub Pages domain
   - Add `https://yourusername.github.io` to allowed origins

2. **API Not Found**
   - Check that `NEXT_PUBLIC_API_URL` is set correctly
   - Verify your backend is running and accessible

3. **Build Failures**
   - Check GitHub Actions logs for errors
   - Ensure all dependencies are properly installed

4. **404 Errors on Refresh**
   - This is normal for single-page applications
   - Consider using a custom 404 page

### Debug Commands

```bash
# Check if GitHub Pages is working
curl https://yourusername.github.io/your-repo

# Check if backend is accessible
curl https://your-backend-url.com/reviews

# Test local build
cd frontend
npm run build
npm run start
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS Configuration**: Properly configure CORS on your backend
3. **HTTPS**: GitHub Pages automatically provides HTTPS
4. **API Security**: Implement proper authentication for your backend

## 📈 Monitoring

- **GitHub Actions**: Monitor deployment status
- **GitHub Pages**: Check site status in repository settings
- **Backend Logs**: Monitor your backend service logs

## 🔄 Updates

To update your deployed application:

1. Make changes to your code
2. Push to the main branch
3. GitHub Actions will automatically rebuild and deploy
4. Changes will be live in a few minutes

---

For more detailed deployment options, see the main [DEPLOYMENT.md](DEPLOYMENT.md) file. 