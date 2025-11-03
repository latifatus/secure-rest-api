const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'aurora-secret-key'; // nanti bisa pindah ke .env

// simulasi user (biasanya dari database)
const userData = {
  email: 'aurora@example.com',
  password: '123456'
};

// route login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === userData.email && password === userData.password) {
    // buat token JWT
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login berhasil!', token });
  } else {
    res.status(401).json({ message: 'Email atau password salah!' });
  }
});

module.exports = router;
