#!/bin/bash

# Test script for deployment verification
echo "🧪 Testing BrewLog Deployment Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Test 1: Check if Node.js is installed
echo -e "\n${YELLOW}1. Checking Node.js installation...${NC}"
node --version > /dev/null 2>&1
print_status $? "Node.js is installed"

# Test 2: Check if npm is installed
echo -e "\n${YELLOW}2. Checking npm installation...${NC}"
npm --version > /dev/null 2>&1
print_status $? "npm is installed"

# Test 3: Check if dependencies are installed
echo -e "\n${YELLOW}3. Checking dependencies...${NC}"
if [ -d "node_modules" ] && [ -d "backend/node_modules" ] && [ -d "frontend/node_modules" ]; then
    print_status 0 "All dependencies are installed"
else
    print_status 1 "Some dependencies are missing"
    echo -e "${YELLOW}   Run: npm run install:all${NC}"
fi

# Test 4: Check if backend can start
echo -e "\n${YELLOW}4. Testing backend startup...${NC}"
cd backend
timeout 5s npm start > /dev/null 2>&1 &
BACKEND_PID=$!
sleep 2
if curl -s http://localhost:4000/health > /dev/null 2>&1; then
    print_status 0 "Backend is running and responding"
else
    print_status 1 "Backend is not responding"
fi
kill $BACKEND_PID 2>/dev/null
cd ..

# Test 5: Check if frontend can build
echo -e "\n${YELLOW}5. Testing frontend build...${NC}"
cd frontend
if npm run build > /dev/null 2>&1; then
    print_status 0 "Frontend builds successfully"
else
    print_status 1 "Frontend build failed"
fi
cd ..

# Test 6: Check Docker setup
echo -e "\n${YELLOW}6. Checking Docker setup...${NC}"
if command -v docker > /dev/null 2>&1 && command -v docker-compose > /dev/null 2>&1; then
    print_status 0 "Docker and Docker Compose are available"
else
    print_status 1 "Docker or Docker Compose not found"
fi

# Test 7: Check GitHub Actions files
echo -e "\n${YELLOW}7. Checking GitHub Actions configuration...${NC}"
if [ -f ".github/workflows/ci.yml" ]; then
    print_status 0 "CI/CD workflow is configured"
else
    print_status 1 "CI/CD workflow is missing"
fi

# Test 8: Check environment configuration
echo -e "\n${YELLOW}8. Checking environment configuration...${NC}"
if [ -f ".gitignore" ] && grep -q "node_modules" .gitignore; then
    print_status 0 "Git ignore is properly configured"
else
    print_status 1 "Git ignore needs configuration"
fi

echo -e "\n${GREEN}🎉 Deployment setup verification complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Push your code to GitHub"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Deploy your backend to Railway/Heroku/Render"
echo "4. Set the NEXT_PUBLIC_API_URL secret in GitHub"
echo "5. Your app will be available at: https://yourusername.github.io/your-repo" 