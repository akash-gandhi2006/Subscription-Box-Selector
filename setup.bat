@echo off
echo ========================================
echo Airtel Subscription Box Setup Script
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed ✓
echo.

echo Checking if MongoDB is running...
netstat -an | findstr ":27017" >nul
if %errorlevel% neq 0 (
    echo WARNING: MongoDB might not be running!
    echo Please start MongoDB service or install MongoDB
    echo.
)

echo Setting up backend...
cd backend
echo Installing backend dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies!
    pause
    exit /b 1
)
echo Backend dependencies installed ✓
echo.

echo Creating .env file for backend...
if not exist .env (
    echo PORT=5000 > .env
    echo NODE_ENV=development >> .env
    echo MONGODB_URI=mongodb://localhost:27017/airtel-subscription >> .env
    echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo .env file created ✓
) else (
    echo .env file already exists ✓
)
echo.

echo Setting up frontend...
cd ../frontend
echo Installing frontend dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies!
    pause
    exit /b 1
)
echo Frontend dependencies installed ✓
echo.

echo Seeding database with sample data...
cd ../backend
echo Running database seed...
npm run seed
if %errorlevel% neq 0 (
    echo WARNING: Failed to seed database. You can run it manually later.
) else (
    echo Database seeded successfully ✓
)
echo.

echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the application:
echo 1. Start MongoDB (if not already running)
echo 2. Open a terminal and run: cd backend && npm run dev
echo 3. Open another terminal and run: cd frontend && npm start
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo.
echo Default admin credentials:
echo - Email: admin@airtel.com
echo - Password: admin123
echo.
pause 