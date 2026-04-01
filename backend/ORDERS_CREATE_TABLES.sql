# Database Schema SQL Queries untuk Toko Buku Online

## Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index untuk faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy untuk users
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);
```

## Books Table

```sql
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  image_url TEXT,
  isbn VARCHAR(20),
  pages INTEGER,
  published_year INTEGER,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes untuk faster queries
CREATE INDEX IF NOT EXISTS idx_books_user_id ON books(user_id);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_title ON books USING gin(to_tsvector('english', title));

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

-- Update trigger untuk updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Reviews Table (Optional)

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(book_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_book_id ON reviews(book_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Reviews are publicly readable" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Sample Data / Seed Data

```sql
-- Insert sample users
INSERT INTO users (email, password, name) VALUES
('user1@example.com', '$2a$10$...', 'Rani'),
('user2@example.com', '$2a$10$...', 'Budi')
ON CONFLICT DO NOTHING;

-- Insert sample books
INSERT INTO books (user_id, title, author, description, price, stock, category, image_url) 
SELECT id, 'Laskar Pelangi', 'Andrea Hirata', 'Kisah perjuangan siswa SMP...', 65000, 15, 'Fiksi', 'https://...'
FROM users WHERE email = 'user1@example.com'
ON CONFLICT DO NOTHING;
```

## Useful Queries

### Get books by category
```sql
SELECT * FROM books 
WHERE category = 'Fiksi' 
ORDER BY created_at DESC;
```

### Get user's books
```sql
SELECT * FROM books 
WHERE user_id = 'user-uuid' 
ORDER BY created_at DESC;
```

### Get books with review count
```sql
SELECT b.*, COUNT(r.id) as review_count, AVG(r.rating) as avg_rating
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id
GROUP BY b.id
ORDER BY b.created_at DESC;
```

### Search books
```sql
SELECT * FROM books 
WHERE title ILIKE '%search%' 
  OR author ILIKE '%search%'
ORDER BY created_at DESC;
```

### Get trending books (most viewed)
```sql
SELECT * FROM books 
ORDER BY view_count DESC 
LIMIT 10;
```

### Get user statistics
```sql
SELECT 
  u.id, 
  u.name, 
  COUNT(b.id) as total_books, 
  SUM(b.stock) as total_stock,
  AVG(b.price) as avg_price
FROM users u
LEFT JOIN books b ON u.id = b.user_id
GROUP BY u.id;
```

## Backup & Restore

### Backup Database
```bash
# Gunakan Supabase dashboard untuk backup
# atau gunakan pg_dump jika ada akses direct
pg_dump -h host -U user -d database > backup.sql
```

### Restore Database
```bash
psql -h host -U user -d database < backup.sql
```

## Notes

- Semua table menggunakan UUID primary key untuk distributed systems
- RLS (Row Level Security) diaktifkan untuk security
- Indexes dibuat untuk frequent queries
- Foreign keys menggunakan ON DELETE CASCADE untuk data integrity
- Timestamps (created_at, updated_at) untuk audit trail
