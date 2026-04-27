const express = require('express');
const app = express();
const cors = require('cors'); // 1. Tambahkan ini
const port = 5000;

app.use(cors()); // 2. Tambahkan ini
app.use(express.json());

const { Sequelize, DataTypes } = require('sequelize');

// Koneksi Database
const sequelize = process.env.MYSQL_URL 
  ? new Sequelize(process.env.MYSQL_URL, { 
      logging: false,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      process.env.MYSQLDATABASE || 'profile_minuhu',
      process.env.MYSQLUSER || 'root',
      process.env.MYSQLPASSWORD || '',
      {
        host: process.env.MYSQLHOST || 'localhost',
        port: process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        logging: false,
      }
    );

//Fungsi Konversi WIB 
const toWIB = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

//Model 
const Berita = sequelize.define('Berita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Judul tidak boleh kosong' } }
    },
    isi_berita: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: { msg: 'Isi berita tidak boleh kosong' } }
    },
    gambar: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'berita',
    timestamps: true,
    underscored: true
});

const Kategori = sequelize.define('Kategori', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama_kategori: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'kategori', timestamps: true, underscored: true });

const KontakSekolah = sequelize.define('KontakSekolah', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jenis: { type: DataTypes.STRING, allowNull: false },  // contoh: telepon, email, alamat
    nilai: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'kontak_sekolah', timestamps: true, underscored: true });

const ProfileMinuhu = sequelize.define('ProfileMinuhu', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama_sekolah: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT, allowNull: true },
    visi: { type: DataTypes.TEXT, allowNull: true },
    misi: { type: DataTypes.TEXT, allowNull: true },
    logo: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'profile_minuhu', timestamps: true, underscored: true });

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' }
}, { tableName: 'users', timestamps: true, underscored: true });


//Sinkronisasi 
sequelize.sync()
    .then(() => console.log('Database tersinkron.'))
    .catch(err => console.error('Gagal sinkron:', err));

//ROUTES BERITA 

app.get('/api/berita', async (req, res, next) => {
    try {
        const data = await Berita.findAll({ order: [['created_at', 'DESC']] });
        const dataWIB = data.map(item => ({
            ...item.toJSON(),
            createdAt: toWIB(item.createdAt),
            updatedAt: toWIB(item.updatedAt),
        }));
        res.json({ success: true, total: dataWIB.length, data: dataWIB });
    } catch (err) {
        next(err);
    }
});

app.get('/api/berita/:id', async (req, res, next) => {
    try {
        const berita = await Berita.findByPk(req.params.id);
        if (!berita) {
            return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
        }
        const dataWIB = {
            ...berita.toJSON(),
            createdAt: toWIB(berita.createdAt),
            updatedAt: toWIB(berita.updatedAt),
        };
        res.json({ success: true, data: dataWIB });
    } catch (err) {
        next(err);
    }
});

app.post('/api/berita', async (req, res, next) => {
    try {
        const { judul, isi_berita, gambar } = req.body;
        const beritaBaru = await Berita.create({ judul, isi_berita, gambar });
        const dataWIB = {
            ...beritaBaru.toJSON(),
            createdAt: toWIB(beritaBaru.createdAt),
            updatedAt: toWIB(beritaBaru.updatedAt),
        };
        res.status(201).json({ success: true, message: 'Berita berhasil ditambahkan!', data: dataWIB });
    } catch (err) {
        next(err);
    }
});

app.put('/api/berita/:id', async (req, res, next) => {
    try {
        const berita = await Berita.findByPk(req.params.id);
        if (!berita) {
            return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
        }
        const { judul, isi_berita, gambar } = req.body;
        await berita.update({ judul, isi_berita, gambar });
        const dataWIB = {
            ...berita.toJSON(),
            createdAt: toWIB(berita.createdAt),
            updatedAt: toWIB(berita.updatedAt),
        };
        res.json({ success: true, message: 'Berita berhasil diperbarui!', data: dataWIB });
    } catch (err) {
        next(err);
    }
});

app.delete('/api/berita/:id', async (req, res, next) => {
    try {
        const berita = await Berita.findByPk(req.params.id);
        if (!berita) {
            return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
        }
        await berita.destroy();
        res.json({ success: true, message: 'Berita berhasil dihapus!' });
    } catch (err) {
        next(err);
    }
});

app.get('/api/kategori', async (req, res, next) => {
    try {
        const data = await Kategori.findAll();
        res.json({ success: true, total: data.length, data });
    } catch (err) { next(err); }
});

app.post('/api/kategori', async (req, res, next) => {
    try {
        const data = await Kategori.create(req.body);
        res.status(201).json({ success: true, message: 'Kategori berhasil ditambahkan!', data });
    } catch (err) { next(err); }
});

app.put('/api/kategori/:id', async (req, res, next) => {
    try {
        const item = await Kategori.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
        await item.update(req.body);
        res.json({ success: true, message: 'Kategori berhasil diperbarui!', data: item });
    } catch (err) { next(err); }
});

app.delete('/api/kategori/:id', async (req, res, next) => {
    try {
        const item = await Kategori.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
        await item.destroy();
        res.json({ success: true, message: 'Kategori berhasil dihapus!' });
    } catch (err) { next(err); }
});


// ROUTES KONTAK SEKOLAH 

app.get('/api/kontak', async (req, res, next) => {
    try {
        const data = await KontakSekolah.findAll();
        res.json({ success: true, data });
    } catch (err) { next(err); }
});

app.post('/api/kontak', async (req, res, next) => {
    try {
        const data = await KontakSekolah.create(req.body);
        res.status(201).json({ success: true, message: 'Kontak berhasil ditambahkan!', data });
    } catch (err) { next(err); }
});

app.put('/api/kontak/:id', async (req, res, next) => {
    try {
        const item = await KontakSekolah.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Kontak tidak ditemukan' });
        await item.update(req.body);
        res.json({ success: true, message: 'Kontak berhasil diperbarui!', data: item });
    } catch (err) { next(err); }
});

app.delete('/api/kontak/:id', async (req, res, next) => {
    try {
        const item = await KontakSekolah.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Kontak tidak ditemukan' });
        await item.destroy();
        res.json({ success: true, message: 'Kontak berhasil dihapus!' });
    } catch (err) { next(err); }
});

// ROUTES PROFILE SEKOLAH
// Hanya satu data profile, jadi pakai findOne

app.get('/api/profile', async (req, res, next) => {
    try {
        const data = await ProfileMinuhu.findOne();
        res.json({ success: true, data });
    } catch (err) { next(err); }
});

app.post('/api/profile', async (req, res, next) => {
    try {
        const data = await ProfileMinuhu.create(req.body);
        res.status(201).json({ success: true, message: 'Profile berhasil disimpan!', data });
    } catch (err) { next(err); }
});

app.put('/api/profile/:id', async (req, res, next) => {
    try {
        const item = await ProfileMinuhu.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Profile tidak ditemukan' });
        await item.update(req.body);
        res.json({ success: true, message: 'Profile berhasil diperbarui!', data: item });
    } catch (err) { next(err); }
});


// ROUTES USERS 

app.get('/api/users', async (req, res, next) => {
    try {
        // Jangan tampilkan password
        const data = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json({ success: true, total: data.length, data });
    } catch (err) { next(err); }
});

app.post('/api/users', async (req, res, next) => {
    try {
        const { nama, email, password, role } = req.body;
        const data = await User.create({ nama, email, password, role });
        res.status(201).json({ success: true, message: 'User berhasil dibuat!', data });
    } catch (err) { next(err); }
});

app.delete('/api/users/:id', async (req, res, next) => {
    try {
        const item = await User.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
        await item.destroy();
        res.json({ success: true, message: 'User berhasil dihapus!' });
    } catch (err) { next(err); }
});

//Global Error Handler 
app.use((err, req, res, next) => {
    console.error('Error:', err.message);

    if (err.name === 'SequelizeValidationError') {
        const pesan = err.errors.map(e => e.message);
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors: pesan });
    }

    res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: err.message });
});

// JANGAN dikunci di port 5000 saja
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di port ${PORT}`);
});