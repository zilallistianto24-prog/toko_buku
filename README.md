# Toko Buku Online - Book Store Website

Website marketplace toko buku dengan fitur CRUD lengkap, menggunakan React-Vite, Node.js, dan Supabase.

## 📋 Fitur

✅ CRUD Operations - Create, Read, Update, Delete buku
✅ User Authentication - Register, Login, Logout dengan JWT
✅ Protected Routes - Hanya user yang login bisa manage buku
✅ Modern UI - Desain seperti Lazada dengan warna emas dan biru navy
✅ Responsive Design - Mobile-friendly interface
✅ Real-time Database - Integrasi Supabase
✅ Error Handling - Notifikasi error yang user-friendly
✅ Loading State - Indikator loading saat fetch data
✅ Category Management - Kategori buku (Fiksi, Non-fiksi, dll)

## 🏗️ Struktur Project

```
toko_buku/
├── frontend/                 # React-Vite Frontend
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── BookGrid.jsx
│   │   │   ├── BookCard.jsx
│   │   │   └── BookModal.jsx
│   │   ├── App.jsx          # Main App Component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global Styles
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── backend/                  # Node.js/Express Backend
    ├── server.js            # Main server file
    ├── routes.js            # API routes
    ├── db.js                # Supabase config
    ├── package.json
    └── .env                 # Environment variables
```

## 🎨 Warna Dominan

• Primary Gold (Emas Buku): `#C4A747`
• Dark Navy: `#1A1F3A`
• Light Cream: `#F5F3E8`
• White: `#FFFFFF`
• Light Gray: `#E8E6E1`

## 🚀 Instalasi & Setup

### 1. Supabase Setup

1. Buat akun di [supabase.com](https://supabase.com/)
2. Buat project baru
3. Buat dua table:
   - `books` table: Untuk produk buku
   - `users` table: Untuk user authentication
4. Copy URL dan API Key dari Supabase

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` file dengan credentials Supabase & JWT:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=86400
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Start development server:
```bash
npm run dev
```

**Catatan:** Backend akan berjalan di `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 📡 API Endpoints

### GET - Ambil semua buku

```
GET /api/books
```

### GET - Ambil buku berdasarkan ID

```
GET /api/books/:id
```

### POST - Tambah buku baru

```
POST /api/books
Content-Type: application/json

{
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "description": "Novel tentang perjuangan siswa SMP",
  "price": 50000,
  "stock": 20,
  "category": "Fiksi",
  "image_url": "https://..."
}
```

### PUT - Update buku

```
PUT /api/books/:id
Content-Type: application/json

{
  "title": "Laskar Pelangi (Edisi Baru)",
  "author": "Andrea Hirata",
  "description": "Novel tentang perjuangan siswa SMP",
  "price": 55000,
  "stock": 25,
  "category": "Fiksi",
  "image_url": "https://..."
}
```

### DELETE - Hapus buku

```
DELETE /api/books/:id
```

### Auth Endpoints

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

## 🌐 Deployment

### Deploy Backend ke Render.com

1. Push code ke GitHub
2. Buat akun di [render.com](https://render.com/)
3. New → Web Service
4. Pilih repository Anda
5. Konfigurasi:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `JWT_SECRET`
7. Deploy

Backend URL: `https://your-app.onrender.com/api`

### Deploy Frontend ke Render.com

1. Di Render, buat Static Site baru
2. Pilih repository Anda
3. Konfigurasi:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Update environment variable di frontend:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

## 📝 Penggunaan

1. Register: Klik "Daftar" dan buat akun baru
2. Login: Masuk dengan email dan password
3. Tambah Buku: Klik tombol "+ Tambah Buku" (hanya untuk user yang login)
4. Edit Buku: Klik tombol "✏️ Edit" pada setiap buku
5. Hapus Buku: Klik tombol "🗑️ Hapus" (akan ada konfirmasi)
6. Logout: Klik nama user di navbar → Logout

## 🛠️ Teknologi

### Frontend

• React 18.2
• Vite 5.0
• React Router DOM 6.20
• Axios
• CSS3 (Custom styling dengan variabel CSS)

### Backend

• Node.js & Express
• Supabase (PostgreSQL)
• CORS
• dotenv
• jsonwebtoken

## 📦 Dependency Installation

Frontend:
```bash
npm install
```

Backend:
```bash
npm install
```

## 🧪 Testing

### Test Backend

```bash
# Test endpoint di terminal
curl http://localhost:5000/api/books
```

### Test Frontend

Buka `http://localhost:3000` di browser

## 🔐 Security Tips

• Jangan commit file `.env`
• Gunakan environment variables untuk sensitive data
• Enable Row Level Security (RLS) di Supabase untuk production
• Validate semua input di server
• Gunakan HTTPS di production

## 🐛 Troubleshooting

**Error: Cannot GET /api/books**
- Pastikan backend sudah running di port 5000
- Check CORS configuration

**Error: Supabase connection failed**
- Pastikan credentials di .env benar
- Test koneksi Supabase di dashboard

**Image tidak muncul**
- Pastikan URL image valid dan accessible
- Periksa CORS settings Supabase

## 📚 Dokumentasi Lebih Lanjut

• [React Documentation](https://react.dev/)
• [Vite Documentation](https://vitejs.dev/)
• [Supabase Documentation](https://supabase.com/docs)
• [Express Documentation](https://expressjs.com/)
• [Render Documentation](https://render.com/docs)

## 👨‍💻 Pengembangan Lebih Lanjut

Ideas untuk improvement:

• ✨ Fitur search dan filter
• 🏷️ Kategori buku yang lebih detail
• ⭐ Rating & review
• 🛒 Shopping cart
• 💳 Payment gateway
• 📦 Order tracking
• 📊 Admin dashboard
• 📖 Preview halaman buku

## 📄 Lisensi

Project ini bebas digunakan untuk keperluan pribadi atau komersial.

Dibuat dengan ❤️ untuk Toko Buku Online
