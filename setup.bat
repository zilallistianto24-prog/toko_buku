@echo off
REM Script untuk install dependencies dan start aplikasi Toko Buku Online

echo.
echo 🎓 Toko Buku Online - Setup Script
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js tidak ditemukan. Silakan install Node.js terlebih dahulu.
    echo    Download di: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js ditemukan: %NODE_VERSION%
echo ✅ npm ditemukan: %NPM_VERSION%
echo.

REM Backend setup
echo 📦 Setting up Backend...
echo ------------------------
echo.

if not exist "backend" (
    echo ❌ Folder backend tidak ditemukan!
    pause
    exit /b 1
)

cd backend

if not exist ".env" (
    echo ⚠️  File .env tidak ditemukan. Membuat dari .env.example...
    if exist ".env.example" (
        copy .env.example .env
        echo ✏️  Silakan edit file backend\.env dengan credentials Supabase Anda
    )
)

if not exist "node_modules" (
    echo 📥 Installing backend dependencies...
    call npm install
) else (
    echo ✅ Backend dependencies sudah terinstall
)

cd ..

REM Frontend setup
echo.
echo 🎨 Setting up Frontend...
echo ------------------------
echo.

if not exist "frontend" (
    echo ❌ Folder frontend tidak ditemukan!
    pause
    exit /b 1
)

cd frontend

if not exist ".env" (
    echo ⚠️  File .env tidak ditemukan. Membuat dari .env.example...
    if exist ".env.example" (
        copy .env.example .env
        echo ✏️  Silakan edit file frontend\.env jika backend tidak berjalan di localhost:5000
    )
)

if not exist "node_modules" (
    echo 📥 Installing frontend dependencies...
    call npm install
) else (
    echo ✅ Frontend dependencies sudah terinstall
)

cd ..

echo.
echo ✅ Setup selesai!
echo.
echo 📝 Langkah selanjutnya:
echo.
echo 1. Setup Database Supabase:
echo    - Buat project di https://supabase.com
echo    - Copy URL dan API Key
echo    - Jalankan SQL queries dari backend\ORDERS_CREATE_TABLES.sql
echo.
echo 2. Konfigurasi Environment Variables:
echo    - Edit backend\.env dengan Supabase credentials
echo    - Edit frontend\.env jika diperlukan
echo.
echo 3. Jalankan Backend:
echo    cd backend ^&^& npm run dev
echo.
echo 4. Jalankan Frontend (di terminal baru):
echo    cd frontend ^&^& npm run dev
echo.
echo 5. Buka browser:
echo    http://localhost:3000
echo.
echo 📖 Dokumentasi: Baca README.md untuk informasi lebih lanjut
echo.

pause
