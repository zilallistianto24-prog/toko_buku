# API Dokumentasi Lengkap - Toko Buku Online

## Base URL

```
http://localhost:5000/api
```

atau untuk production:
```
https://your-backend-url/api
```

## Autentikasi

Semua request yang memerlukan autentikasi harus menyertakan header:

```
Authorization: Bearer {token}
```

Token didapatkan saat login dan berlaku selama 24 jam.

---

## Endpoints

### 🔐 Authentication Endpoints

#### 1. Register User

**POST** `/auth/register`

Membuat akun user baru.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response Sukses (201):**
```json
{
  "message": "Pendaftaran berhasil",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response Error (400):**
```json
{
  "error": "Email sudah terdaftar"
}
```

**Error Handling:**
- `400` - Email, password, atau nama tidak lengkap
- `400` - Email sudah terdaftar

---

#### 2. Login User

**POST** `/auth/login`

Melakukan log in dan mendapatkan token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Sukses (200):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response Error (401):**
```json
{
  "error": "Email atau password salah"
}
```

**Error Handling:**
- `400` - Email atau password kosong
- `401` - Email tidak ditemukan atau password salah

---

#### 3. Logout User

**POST** `/auth/logout`

Log out dan invalidate token.

**Headers:**
```
Authorization: Bearer {token}
```

**Response Sukses (200):**
```json
{
  "message": "Logout berhasil"
}
```

**Error Handling:**
- `401` - Token tidak valid atau expired

---

#### 4. Verify Token

**GET** `/auth/verify`

Verifikasi token dan dapatkan data user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response Sukses (200):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Handling:**
- `401` - Token tidak ditemukan atau tidak valid

---

### 📚 Books Endpoints

#### 1. Get All Books

**GET** `/books`

Mendapatkan semua buku.

**Query Parameters (Optional):**
```
?category=Fiksi&sort=newest
```

**Response Sukses (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "description": "Kisah perjuangan siswa SMP...",
    "price": 65000,
    "stock": 15,
    "category": "Fiksi",
    "image_url": "https://...",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  ...
]
```

**Response Error (500):**
```json
{
  "error": "Error message"
}
```

---

#### 2. Get Book by ID

**GET** `/books/:id`

Mendapatkan detail buku spesifik.

**URL Parameters:**
- `id` (string, required) - UUID buku

**Response Sukses (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "description": "Kisah perjuangan siswa SMP...",
  "price": 65000,
  "stock": 15,
  "category": "Fiksi",
  "image_url": "https://...",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Error Handling:**
- `404` - Buku tidak ditemukan
- `500` - Server error

---

#### 3. Create Book

**POST** `/books`

Membuat buku baru (hanya untuk user yang login).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "description": "Kisah perjuangan siswa SMP...",
  "price": 65000,
  "stock": 15,
  "category": "Fiksi",
  "image_url": "https://..."
}
```

**Response Sukses (201):**
```json
{
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    ...
  }
}
```

**Error Handling:**
- `400` - Judul, penulis, atau harga tidak diisi
- `401` - Token tidak valid atau tidak ada
- `500` - Server error

---

#### 4. Update Book

**PUT** `/books/:id`

Mengupdate buku (hanya pemilik buku).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**URL Parameters:**
- `id` (string, required) - UUID buku

**Request Body:**
```json
{
  "title": "Laskar Pelangi (Edisi Terbaru)",
  "author": "Andrea Hirata",
  "description": "Deskripsi yang diupdate",
  "price": 75000,
  "stock": 20,
  "category": "Fiksi",
  "image_url": "https://..."
}
```

**Response Sukses (200):**
```json
{
  "message": "Buku berhasil diupdate",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    ...
  }
}
```

**Error Handling:**
- `403` - Anda tidak berhak mengubah buku ini
- `404` - Buku tidak ditemukan
- `401` - Token tidak valid
- `500` - Server error

---

#### 5. Delete Book

**DELETE** `/books/:id`

Menghapus buku (hanya pemilik buku).

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id` (string, required) - UUID buku

**Response Sukses (200):**
```json
{
  "message": "Buku berhasil dihapus"
}
```

**Error Handling:**
- `403` - Anda tidak berhak menghapus buku ini
- `404` - Buku tidak ditemukan
- `401` - Token tidak valid
- `500` - Server error

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request berhasil |
| 201 | Created - Resource berhasil dibuat |
| 400 | Bad Request - Input tidak valid |
| 401 | Unauthorized - Token tidak valid/expired |
| 403 | Forbidden - Tidak ada permission |
| 404 | Not Found - Resource tidak ditemukan |
| 500 | Internal Server Error |

---

## Error Response Format

Semua error response mengikuti format:

```json
{
  "error": "Deskripsi error"
}
```

---

## Example Requests dengan cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get All Books

```bash
curl http://localhost:5000/api/books
```

### Create Book (dengan token)

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."

curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "description": "Kisah perjuangan siswa SMP",
    "price": 65000,
    "stock": 15,
    "category": "Fiksi",
    "image_url": "https://..."
  }'
```

---

## Rate Limiting

Tidak ada rate limiting saat development, tapi di production sebaiknya implementasikan.

---

## CORS

CORS diaktifkan untuk:
```
Origin: http://localhost:3000
```

Di production ubah dengan domain frontend yang sebenarnya.

---

## Dokumentasi Lebih Lanjut

- [Express Documentation](https://expressjs.com/)
- [JWT Guide](https://jwt.io/)
- [Supabase Guide](https://supabase.com/docs)
