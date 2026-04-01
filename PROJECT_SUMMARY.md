# Project Summary - Toko Buku Online

## 📚 Deskripsi Project

Toko Buku Online adalah aplikasi marketplace untuk buku dengan fitur CRUD lengkap, sistem autentikasi user berbasis JWT, dan database real-time menggunakan Supabase.

Platform ini memungkinkan:
- ✅ User untuk mendaftar dan login
- ✅ User yang login dapat menambah, mengedit, dan menghapus buku mereka
- ✅ Semua pengunjung dapat melihat katalog buku
- ✅ Pencarian dan filter berdasarkan kategori
- ✅ Interface modern dan responsive

## 🏗️ Arsitektur

```
Toko Buku Online (Full Stack)
├── Frontend (React-Vite)
│   ├── Pages: Home, Login, Register
│   ├── Components: Navbar, BookCard, BookGrid, BookModal
│   └── Styling: Custom CSS dengan color variables
│
├── Backend (Node.js-Express)
│   ├── Auth Routes: register, login, logout, verify
│   ├── Books Routes: GET, POST, PUT, DELETE
│   └── Middleware: JWT verification, CORS
│
└── Database (Supabase PostgreSQL)
    ├── Users Table
    ├── Books Table
    └── Row Level Security (RLS)
```

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **React Router DOM 6.20** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling dengan CSS variables

### Backend
- **Node.js** - Runtime
- **Express 4.18** - Web framework
- **Supabase JS Client** - Database
- **JWT** - Token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Database
- **Supabase** - PostgreSQL as a Service
- **UUID** - Primary key
- **RLS** - Row Level Security
- **Indexes** - Query optimization

## 📁 Struktur File

```
toko_buku/
├── README.md                          # Project overview
├── QUICKSTART.md                      # Setup guide
├── setup.bat / setup.sh               # Auto setup scripts
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api.js
│       ├── components/
│       │   ├── Navbar.jsx & Navbar.css
│       │   ├── BookCard.jsx & BookCard.css
│       │   ├── BookModal.jsx & BookModal.css
│       │   ├── BookGrid.jsx & BookGrid.css
│       └── pages/
│           ├── Home.jsx & Home.css
│           ├── Login.jsx
│           ├── Register.jsx
│           └── AuthPages.css
│
├── backend/
│   ├── server.js                      # Main server
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   ├── AUTH_IMPLEMENTATION.md         # Auth guide
│   ├── API_DOCUMENTATION.md           # API reference
│   ├── DATABASE_SETUP.md              # SQL queries
│   └── ORDERS_CREATE_TABLES.sql       # Create tables SQL
│
└── .gitignore
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#C4A747` - Brand color
- **Dark Navy**: `#1A1F3A` - Primary text & nav
- **Light Cream**: `#F5F3E8` - Background
- **White**: `#FFFFFF`
- **Light Gray**: `#E8E6E1`

### Components
- ✅ Responsive navbar dengan search & user menu
- ✅ Book grid dengan hover effects
- ✅ Modal form untuk tambah/edit buku
- ✅ Auth forms dengan validation
- ✅ Alert messages (success, error, warning)

## 🚀 Features

### User Management
- [x] Register / Sign Up
- [x] Login / Sign In  
- [x] Logout
- [x] Token verification
- [x] Password hashing with bcryptjs

### Book Management
- [x] List all books
- [x] Search books
- [x] Filter by category
- [x] Create new book (protected)
- [x] Edit own books (protected)
- [x] Delete own books (protected)
- [x] View book details

### UI/UX
- [x] Responsive design
- [x] Modern interface
- [x] Loading states
- [x] Error handling
- [x] Success notifications
- [x] Form validation

## 🔐 Security Features

1. **JWT Authentication**: Token-based auth untuk protected routes
2. **Password Hashing**: bcryptjs untuk secure password storage
3. **CORS**: Cross-origin resource sharing yang terkontrol
4. **Row Level Security**: Supabase RLS untuk database level security
5. **Input Validation**: Validasi di frontend dan backend
6. **Protected Routes**: API routes hanya accessible dengan valid token

## 📦 Dependencies

### Frontend (13 packages)
```
react, react-dom, react-router-dom, axios
```

### Backend (7 packages)
```
express, cors, dotenv, jsonwebtoken, @supabase/supabase-js, bcryptjs
```

## 🧪 Testing

### Manual Testing
1. Register user baru
2. Login dengan credentials
3. Tambah buku baru
4. Edit buku yang dibuat
5. Delete buku
6. Search dan filter buku
7. Logout

### API Testing (cURL)
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","name":"Test"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Get books
curl http://localhost:5000/api/books
```

## 🌐 Deployment

### Backend (Render.com)
```
Build: npm install
Start: npm start
Env: SUPABASE_URL, SUPABASE_KEY, JWT_SECRET
```

### Frontend (Vercel / Netlify)
```
Build: npm run build
Output: dist
Env: VITE_API_URL=https://your-backend.com/api
```

## 📊 Database Schema

### Users Table
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- name (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Books Table
- id (UUID, PK)
- user_id (UUID, FK)
- title (VARCHAR)
- author (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- stock (INTEGER)
- category (VARCHAR)
- image_url (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## 📝 Environment Variables

### Backend (.env)
```
SUPABASE_URL=...
SUPABASE_KEY=...
JWT_SECRET=...
JWT_EXPIRE=86400
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Getting Started

### Quick Start (3 menit)

1. **Clone atau download project**
```bash
cd toko_buku
```

2. **Jalankan setup script**
```bash
# Windows
setup.bat

# Linux/Mac
bash setup.sh
```

3. **Setup Supabase**
   - Buat project di supabase.com
   - Copy URL dan API Key
   - Jalankan SQL dari backend/ORDERS_CREATE_TABLES.sql

4. **Configure environment**
   - Edit backend/.env
   - Edit frontend/.env (jika perlu)

5. **Start aplikasi**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

6. **Buka browser**
```
http://localhost:3000
```

## 📚 Dokumentasi

- [README.md](./README.md) - Project overview
- [QUICKSTART.md](./QUICKSTART.md) - Setup guide
- [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) - API reference
- [backend/AUTH_IMPLEMENTATION.md](./backend/AUTH_IMPLEMENTATION.md) - Auth guide
- [backend/DATABASE_SETUP.md](./backend/DATABASE_SETUP.md) - Database guide

## 🐛 Common Issues

### Cannot GET /api/books
- Backend tidak running
- Check CORS configuration
- Port 5000 sudah digunakan

### Supabase connection failed  
- Check SUPABASE_URL dan SUPABASE_KEY
- Table belum di-create
- Check internet connection

### Token invalid/expired
- Token sudah expired (24 jam)
- Need to login kembali
- Clear localStorage dan refresh

## 🆙 Future Enhancements

- [ ] Advanced search & filters
- [ ] Book reviews & ratings
- [ ] Shopping cart
- [ ] Payment gateway
- [ ] Order management
- [ ] Admin dashboard
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login
- [ ] Real-time notifications

## 📄 License

MIT License - Free untuk keperluan pribadi atau komersial

## 👤 Author

Dibuat untuk platform marketplace buku Indonesia

## 🤝 Support

Jika ada pertanyaan atau issue, silakan buat issue di GitHub atau hubungi developer.

---

**Selamat menggunakan Toko Buku Online! 📚✨**

Happy coding dan semoga sukses dengan bisnismu!
