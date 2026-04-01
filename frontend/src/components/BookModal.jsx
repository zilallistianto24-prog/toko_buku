import React, { useState } from 'react';
import './BookModal.css';

function BookModal({ book, onSubmit, onClose }) {
  const [formData, setFormData] = useState(
    book || {
      title: '',
      author: '',
      description: '',
      price: '',
      stock: '',
      category: 'Fiksi',
      image_url: '',
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Penulis wajib diisi';
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Harga harus angka positif';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'Stok tidak boleh negatif';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book ? '✏️ Edit Buku' : '➕ Tambah Buku Baru'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Judul Buku *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul buku"
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Penulis *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Masukkan nama penulis"
            />
            {errors.author && <span className="error">{errors.author}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Harga (Rp) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Contoh: 55000"
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stok</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Contoh: 20"
              />
              {errors.stock && <span className="error">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Fiksi">Fiksi</option>
              <option value="Non-Fiksi">Non-Fiksi</option>
              <option value="Fiksi Fantasi">Fiksi Fantasi</option>
              <option value="Misteri">Misteri</option>
              <option value="Biografi">Biografi</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Anak-anak">Anak-anak</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi buku"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image_url">URL Gambar</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {book ? 'Update Buku' : 'Tambah Buku'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookModal;
