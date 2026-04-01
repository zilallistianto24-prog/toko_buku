const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const sampleBooks = [
  {
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    description: 'Kisah perjuangan sekelompok siswa miskin di SMP Negeri Gantung, Belitong, Pulau Bangka yang berdedikasi mengejar pendidikan dan mewujudkan mimpi mereka.',
    price: 65000,
    stock: 20,
    category: 'Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B008KQFQ9C.01.L.jpg'
  },
  {
    title: 'Pulang',
    author: 'Leila S. Chudori',
    description: 'Novel seputar kehidupan sebuah keluarga Indonesia yang berada di pengasingan selama puluhan tahun akibat peristiwa 1965.',
    price: 75000,
    stock: 15,
    category: 'Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B018OJMVGE.01.L.jpg'
  },
  {
    title: 'Bumi',
    author: 'Tere Liye',
    description: 'Trilogi Bumi menceritakan tentang sebuah dunia alternatif dengan aturan alam yang berbeda, penuh dengan misteri dan petualangan.',
    price: 50000,
    stock: 25,
    category: 'Fiksi Fantasi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B00WLC1PAE.01.L.jpg'
  },
  {
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    description: 'Buku yang menggabungkan filosofi Yunani kuno dengan kehidupan modern untuk menghadapi tekanan psikologis dan stres.',
    price: 85000,
    stock: 12,
    category: 'Non-Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B07QQ5VQVT.01.L.jpg'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Panduan praktis tentang cara membentuk kebiasaan baik, menghilangkan kebiasaan buruk, dan menguasai perilaku kecil untuk hasil luar biasa.',
    price: 125000,
    stock: 18,
    category: 'Self-Help',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B07D23CFGR.01.L.jpg'
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    description: 'Perjalanan manusia dari masa lalu hingga masa kini, menggali akar peradaban dan memahami bagaimana kita menjadi seperti saat ini.',
    price: 95000,
    stock: 14,
    category: 'Non-Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B00WBVW9PE.01.L.jpg'
  },
  {
    title: 'Pergi',
    author: 'Tere Liye',
    description: 'Novel tentang petualangan seorang gadis muda yang pergi meninggalkan segalanya untuk menemukan diri sejatinya.',
    price: 70000,
    stock: 16,
    category: 'Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B07HCDY7K6.01.L.jpg'
  },
  {
    title: 'Sebuah Seni Untuk Bersantai',
    author: 'Sarah Knight',
    description: 'Seni menangani segala sesuatu dengan santai namun tetap produktif dan efisien mencapai tujuan hidup.',
    price: 72000,
    stock: 11,
    category: 'Self-Help',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B072NXQT16.01.L.jpg'
  },
  {
    title: 'Negeri Para Bedebah',
    author: 'Tere Liye',
    description: 'Dunia fantasi yang menakjubkan dengan karakter yang kompleks dan plot yang penuh kejutan.',
    price: 68000,
    stock: 19,
    category: 'Fiksi Fantasi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B07D88MK63.01.L.jpg'
  },
  {
    title: 'Thinking Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'Penjelajahan tentang bagaimana pikiran kita bekerja, keputusan yang kita buat, dan bias kognitif yang mempengaruhi pilihan kita.',
    price: 110000,
    stock: 9,
    category: 'Non-Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B00555X8OA.01.L.jpg'
  },
  {
    title: 'Hujan',
    author: 'Tere Liye',
    description: 'Kisah seorang gadis dengan kehidupan yang penuh misteri dan rahasia tersembunyi.',
    price: 55000,
    stock: 21,
    category: 'Fiksi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B073YL4CQX.01.L.jpg'
  },
  {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    description: 'Metodologi revolusioner untuk membangun bisnis startup dengan cycle develop-measure-learn yang cepat dan efisien.',
    price: 115000,
    stock: 8,
    category: 'Bisnis',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B004J4XGN6.01.L.jpg'
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    description: 'Petualangan seorang anak laki-laki penyihir di sekolah sihir Hogwarts yang penuh dengan misteri dan keajaiban.',
    price: 89000,
    stock: 17,
    category: 'Fiksi Fantasi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B0192CTPYG.01.L.jpg'
  },
  {
    title: 'Sherlock Holmes: A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    description: 'Misteri pembunuhan pertama yang menampilkan detektif jenius Sherlock Holmes dan dokter Watson.',
    price: 65000,
    stock: 13,
    category: 'Misteri',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B004OQOV1E.01.L.jpg'
  },
  {
    title: 'Habis Gelap Terbitlah Terang',
    author: 'R.A. Kartini',
    description: 'Surat-surat pribadi R.A. Kartini yang menggambarkan perjuangannya untuk emansipasi wanita di era kolonial.',
    price: 72000,
    stock: 10,
    category: 'Biografi',
    image_url: 'https://images-na.ssl-images-amazon.com/images/P/B00C8Q9VGW.01.L.jpg'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Memulai seeding database...\n');

    // Get first user to assign as book owner
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('id')
      .limit(1)
      .single();

    if (userError || !users) {
      console.log('⚠️  User belum ada. Silakan register terlebih dahulu di aplikasi.');
      console.log('📝 Atau buat user dummy untuk testing:');
      console.log('   Jalankan query SQL untuk insert user terlebih dahulu.\n');
      return;
    }

    const userId = users.id;
    console.log(`✅ Menggunakan user ID: ${userId}\n`);

    // Insert sample books
    const booksWithUserId = sampleBooks.map(book => ({
      ...book,
      user_id: userId,
      created_at: new Date().toISOString()
    }));

    const { data: insertedBooks, error: insertError } = await supabase
      .from('books')
      .insert(booksWithUserId)
      .select();

    if (insertError) {
      console.error('❌ Error saat insert buku:', insertError.message);
      return;
    }

    console.log(`✅ Berhasil menambahkan ${insertedBooks.length} buku!\n`);
    
    console.log('📚 Daftar buku yang ditambahkan:\n');
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title}`);
      console.log(`   Penulis: ${book.author}`);
      console.log(`   Harga: Rp ${book.price.toLocaleString('id-ID')}`);
      console.log(`   Kategori: ${book.category}`);
      console.log(`   Stok: ${book.stock}\n`);
    });

    console.log('✨ Seeding selesai! Buku siap ditampilkan di aplikasi.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedDatabase();
