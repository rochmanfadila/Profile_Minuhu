const API = 'http://localhost:3000';


// NAVIGASI HALAMAN

function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (el) el.classList.add('active');
}

 
// HELPER: INISIAL NAMA

function initials(nama) {
  return nama.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}


// RENDER BERITA

function renderBerita(list, targetId) {
  const el = document.getElementById(targetId);
  if (!list || list.length === 0) {
    el.innerHTML = '<p class="loading">Tidak ada berita tersedia.</p>';
    return;
  }
  el.innerHTML = list.slice(0, 6).map(b => `
    <div class="card">
      <h3>${b.judul}</h3>
      <p>${b.isi || b.konten || b.deskripsi || ''}</p>
      <p class="date">${b.tanggal || b.createdAt || ''}</p>
    </div>
  `).join('');
}


// RENDER GURU

function renderGuru(list) {
  const el = document.getElementById('guru-list');
  if (!list || list.length === 0) {
    el.innerHTML = '<p class="loading">Tidak ada data guru tersedia.</p>';
    return;
  }
  el.innerHTML = list.map(g => `
    <div class="guru-card">
      <div class="avatar">${initials(g.nama || g.name || '??')}</div>
      <h4>${g.nama || g.name}</h4>
      <p>${g.mapel || g.mata_pelajaran || g.jabatan || ''}</p>
    </div>
  `).join('');
}


// FETCH DATA DARI API

async function fetchBerita() {
  try {
    const res = await fetch(`${API}/api/berita`);
    const data = await res.json();
    renderBerita(data, 'berita-beranda');
    renderBerita(data, 'berita-list');
  } catch (err) {
    console.error('Gagal fetch berita:', err);
    document.getElementById('berita-beranda').innerHTML = '<p class="loading">Gagal memuat berita.</p>';
    document.getElementById('berita-list').innerHTML = '<p class="loading">Gagal memuat berita.</p>';
  }
}

async function fetchGuru() {
  try {
    const res = await fetch(`${API}/api/guru`);
    const data = await res.json();
    renderGuru(data);
  } catch (err) {
    console.error('Gagal fetch guru:', err);
    document.getElementById('guru-list').innerHTML = '<p class="loading">Gagal memuat data guru.</p>';
  }
}


// JALANKAN SAAT HALAMAN DIBUKA

fetchBerita();
fetchGuru();