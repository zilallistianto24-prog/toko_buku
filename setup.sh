#!/bin/bash

# Script untuk install dependencies dan start aplikasi Toko Buku Online

echo "🎓 Toko Buku Online - Setup Script"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan. Silakan install Node.js terlebih dahulu."
    echo "   Download di: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js ditemukan: $(node --version)"
echo "✅ npm ditemukan: $(npm --version)"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
echo "------------------------"

if [ ! -d "backend" ]; then
    echo "❌ Folder backend tidak ditemukan!"
    exit 1
fi

cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  File .env tidak ditemukan. Membuat dari .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✏️  Silakan edit file backend/.env dengan credentials Supabase Anda"
    fi
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies sudah terinstall"
fi

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."
echo "------------------------"

if [ ! -d "frontend" ]; then
    echo "❌ Folder frontend tidak ditemukan!"
    exit 1
fi

cd frontend

if [ ! -f ".env" ]; then
    echo "⚠️  File .env tidak ditemukan. Membuat dari .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✏️  Silakan edit file frontend/.env jika backend tidak berjalan di localhost:5000"
    fi
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies sudah terinstall"
fi

cd ..

echo ""
echo "✅ Setup selesai!"
echo ""
echo "📝 Langkah selanjutnya:"
echo ""
echo "1. Setup Database Supabase:"
echo "   - Buat project di https://supabase.com"
echo "   - Copy URL dan API Key"
echo "   - Jalankan SQL queries dari backend/ORDERS_CREATE_TABLES.sql"
echo ""
echo "2. Konfigurasi Environment Variables:"
echo "   - Edit backend/.env dengan Supabase credentials"
echo "   - Edit frontend/.env jika diperlukan"
echo ""
echo "3. Jalankan Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "4. Jalankan Frontend (di terminal baru):"
echo "   cd frontend && npm run dev"
echo ""
echo "5. Buka browser:"
echo "   http://localhost:3000"
echo ""
echo "📖 Dokumentasi: Baca README.md untuk informasi lebih lanjut"
echo ""
