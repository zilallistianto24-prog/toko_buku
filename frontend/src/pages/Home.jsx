import React, { useState, useEffect } from 'react';
import BookGrid from '../components/BookGrid';
import BookModal from '../components/BookModal';
import * as api from '../api';
import './Home.css';

function Home({ user }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, categoryFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await api.getBooks();
      setBooks(data);
      setError('');
    } catch (err) {
      setError('Gagal memuat buku');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'Semua') {
      filtered = filtered.filter((book) => book.category === categoryFilter);
    }

    setFilteredBooks(filtered);
  };

  const handleAddBook = () => {
    if (!user) {
      setError('Silakan login terlebih dahulu');
      return;
    }
    setEditingBook(null);
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Yakin ingin menghapus buku ini?')) {
      return;
    }

    try {
      await api.deleteBook(bookId);
      setBooks((prev) => prev.filter((book) => book.id !== bookId));
      setError('');
    } catch (err) {
      setError('Gagal menghapus buku');
      console.error(err);
    }
  };

  const handleSaveBook = async (formData) => {
    try {
      if (editingBook) {
        await api.updateBook(editingBook.id, formData);
        setBooks((prev) =>
          prev.map((book) =>
            book.id === editingBook.id ? { ...book, ...formData } : book
          )
        );
      } else {
        const { data } = await api.createBook(formData);
        setBooks((prev) => [data, ...prev]);
      }
      setShowModal(false);
      setEditingBook(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal menyimpan buku');
      console.error(err);
    }
  };

  const categories = ['Semua', ...new Set(books.map((book) => book.category))];

  return (
    <div className="home">
      <div className="container">
        {/* Header */}
        <section className="hero">
          <h1>📚 Toko Buku Online</h1>
          <p>Jelajahi koleksi buku terlengkap dengan harga terbaik</p>
        </section>

        {/* Error Alert */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Controls */}
        <section className="controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Cari buku atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box"
            />
          </div>

          <div className="filter-section">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="category-filter"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {user && (
            <button className="btn btn-primary" onClick={handleAddBook}>
              ➕ Tambah Buku
            </button>
          )}
        </section>

        {/* Results Count */}
        {!loading && (
          <div className="results-info">
            <p>Menampilkan {filteredBooks.length} dari {books.length} buku</p>
          </div>
        )}

        {/* Books Grid */}
        <BookGrid
          books={filteredBooks}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          userId={user?.id}
          loading={loading}
        />

        {/* Modal */}
        {showModal && (
          <BookModal
            book={editingBook}
            onSubmit={handleSaveBook}
            onClose={() => {
              setShowModal(false);
              setEditingBook(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
