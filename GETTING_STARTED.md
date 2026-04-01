# 🚀 Panduan Memulai Toko Buku Online

Selamat datang! Berikut adalah panduan langkah demi langkah untuk membuat aplikasi Toko Buku Online Anda berjalan.

## ⚙️ Prasyarat

Sebelum memulai, pastikan Anda sudah menginstall:

1. **Node.js 16+** - Download di https://nodejs.org
   - Verify: `node --version` di terminal
   - npm akan otomatis terinstall

2. **Account Supabase** - Gratis di https://supabase.com
   - Anda akan membutuhkan URL dan API Key

3. **Text Editor** - VSCode recommended dari https://code.visualstudio.com

## 🎯 Langkah 1: Persiapan Database Supabase

### 1.1 Buat Project di Supabase

1. Kunjungi https://supabase.com
2. Klik "Sign Up" dan buat akun dengan email
3. Klik "New Project"
4. Isi form:
   - **Project name**: `toko-buku`
   - **Database password**: Ingat passwordnya!
   - **Region**: Pilih region terdekat
5. Tunggu sampai project selesai dibuat (2-5 menit)

### 1.2 Ambil Credentials

1. Di dashboard Supabase, klik project Anda
2. Buka menu **Settings** → **API**
3. Copy:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon public** (adalah API Key Anda)
4. Simpan ini untuk langkah selanjutnya

### 1.3 Buat Tables di Database

1. Di Supabase dashboard, buka **SQL Editor**
2. Klik **New Query**
3. Copy-paste seluruh kode dari file berikut:
   ```
   backend/ORDERS_CREATE_TABLES.sql
   ```
4. Klik **Run** untuk menjalankan

Jika muncul pesan "success", berarti database sudah siap! ✅

## 🏃 Langkah 2: Setup Backend

### 2.1 Buka Folder Backend

```bash
cd c:\toko_buku\backend
```

Atau menggunakan File Explorer:
- Buka folder `c:\toko_buku\backend`
- Shift + Right Click → Open PowerShell here

### 2.2 Instalasi Dependencies

```bash
npm install
```

Tunggu sampai selesai (biasanya 1-2 menit).

### 2.3 Buat File .env

1. Copy file `.env.example` menjadi `.env`
   ```bash
   copy .env.example .env
   ```
   
2. Buka file `.env` dengan text editor
   
3. Update dengan credentials Supabase:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=your_anon_key_here
   JWT_SECRET=your_very_long_secret_mingal_32_chars_boleh_random
   JWT_EXPIRE=86400
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

   Contoh real:
   ```
   SUPABASE_URL=https://abcdef123456.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT_SECRET=my_super_secret_key_that_is_at_least_32_characters_long_12345
   JWT_EXPIRE=86400
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

### 2.4 Test Backend

Jalankan backend:
```bash
npm run dev
```

Seharusnya muncul:
```
🎓 Backend Toko Buku running di port 5000
```

✅ Backend siap!

**Jangan tutup terminal ini.** Buka terminal baru untuk langkah berikutnya.

## 🎨 Langkah 3: Setup Frontend

### 3.1 Buka Folder Frontend (Terminal Baru)

```bash
cd c:\toko_buku\frontend
```

### 3.2 Instalasi Dependencies

```bash
npm install
```

### 3.3 Buat File .env

1. Copy file `.env.example` menjadi `.env`
   ```bash
   copy .env.example .env
   ```

2. File `.env` sudah benar sebagaimana:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### 3.4 Jalankan Frontend

```bash
npm run dev
```

Seharusnya muncul:
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

✅ Frontend siap!

## 🌐 Langkah 4: Buka Browser

1. Buka browser Anda
2. Kunjungi: **http://localhost:3000**

Tadaa! 🎉 Aplikasi sudah berjalan!

## 📝 Langkah 5: Test Aplikasi

### 5.1 Register Akun Baru

1. Klik tombol "Daftar" di navbar
2. Isi form:
   - **Nama**: Juanita Prasetyo (atau nama Anda)
   - **Email**: `juanita@example.com`
   - **Password**: `password123`
   - **Konfirmasi Password**: `password123`
3. Klik tombol "Daftar"

Seharusnya Anda redirect ke halaman utama dan sudah login. ✅

### 5.2 Tambah Buku Pertama

1. Klik tombol "➕ Tambah Buku" (di homepage)
2. Isi form:
   - **Judul Buku**: `Laskar Pelangi`
   - **Penulis**: `Andrea Hirata`
   - **Harga**: `65000`
   - **Stok**: `10`
   - **Kategori**: `Fiksi`
   - **Deskripsi**: `Kisah perjuangan siswa SMP di Belitong`
   - **URL Gambar**: (biarkan kosong untuk sekarang)
3. Klik "Tambah Buku"

Buku seharusnya muncul di halaman 🎉

### 5.3 Edit Buku

1. Cari buku yang baru dibuat
2. Klik tombol "✏️ Edit"
3. Ubah harga menjadi `70000`
4. Klik "Update Buku"

✅ Buku berhasil diupdate!

### 5.4 Cari Buku

1. Di halaman utama, ketik di kotak pencarian: `Laskar`
2. Hasil pencarian seharusnya filter secara otomatis

✅ Search works!

### 5.5 Filter Kategori

1. Gunakan dropdown kategori untuk filter
2. Buku akan di-filter berdasarkan kategori

✅ Filter works!

### 5.6 Hapus Buku

1. Klik tombol "🗑️ Hapus" pada buku
2. Akan ada konfirmasi delete
3. Klik "OK" untuk confirm

✅ Buku berhasil dihapus!

### 5.7 Logout

1. Klik nama user di navbar
2. Klik tombol "Logout"

Seharusnya Anda kembali ke mode visitor. ✅

## 🎯 Langkah 6: Development

### Struktur Project

```
toko_buku/
├── backend/          → API Server
├── frontend/         → Web Interface
└── README.md         → Documentation
```

### Menjalankan Kembali

Nanti kalau mau develop lagi:

```bash
# Terminal 1 - Backend
cd c:\toko_buku\backend
npm run dev

# Terminal 2 - Frontend
cd c:\toko_buku\frontend
npm run dev
```

### Mengubah Kode

- **Backend**: Edit file di `backend/` lalu backend akan auto-reload
- **Frontend**: Edit file di `frontend/src/` lalu browser akan auto-refresh

## 🐛 Troubleshooting

### ❌ "EADDRINUSE: address already in use :::5000"

Backend port sudah digunakan. Solusi:

```bash
# Windows - Cari process yang pakai port 5000
netstat -ano | findstr :5000

# Lalu kill process:
taskkill /PID <PID> /F

# Atau ubah PORT di backend/.env menjadi 5001
```

### ❌ "Cannot GET /api/books"

Backend tidak running. Pastikan:
- Terminal backend masih terbuka
- Muncul pesan "Backend running di port 5000"

### ❌ "Supabase connection failed"

Check di backend/.env:
- `SUPABASE_URL` dan `SUPABASE_KEY` benar
- Table sudah di-create di Supabase

### ❌ "Email sudah terdaftar"

Gunakan email yang berbeda untuk test. Contoh:
- `user1@test.com`
- `user2@test.com`
- dst

### ❌ Tombol "Tambah Buku" tidak muncul

Anda belum login. Silakan login terlebih dahulu.

### ❌ Buku tidak bisa dihapus/edit

Pastikan buku adalah milik Anda (user yang login). Hanya pemilik buku yang bisa edit/delete.

## 📚 Dokumentasi Lengkap

Untuk info lebih detail, baca file:

- **README.md** - Overview project
- **QUICKSTART.md** - Setup cepat
- **PROJECT_SUMMARY.md** - Ringkasan lengkap
- **backend/API_DOCUMENTATION.md** - API reference lengkap
- **backend/AUTH_IMPLEMENTATION.md** - Cara auth bekerja
- **backend/DATABASE_SETUP.md** - Database schema

## 🚀 Langkah Berikutnya

### 1. Tambah Data Sample

Silakan tambahkan lebih banyak buku dengan kategori berbeda:
- Fiksi
- Non-Fiksi
- Misteri
- Self-Help
- dll

### 2. Coba Fitur Search & Filter

Lihat bagaimana search dan filter kategori bekerja.

### 3. Test Protection

Login dengan akun berbeda, pastikan:
- Tidak bisa edit/delete buku orang lain
- Hanya bisa edit buku sendiri

### 4. Explore Code

Baca code di:
- `frontend/src/App.jsx` - Main app logic
- `backend/server.js` - Backend logic
- `frontend/src/components/` - React components

### 5. Siap Deploy? (Optional)

Ingin deploy ke production?
- Backend → Render.com (gratis)
- Frontend → Vercel (gratis)

Lihat file `backend/API_DOCUMENTATION.md` untuk deployment instructions.

## 💡 Tips Pembelajaran

1. **Pahami Flow**:
   - User register → Ada di database
   - User login → Dapat token JWT
   - Token disimpan di localStorage
   - Setiap request ke backend membawa token
   - Backend verify token sebelum akses data

2. **Pelajari Dari Code**:
   - Buka `frontend/src/api.js` - Interface untuk API
   - Buka `backend/server.js` - Semua endpoint ada di sini
   - Buka `frontend/src/pages/Home.jsx` - Cara fetch & display data

3. **Practice**:
   - Coba tambah field baru di form
   - Coba tambah validasi di backend
   - Coba customize design/warna

## ✅ Checklist

- [ ] Node.js 16+ terinstall
- [ ] Supabase project dibuat
- [ ] Database tables sudah di-create
- [ ] Backend .env di-configure
- [ ] Frontend .env di-configure
- [ ] Backend running di port 5000
- [ ] Frontend running di port 3000
- [ ] Bisa register & login
- [ ] Bisa tambah/edit/delete buku
- [ ] Bisa search & filter

Jika semua ✅, selamat! Aplikasi Anda sudah ready! 🎉

## 🤝 Support

Jika ada masalah:
1. Baca file troubleshooting di atas
2. Check konsol browser (F12) untuk error messages
3. Check terminal backend untuk error messages
4. Baca dokumentasi di folder project

## 🎓 Learn More

- [React Tutorial](https://react.dev)
- [Express Tutorial](https://expressjs.com)
- [Supabase Guide](https://supabase.com/docs)
- [JWT Explained](https://jwt.io)

---

**Happy Coding! 📚✨**

Semoga Anda enjoy belajar full-stack development dengan project ini!

Jika ada pertanyaan atau feedback, jangan ragu untuk bertanya.

Sukses! 🚀
