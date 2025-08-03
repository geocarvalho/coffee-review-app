// Configuration for API endpoints
export const config = {
  // API base URL - will use environment variable or fallback
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  
  // Check if we're in development mode
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Check if we're running on GitHub Pages
  isGitHubPages: typeof window !== 'undefined' && window.location.hostname.includes('github.io'),
};

// Helper function to get the full API URL
export const getApiUrl = (endpoint: string): string => {
  // If we're on GitHub Pages and no API URL is configured, show a message
  if (config.isGitHubPages && !process.env.NEXT_PUBLIC_API_URL) {
    console.warn('NEXT_PUBLIC_API_URL not configured for GitHub Pages deployment');
  }
  
  return `${config.apiUrl}${endpoint}`;
}; 