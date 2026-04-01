import React, { useState, useEffect } from 'react';
import BookGrid from '../components/BookGrid';
import BookModal from '../components/BookModal';
import * as api from '../api';
import './Catalog.css';

function Catalog({ user }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [sortBy, setSortBy] = useState('terbaru');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, categoryFilter, sortBy]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await api.getBooks();
      setBooks(data);
      setError('');
    } catch (err) {
      setError('Gagal memuat katalog buku');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (categoryFilter !== 'Semua') {
      filtered = filtered.filter((book) => book.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case 'termurah':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'termahal':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'judul':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'penulis':
        filtered.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'terbaru':
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    setFilteredBooks(filtered);
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

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="container">
          <div className="loading-state">
            <p>Memuat katalog buku...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Header */}
        <section className="catalog-hero">
          <h1>📖 Katalog Buku</h1>
          <p>Jelajahi ribuan judul buku dari berbagai penulis dan genre</p>
        </section>

        {/* Error Alert */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Filters & Search */}
        <section className="catalog-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Cari judul, penulis, atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box"
            />
          </div>

          <div className="filter-group">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="terbaru">Terbaru</option>
              <option value="termurah">Termurah</option>
              <option value="termahal">Termahal</option>
              <option value="judul">Judul (A-Z)</option>
              <option value="penulis">Penulis (A-Z)</option>
            </select>
          </div>

          {user && (
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingBook(null);
                setShowModal(true);
              }}
            >
              ➕ Tambah Buku
            </button>
          )}
        </section>

        {/* Results Info */}
        <div className="results-header">
          <p className="results-count">
            Menampilkan <strong>{filteredBooks.length}</strong> dari <strong>{books.length}</strong> buku
          </p>
          {searchQuery && (
            <button 
              className="btn-clear"
              onClick={() => setSearchQuery('')}
            >
              ✕ Hapus pencarian
            </button>
          )}
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <BookGrid
            books={filteredBooks}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
            userId={user?.id}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>Buku Tidak Ditemukan</h3>
            <p>
              {searchQuery
                ? `Tidak ada buku yang sesuai dengan pencarian "${searchQuery}"`
                : 'Koleksi buku masih kosong. Mulai tambahkan buku sekarang!'}
            </p>
            {searchQuery && (
              <button 
                className="btn btn-primary"
                onClick={() => setSearchQuery('')}
              >
                Bersihkan Pencarian
              </button>
            )}
          </div>
        )}

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

export default Catalog;
