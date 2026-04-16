const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection (XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_profile'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('✅ MySQL Connected (XAMPP phpMyAdmin)');
});

// TEST ROUTE
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend Node.js + MySQL OK!' });
});

// Get Profil Sekolah
app.get('/api/profil', (req, res) => {
    const sql = 'SELECT * FROM profil_sekolah ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get Berita
app.get('/api/berita', (req, res) => {
    const sql = 'SELECT * FROM berita ORDER BY created_at DESC LIMIT 10';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});