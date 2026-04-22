const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 5000  // ← tambahkan ini
});

  // Data admin yang mau dibuat
  const adminData = {
    nama: 'Administrator',
    email: 'admin@smkn12malang.sch.id',
    password: 'admin123',  // ganti dengan password kamu
    role: 'admin'
  };

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

  // Insert ke database
  const query = `
    INSERT INTO users (nama, email, password, role, is_active) 
    VALUES (?, ?, ?, ?, 1)
  `;

  try {
    const [result] = await connection.execute(query, [
      adminData.nama,
      adminData.email,
      hashedPassword,
      adminData.role
    ]);

    console.log('Akun admin berhasil dibuat!');
    console.log(' Email   :', adminData.email);
    console.log('Password:', adminData.password);
    console.log('User ID :', result.insertId);

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(' Email sudah terdaftar!');
    } else {
      console.error('Error:', error.message);
    }
  } finally {
    await connection.end();
  }
}

createAdmin();