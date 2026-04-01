# Dokumentasi Implementasi Authentication di Toko Buku Online

## Gambaran Umum

Sistem authentication menggunakan JWT (JSON Web Tokens) dengan bcryptjs untuk hashing password.

## Flow Authentication

```
User (Frontend)
    ↓
    Register/Login (POST /api/auth/register atau /api/auth/login)
    ↓
Backend menerima email & password
    ↓
Hash password dengan bcryptjs
    ↓
Simpan ke Supabase (register) atau verify (login)
    ↓
Buat JWT token
    ↓
Return token ke frontend
    ↓
Frontend menyimpan token di localStorage
    ↓
Token ditambahkan di setiap request (Authorization header)
    ↓
Backend verify token sebelum akses resource
```

## Implementasi di Backend

### 1. Register Endpoint

**POST** `/api/auth/register`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response Sukses (201):
```json
{
  "message": "Pendaftaran berhasil",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

Response Error:
```json
{
  "error": "Email sudah terdaftar"
}
```

### 2. Login Endpoint

**POST** `/api/auth/login`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response Sukses (200):
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 3. Logout Endpoint

**POST** `/api/auth/logout`

Header:
```
Authorization: Bearer {token}
```

Response (200):
```json
{
  "message": "Logout berhasil"
}
```

### 4. Verify Token Endpoint

**GET** `/api/auth/verify`

Header:
```
Authorization: Bearer {token}
```

Response Sukses (200):
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Implementasi di Frontend

### 1. Menyimpan Token

```javascript
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));
```

### 2. Mengirim Token di Setiap Request

```javascript
const token = localStorage.getItem('token');
headers.Authorization = `Bearer ${token}`;
```

Implementasi di `api.js`:
```javascript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. Logout

```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## Security Considerations

1. **Password Hashing**: Menggunakan bcryptjs untuk hash password
2. **JWT Secret**: Pastikan JWT_SECRET minimal 32 karakter dan di-store di .env
3. **HTTPS**: Gunakan HTTPS di production
4. **Token Expiry**: Token expire dalam 24 jam (JWT_EXPIRE)
5. **RLS Policy**: Enable RLS di Supabase untuk extra security

## Error Handling

### Common Errors

1. **"Email sudah terdaftar"** (400)
   - User mencoba register dengan email yang sudah ada
   
2. **"Email atau password salah"** (401)
   - Email tidak ditemukan atau password tidak cocok
   
3. **"Token tidak valid"** (401)
   - Token expired atau malformed
   
4. **"Token tidak ditemukan"** (401)
   - Request tanpa Authorization header untuk protected route

## Testing Authentication

### Test Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Route (dengan token)

```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Environment Variables

```
JWT_SECRET=your_very_long_secret_key_min_32_characters
JWT_EXPIRE=86400
```

## Best Practices

1. ✅ Selalu hash password sebelum menyimpan
2. ✅ Validate email format
3. ✅ Gunakan HTTPS untuk transmisi token
4. ✅ Store token di localStorage (atau sessionStorage untuk lebih aman)
5. ✅ Clear token saat logout
6. ✅ Refresh token jika expired
7. ✅ Jangan expose JWT_SECRET di frontend

## Referensi

- [JWT Documentation](https://jwt.io/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [OWASP Security Best Practices](https://owasp.org/www-project-authentication-cheat-sheet/)
