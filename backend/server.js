const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware untuk verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid' });
  }
};

// ==================== BOOK ROUTES ====================

// GET semua buku
app.get('/api/books', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET buku by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Buku tidak ditemukan' });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST tambah buku baru (protected route)
app.post('/api/books', verifyToken, async (req, res) => {
  try {
    const { title, author, description, price, stock, category, image_url } = req.body;

    // Validasi input
    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Judul, penulis, dan harga wajib diisi' });
    }

    const { data, error } = await supabase
      .from('books')
      .insert([{
        title,
        author,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        category,
        image_url,
        user_id: req.userId,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Buku berhasil ditambahkan', data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update buku (protected route)
app.put('/api/books/:id', verifyToken, async (req, res) => {
  try {
    const { title, author, description, price, stock, category, image_url } = req.body;

    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !book) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    if (book.user_id !== req.userId) {
      return res.status(403).json({ error: 'Anda tidak berhak mengubah buku ini' });
    }

    const { data, error } = await supabase
      .from('books')
      .update({
        title,
        author,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json({ message: 'Buku berhasil diupdate', data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE buku (protected route)
app.delete('/api/books/:id', verifyToken, async (req, res) => {
  try {
    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !book) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    if (book.user_id !== req.userId) {
      return res.status(403).json({ error: 'Anda tidak berhak menghapus buku ini' });
    }

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== AUTH ROUTES ====================

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, dan nama wajib diisi' });
    }

    // Check jika user sudah ada
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user ke database
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, name }])
      .select();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Pendaftaran berhasil', 
      user: { id: data[0].id, email: data[0].email, name: data[0].name }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({ 
      message: 'Login berhasil',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGOUT (just send success, token akan dihapus di client)
app.post('/api/auth/logout', verifyToken, (req, res) => {
  res.json({ message: 'Logout berhasil' });
});

// Verify token endpoint
app.get('/api/auth/verify', verifyToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'User tidak ditemukan' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend Toko Buku is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎓 Backend Toko Buku running di port ${PORT}`);
});
