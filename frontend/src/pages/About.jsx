import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>📚 Tentang Toko Buku Online</h1>
          <p>Kami adalah platform jual-beli buku online yang menghubungkan penulis, penerbit, dan pecinta buku di seluruh Indonesia.</p>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision">
          <div className="mission-item">
            <div className="mission-icon">🎯</div>
            <h3>Misi Kami</h3>
            <p>Membuat buku dapat diakses oleh semua orang dengan harga terjangkau dan proses transaksi yang mudah dan aman.</p>
          </div>

          <div className="mission-item">
            <div className="mission-icon">🌟</div>
            <h3>Visi Kami</h3>
            <p>Menjadi platform e-commerce buku terpercaya dan terlengkap di Indonesia dengan jutaan pembaca yang puas.</p>
          </div>

          <div className="mission-item">
            <div className="mission-icon">💡</div>
            <h3>Komitmen Kami</h3>
            <p>Memberikan pengalaman berbelanja terbaik dengan layanan pelanggan responsif dan koleksi buku yang selalu update.</p>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <h2>Keunggulan Kami</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h4>Pengiriman Cepat</h4>
              <p>Proses pengiriman yang cepat dan aman ke seluruh Indonesia</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h4>Harga Kompetitif</h4>
              <p>Harga terbaik tanpa mengorbankan kualitas produk</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Aman & Terpercaya</h4>
              <p>Sistem keamanan tingkat tinggi untuk melindungi data Anda</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h4>Koleksi Lengkap</h4>
              <p>Ribuan judul buku dari berbagai genre dan penulis terkenal</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h4>Rating & Review</h4>
              <p>Baca ulasan dari pembeli lain untuk membantu keputusan Anda</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h4>Chat Support</h4>
              <p>Tim support kami siap membantu 24/7 menjawab pertanyaan Anda</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="team-section">
          <h2>Tim Kami</h2>
          <p className="team-intro">Kami adalah tim profesional yang berdedikasi untuk memberikan layanan terbaik kepada Anda.</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>Ahmad Suryanto</h4>
              <p>CEO & Founder</p>
              <small>Visioner dalam industri e-commerce buku</small>
            </div>

            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h4>Siti Nurhaliza</h4>
              <p>Head of Operations</p>
              <small>Mengelola operasional dengan efisien</small>
            </div>

            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h4>Budi Setiawan</h4>
              <p>Tech Lead</p>
              <small>Membangun platform teknologi yang robust</small>
            </div>

            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h4>Rina Wijaya</h4>
              <p>Customer Success Manager</p>
              <small>Memastikan kepuasan pelanggan</small>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2>Hubungi Kami</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h4>📧 Email</h4>
              <p>support@tokobukuonline.id</p>
            </div>

            <div className="contact-item">
              <h4>📱 Telepon</h4>
              <p>+62 812-3456-7890</p>
            </div>

            <div className="contact-item">
              <h4>📍 Alamat</h4>
              <p>Jl. Buku Indah No. 123, Jakarta, Indonesia</p>
            </div>

            <div className="contact-item">
              <h4>⏰ Jam Operasional</h4>
              <p>Senin-Jumat: 09:00 - 17:00</p>
              <p>Sabtu-Minggu: Libur</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Pengguna Aktif</p>
          </div>

          <div className="stat-card">
            <h3>50,000+</h3>
            <p>Judul Buku</p>
          </div>

          <div className="stat-card">
            <h3>100,000+</h3>
            <p>Transaksi Sukses</p>
          </div>

          <div className="stat-card">
            <h3>4.8/5</h3>
            <p>Rating Kepuasan</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
