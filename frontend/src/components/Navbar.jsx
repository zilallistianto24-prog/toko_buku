import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <h1>📚 Toko Buku</h1>
        </div>

        {/* Menu Button (Mobile Only) */}
        <button
          className={`navbar-toggle ${isMobileOpen ? 'active' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Content */}
        <div className={`navbar-menu ${isMobileOpen ? 'active' : ''}`}>
          {/* Navigation Links */}
          <ul className="navbar-links">
            <li><a href="/">Beranda</a></li>
            <li><a href="/katalog">Katalog</a></li>
            <li><a href="/tentang">Tentang</a></li>
          </ul>

          {/* Search Bar */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Cari buku..."
              className="search-input"
            />
            <button className="search-btn" title="Search">
              🔍
            </button>
          </div>

          {/* Auth Section */}
          <div className="navbar-auth">
            {user ? (
              <div className="user-menu">
                <span className="user-name">👤 {user.name || user.email}</span>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <a href="/login" className="btn btn-login">
                  Login
                </a>
                <a href="/register" className="btn btn-register">
                  Daftar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
