# Panduan Instalasi dan Setup Cepat

## 📋 Prasyarat

- Node.js 16+ dan npm
- Account Supabase (https://supabase.com)

## 🚀 Langkah-Langkah Setup

### 1. Setup Database Supabase

1. Buat project baru di Supabase
2. Copy URL dan API Key (anon key)
3. Jalankan SQL dari file `backend/DATABASE_SETUP.md`

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
JWT_SECRET=your_secret_min_32_chars
JWT_EXPIRE=86400
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Jalankan backend:
```bash
npm run dev
```

Backend berjalan di: `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Buat file `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Jalankan frontend:
```bash
npm run dev
```

Frontend berjalan di: `http://localhost:3000`

## ✅ Testing

1. Buka `http://localhost:3000`
2. Daftar akun baru
3. Login
4. Coba tambah, edit, dan hapus buku

## 📁 Struktur File

```
toko_buku/
├── backend/
│   ├── server.js              # Main server
│   ├── package.json          # Dependencies
│   ├── .env.example          # Environment template
│   └── DATABASE_SETUP.md     # SQL queries
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app
│   │   ├── api.js           # API client
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── README.md
```

## 🔧 Troubleshooting

### Error CORS

Pastikan `FRONTEND_URL` di backend `.env` sesuai dengan URL frontend Anda

### Error Database Connection

Pastikan:
- Supabase URL dan KEY benar
- Table `users` dan `books` sudah dibuat
- RLS policy sudah di-setup

### Port sudah digunakan

Ubah PORT di `.env` backend atau gunakan perintah:
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

## 🌐 Deployment

### Deploy Backend ke Render

1. Push ke GitHub
2. Buat Web Service di Render.com
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env variables

### Deploy Frontend ke Vercel

1. Push ke GitHub
2. Connect repo di Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env: `VITE_API_URL=your_backend_url`

## 📞 Support

Jika ada pertanyaan, silakan buat issue di GitHub.

Happy coding! 📚✨
