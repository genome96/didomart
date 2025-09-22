@echo off
REM Development Setup Script for Dido Business Website (Windows)

echo 🚀 Setting up Dido Business Website for Development...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Create environment files
echo 📝 Setting up environment files...

REM Backend environment
if not exist backend\.env (
    copy backend\.env.example backend\.env >nul
    echo ✅ Created backend\.env from template
) else (
    echo ⚠️  backend\.env already exists
)

REM Frontend environment
if not exist frontend\.env.local (
    copy frontend\.env.local.example frontend\.env.local >nul
    echo ✅ Created frontend\.env.local from template
) else (
    echo ⚠️  frontend\.env.local already exists
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

cd ..

echo 🎉 Development setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Start MongoDB ^(if using local MongoDB^)
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo 4. Visit http://localhost:3000 to see your website
echo.
echo 🔧 Admin credentials:
echo Email: admin@dido.com
echo Password: admin123456
echo.
echo 📖 Check README.md for more detailed instructions
pause
