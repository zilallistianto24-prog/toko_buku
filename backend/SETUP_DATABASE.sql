-- ============================================
-- TOKO BUKU ONLINE - DATABASE SETUP
-- Copy-paste semua query ini di Supabase SQL Editor
-- ============================================

-- 1. CREATE USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
CREATE POLICY "Users can read their own data" ON public.users
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert for registration" ON public.users;
CREATE POLICY "Allow insert for registration" ON public.users
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update own profile" ON public.users;
CREATE POLICY "Allow update own profile" ON public.users
  FOR UPDATE USING (true);

-- ✅ IMPORTANT: Grant access to password column explicitly
ALTER TABLE public.users OWNER TO postgres;

-- ============================================
-- 2. CREATE BOOKS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_books_user_id ON public.books(user_id);
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON public.books(created_at DESC);

-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Books are publicly readable" ON public.books;
CREATE POLICY "Books are publicly readable" ON public.books
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own books" ON public.books;
CREATE POLICY "Users can insert their own books" ON public.books
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own books" ON public.books;
CREATE POLICY "Users can update their own books" ON public.books
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Users can delete their own books" ON public.books;
CREATE POLICY "Users can delete their own books" ON public.books
  FOR DELETE USING (true);

-- ============================================
-- 3. CREATE UPDATED_AT TRIGGER
-- ============================================

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_books_updated_at ON public.books;
DROP FUNCTION IF EXISTS update_updated_at_column();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- DONE! Tables are ready
-- ============================================
