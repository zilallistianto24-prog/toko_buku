import React from 'react';
import './BookCard.css';

function BookCard({ book, onEdit, onDelete, isOwner }) {
  return (
    <div className="book-card card">
      <div className="book-image">
        {book.image_url ? (
          <img src={book.image_url} alt={book.title} />
        ) : (
          <div className="no-image">📖</div>
        )}
      </div>

      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Penulis: {book.author}</p>
        <p className="book-category">{book.category}</p>

        <p className="book-description">
          {book.description && book.description.substring(0, 100)}
          {book.description && book.description.length > 100 ? '...' : ''}
        </p>

        <div className="book-price">Rp {book.price?.toLocaleString('id-ID') || 0}</div>

        <div className="book-stock">
          Stok: <span className={book.stock > 0 ? 'in-stock' : 'out-stock'}>
            {book.stock}
          </span>
        </div>

        {isOwner && (
          <div className="book-actions">
            <button className="btn btn-primary btn-small" onClick={() => onEdit(book)}>
              ✏️ Edit
            </button>
            <button className="btn btn-danger btn-small" onClick={() => onDelete(book.id)}>
              🗑️ Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
