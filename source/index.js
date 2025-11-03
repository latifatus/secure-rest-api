// ==== Import Library & Konfigurasi Awal ====
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const verifyToken = require('./verifyToken');

const app = express();

// ==== Middleware ====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ==== Route Utama (Halaman Login) ====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ==== Route Login - Kirim Token JWT ====
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulasi user dari “database”
  if (email === 'aurora@example.com' && password === '123456') {
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.SECRET_KEY,
      { expiresIn: '5m' } //masa aktif token
    );
    return res.json({ token });
  }

  res.status(401).json({ message: 'Email atau password salah!' });
});

// ==== Route Profile - Hanya untuk Token Valid ====
app.get('/profile', verifyToken, (req, res) => {
  res.json({
    email: req.user.email,
    role: req.user.role,
    message: 'Berhasil mengakses profil aman 🚀'
  });
});

// ==== Route Fallback (jika URL salah) ====
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// ==== Jalankan Server ====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
