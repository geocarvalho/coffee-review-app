# GitHub Pages Setup Guide

## 🔧 Repository Settings

### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/geocarvalho/coffee-review-app
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 2. Verify Permissions

The CI/CD workflow now includes the necessary permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 3. Check Workflow Status

1. Go to **Actions** tab in your repository
2. Look for the latest workflow run
3. Check that both jobs complete successfully:
   - ✅ `test` job
   - ✅ `deploy-github-pages` job

## 🚀 Deployment Process

### What Happens:

1. **Push to main** → Triggers workflow
2. **Tests run** → Ensures code quality
3. **Frontend builds** → Creates static files
4. **Deploy to gh-pages** → Updates GitHub Pages
5. **Site goes live** → Available at your URL

### Expected Timeline:
- **Build**: 2-3 minutes
- **Deploy**: 1-2 minutes
- **Total**: 3-5 minutes

## 🔍 Troubleshooting

### If Deployment Fails:

1. **Check Actions tab** for error messages
2. **Verify permissions** are set correctly
3. **Check build logs** for any issues
4. **Ensure GitHub Pages** is enabled

### Common Issues:

- **Permission denied**: Fixed with permissions in workflow
- **Build failures**: Check for dependency issues
- **404 errors**: Normal for SPA, consider custom 404 page

## 📱 Your Site

Once deployed, your site will be available at:
**https://geocarvalho.github.io/coffee-review-app/**

## 🔄 Updates

To update your site:
1. Make changes to your code
2. Push to `main` branch
3. GitHub Actions automatically deploys
4. Site updates in 3-5 minutes

---

**The latest workflow should now deploy successfully!** 🎉 