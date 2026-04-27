const BASE_URL = 'http://localhost:5000/api';

async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`API Error [${path}]:`, err.message);
    return null;
  }
}

// ── Berita ──
export const beritaService = {
  getAll: () => request('/berita'),
  getById: (id) => request(`/berita/${id}`),
  create: (body) => request('/berita', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/berita/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/berita/${id}`, { method: 'DELETE' }),
};

// ── Kategori ──
export const kategoriService = {
  getAll: () => request('/kategori'),
  create: (body) => request('/kategori', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/kategori/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/kategori/${id}`, { method: 'DELETE' }),
};

// ── Kontak Sekolah ──
export const kontakService = {
  getAll: () => request('/kontak'),
  create: (body) => request('/kontak', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/kontak/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/kontak/${id}`, { method: 'DELETE' }),
};

// ── Profile ──
export const profileService = {
  get: () => request('/profile'),
  create: (body) => request('/profile', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/profile/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
};

// ── Users ──
export const userService = {
  getAll: () => request('/users'),
  create: (body) => request('/users', { method: 'POST', body: JSON.stringify(body) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
};