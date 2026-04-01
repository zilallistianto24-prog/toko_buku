import React from 'react';
import BookCard from './BookCard';
import './BookGrid.css';

function BookGrid({ books, onEdit, onDelete, userId, loading }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Memuat buku...</span>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center empty-state">
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</p>
        <h3>Belum ada buku</h3>
        <p>Mulai tambahkan buku pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="book-grid grid grid-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          isOwner={book.user_id === userId}
        />
      ))}
    </div>
  );
}

export default BookGrid;
