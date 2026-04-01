# Database Setup untuk Toko Buku Online

## 1. Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index untuk faster queries
CREATE INDEX idx_users_email ON users(email);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy untuk users
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);
```

## 2. Books Table

```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index untuk faster queries
CREATE INDEX idx_books_user_id ON books(user_id);
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_created_at ON books(created_at);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Books are publicly readable" ON books
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own books" ON books
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own books" ON books
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own books" ON books
  FOR DELETE USING (auth.uid()::text = user_id::text);
```

## 3. Sample Data (Buku-buku Populer Indonesia)

```sql
-- Insert sample books
INSERT INTO books (user_id, title, author, description, price, stock, category, image_url)
VALUES
  (
    (SELECT id FROM users LIMIT 1),
    'Laskar Pelangi',
    'Andrea Hirata',
    'Kisah perjuangan sekelompok siswa SMP di sebuah daerah terpencil di Belitong untuk meraih mimpi mereka.',
    65000,
    15,
    'Fiksi',
    'https://images-na.ssl-images-amazon.com/images/P/B008KQFQ9C.01.L.jpg'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Pulang',
    'Leila S. Chudori',
    'Novel seputar kehidupan sebuah keluarga Indonesia di pengasingan selama puluhan tahun.',
    75000,
    10,
    'Fiksi',
    'https://images-na.ssl-images-amazon.com/images/P/B018OJMVGE.01.L.jpg'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Bumi',
    'Tere Liye',
    'Trilogi tentang sebuah dunia alternatif dengan aturan alam yang berbeda.',
    50000,
    20,
    'Fiksi Fantasi',
    'https://images-na.ssl-images-amazon.com/images/P/B00WLC1PAE.01.L.jpg'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Filosofi Teras',
    'Henry Manampiring',
    'Buku yang menggabungkan filosofi Yunani kuno dengan kehidupan modern.',
    85000,
    12,
    'Non-fiksi',
    'https://images-na.ssl-images-amazon.com/images/P/B07QQ5VQVT.01.L.jpg'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Atomic Habits',
    'James Clear',
    'Panduan tentang cara membentuk dan mengubah kebiasaan untuk hasil yang luar biasa.',
    125000,
    8,
    'Self-Help',
    'https://images-na.ssl-images-amazon.com/images/P/B07D23CFGR.01.L.jpg'
  );
```

## 4. Koneksi di Backend

Pastikan environment variables di file `.env` sudah benar:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key_here
```

## 5. Testing Koneksi

### Test dari terminal (Linux/Mac):

```bash
# Test GET all books
curl http://localhost:5000/api/books

# Test GET book by ID
curl http://localhost:5000/api/books/1

# Test Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Test Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## Catatan Penting

1. **RLS (Row Level Security)**: Pastikan untuk enable RLS di Supabase untuk security
2. **Index**: Index membantuquery lebih cepat, terutama untuk table yang besar
3. **Foreign Keys**: Relationship antara users dan books dijaga dengan foreign key
4. **Timestamps**: created_at dan updated_at membantu tracking kapan data dibuat/diubah

## Troubleshooting

**Error: "permission denied for schema public"**
- Pastikan user Supabase memiliki permission yang cukup
- Login ke Supabase dashboard dan setup RLS policy yang benar

**Error: "relation does not exist"**
- Pastikan table sudah di-create
- Cek nama table dan column di Supabase dashboard

**Error: "duplicate key value"**
- Ada constraint unique yang duplikat
- Periksa email yang digunakan sudah terdaftar atau tidak
