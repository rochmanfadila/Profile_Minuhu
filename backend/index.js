const express = require('express');
const app = express();
const port = 3000;

// Middleware agar backend bisa baca data JSON
app.use(express.json());

const { Sequelize, DataTypes } = require('sequelize');

// 1. Konfigurasi Koneksi (Database, Username, Password, Host)
const sequelize = new Sequelize('profile-minuhu', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// 2. Membuat "Schema" atau Model User
const User = sequelize.define('User', {
    // MySQL otomatis buat ID, tapi kita definisikan agar konsisten dengan latihan sebelumnya
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// 3. Sinkronisasi dengan Database
sequelize.sync()
    .then(() => console.log('Tabel User telah dibuat/sinkron.'))
    .catch(err => console.log('Gagal sinkron database:', err));

// Endpoint untuk menambah data (CREATE)
app.post('/api/users', (req, res) => {
    const userBaru = req.body;
    users.push(userBaru);
    res.status(201).send("User berhasil ditambah!");
});

// Endpoint Ambil Data (SELECT * FROM Users)
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Endpoint Tambah Data (INSERT INTO Users)
app.post('/api/users', async (req, res) => {
    try {
        const userBaru = await User.create({
            nama: req.body.nama
        });
        res.status(201).send(`User ${userBaru.nama} berhasil disimpan ke MySQL!`);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});