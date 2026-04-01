import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    onLogout();
    setIsMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-brand">
          <h1>📚 Toko Buku Online</h1>
        </div>

        <div className={`navbar-menu ${isMobileOpen ? 'active' : ''}`}>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          <ul className="navbar-links">
            <li><a href="/">Beranda</a></li>
            <li><a href="/#katalog">Katalog</a></li>
            <li><a href="/#tentang">Tentang</a></li>
          </ul>

          <div className="navbar-auth">
            {user ? (
              <div className="user-menu">
                <span className="user-name">👤 {user.name || user.email}</span>
                <button onClick={handleLogout} className="btn btn-danger btn-small">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <a href="/login" className="btn btn-secondary btn-small">
                  Login
                </a>
                <a href="/register" className="btn btn-primary btn-small">
                  Daftar
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          className="hamburger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
