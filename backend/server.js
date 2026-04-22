const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 5000; // Samakan port dengan yang diminta frontend (5000)

app.use(cors()); 
app.use(express.json());

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('profile-minuhu', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// ... (Sisa kode Sequelize kamu yang lama di bawahnya tetap sama)
sequelize.authenticate()
    .then(() => {
        console.log('Sequelize connected successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    console.log('MySQL Connected (XAMPP phpMyAdmin)');


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
    console.log(`Backend running on http://localhost:${PORT}`);
});