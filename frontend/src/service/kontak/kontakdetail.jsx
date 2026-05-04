import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://profileminuhu-production.up.railway.app/api';

const KontakDetail = () => {
  const [kontak, setKontak] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resKontak, resProfile] = await Promise.all([
          axios.get(`${API_BASE}/kontak`).catch(() => ({ data: {} })),
          axios.get(`${API_BASE}/profile`),
        ]);
        setKontak(resKontak.data.data || resKontak.data || {});
        setProfile(resProfile.data.data || resProfile.data || {});
      } catch (err) {
        console.error('Gagal mengambil data kontak:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kirim ke WhatsApp jika tidak ada endpoint form
    const phone = (kontak?.telepon || profile?.telepon || '').replace(/\D/g, '');
    if (phone) {
      const msg = encodeURIComponent(
        `*Pesan dari Website MI Nurul Huda*\n\nNama: ${formData.nama}\nEmail: ${formData.email}\n\nPesan:\n${formData.pesan}`
      );
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
      setFormStatus('success');
      setFormData({ nama: '', email: '', pesan: '' });
    } else {
      setFormStatus('error');
    }
  };

  const alamat = kontak?.alamat || profile?.alamat || 'Jl. KH. Agus Salim, Indonesia';
  const telepon = kontak?.telepon || profile?.telepon || '-';
  const email = kontak?.email || profile?.email || '-';
  const mapQuery = encodeURIComponent(profile?.nama_sekolah || 'MI Nurul Huda');

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Memuat kontak...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroBg}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Hubungi Kami</span>
          <h1 style={styles.heroTitle}>Get in Touch With Us</h1>
          <p style={styles.heroSub}>
            Kami siap membantu Anda dengan informasi seputar sekolah, pendaftaran, dan pertanyaan lainnya.
          </p>
        </div>
        <div style={styles.heroWave}></div>
      </section>

      {/* Contact Cards */}
      <section style={styles.cardsSection}>
        <div style={styles.cardsGrid}>

          {/* Phone */}
          <div style={styles.contactCard}>
            <div style={styles.contactIconRing}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 style={styles.contactCardTitle}>Phone</h3>
            <p style={styles.contactCardValue}>{telepon}</p>
            {telepon !== '-' && (
              <a href={`tel:${telepon.replace(/\D/g, '')}`} style={styles.contactLink}>
                Hubungi Sekarang →
              </a>
            )}
          </div>

          {/* Email */}
          <div style={{ ...styles.contactCard, ...styles.contactCardHighlight }}>
            <div style={{ ...styles.contactIconRing, background: '#1f4d33' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 style={{ ...styles.contactCardTitle, color: '#fff' }}>Email</h3>
            <p style={{ ...styles.contactCardValue, color: 'rgba(255,255,255,0.85)' }}>{email}</p>
            {email !== '-' && (
              <a href={`mailto:${email}`} style={{ ...styles.contactLink, color: '#86efac' }}>
                Kirim Email →
              </a>
            )}
          </div>

          {/* Alamat */}
          <div style={styles.contactCard}>
            <div style={styles.contactIconRing}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 style={styles.contactCardTitle}>Head Office</h3>
            <p style={styles.contactCardValue}>{alamat}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank" rel="noopener noreferrer"
              style={styles.contactLink}
            >
              Lihat di Maps →
            </a>
          </div>

        </div>
      </section>

      {/* Map + Form */}
      <section style={styles.bottomSection}>
        <div style={styles.bottomGrid}>

          {/* Google Maps */}
          <div style={styles.mapWrapper}>
            <h2 style={styles.sectionTitle}>Lokasi Kami</h2>
            <div style={styles.mapFrame}>
              <iframe
                title="Lokasi Sekolah"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, borderRadius: '12px' }}
                src={`https://www.google.com/maps/embed/v1/search?q=${mapQuery}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3aEo`}
                allowFullScreen
              />
            </div>
            <p style={styles.mapNote}>
              * Jika peta tidak muncul, buka{' '}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank" rel="noopener noreferrer"
                style={{ color: '#1f4d33' }}
              >
                Google Maps
              </a>
            </p>
          </div>

          {/* Pesan Form */}
          <div style={styles.formCard}>
            <h2 style={styles.sectionTitle}>Kirim Pesan</h2>
            <p style={styles.formSubtitle}>Pesan Anda akan diteruskan via WhatsApp.</p>

            {formStatus === 'success' && (
              <div style={styles.alertSuccess}>
                ✓ Pesan berhasil dikirim via WhatsApp!
              </div>
            )}
            {formStatus === 'error' && (
              <div style={styles.alertError}>
                ✕ Nomor telepon tidak tersedia. Silakan hubungi langsung.
              </div>
            )}

            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@contoh.com"
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Pesan</label>
                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  style={{ ...styles.input, resize: 'vertical', minHeight: '120px' }}
                  required
                />
              </div>
              <button onClick={handleSubmit} style={styles.submitBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                Kirim Pesan
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

const GREEN_DARK = '#1a3a2a';
const GREEN_MID = '#1f4d33';
const GREEN_ACCENT = '#52b788';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7f5',
    fontFamily: "'Georgia', serif",
    paddingBottom: '60px',
  },
  loadingWrapper: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '60vh', gap: '16px',
  },
  spinner: {
    width: '40px', height: '40px',
    border: `4px solid #e0e0e0`,
    borderTop: `4px solid ${GREEN_MID}`,
    borderRadius: '50%',
  },
  loadingText: { color: GREEN_MID, fontSize: '15px', fontFamily: 'sans-serif' },

  /* Hero */
  hero: {
    position: 'relative',
    background: `linear-gradient(135deg, ${GREEN_DARK} 0%, ${GREEN_MID} 100%)`,
    padding: '90px 24px 70px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 50%, rgba(82,183,136,0.15) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  heroContent: { position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(82,183,136,0.2)', border: `1px solid ${GREEN_ACCENT}`,
    color: GREEN_ACCENT, padding: '5px 16px', borderRadius: '100px',
    fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
    marginBottom: '18px', fontFamily: 'sans-serif',
  },
  heroTitle: {
    color: '#fff', fontSize: 'clamp(26px, 4vw, 40px)',
    fontWeight: '700', margin: '0 0 14px', lineHeight: 1.2,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.7)', fontSize: '16px',
    margin: 0, fontFamily: 'sans-serif', lineHeight: 1.6,
  },
  heroWave: {
    position: 'absolute', bottom: '-2px', left: '50%',
    transform: 'translateX(-50%)', width: '200%', height: '60px',
    background: '#f4f7f5', borderRadius: '50% 50% 0 0',
  },

  /* Cards */
  cardsSection: { padding: '60px 24px 0' },
  cardsGrid: {
    maxWidth: '900px', margin: '0 auto',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  contactCard: {
    background: '#fff', borderRadius: '16px',
    padding: '36px 28px', textAlign: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  },
  contactCardHighlight: {
    background: `linear-gradient(135deg, ${GREEN_MID}, #2d6a4f)`,
  },
  contactIconRing: {
    width: '64px', height: '64px', borderRadius: '50%',
    background: GREEN_ACCENT, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 20px',
  },
  contactCardTitle: {
    color: GREEN_DARK, fontSize: '18px', fontWeight: '700',
    margin: '0 0 8px', fontFamily: 'sans-serif',
  },
  contactCardValue: {
    color: '#555', fontSize: '15px', margin: '0 0 16px',
    fontFamily: 'sans-serif', lineHeight: 1.5,
  },
  contactLink: {
    color: GREEN_MID, fontSize: '14px', fontWeight: '600',
    textDecoration: 'none', fontFamily: 'sans-serif',
  },

  /* Bottom */
  bottomSection: { padding: '48px 24px 0' },
  bottomGrid: {
    maxWidth: '900px', margin: '0 auto',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
  },
  sectionTitle: {
    color: GREEN_DARK, fontSize: '22px', fontWeight: '700',
    margin: '0 0 8px', fontFamily: 'sans-serif',
  },
  mapWrapper: {},
  mapFrame: {
    height: '320px', borderRadius: '12px',
    overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginTop: '16px',
  },
  mapNote: { color: '#999', fontSize: '12px', marginTop: '8px', fontFamily: 'sans-serif' },

  /* Form */
  formCard: {
    background: '#fff', borderRadius: '16px',
    padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  },
  formSubtitle: { color: '#888', fontSize: '14px', marginBottom: '24px', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: GREEN_DARK, fontSize: '14px', fontWeight: '600', fontFamily: 'sans-serif' },
  input: {
    width: '100%', padding: '12px 14px',
    border: '1.5px solid #e0e8e4', borderRadius: '10px',
    fontSize: '15px', fontFamily: 'sans-serif', color: '#333',
    outline: 'none', boxSizing: 'border-box',
    background: '#fafcfb', transition: 'border-color 0.2s',
  },
  submitBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `linear-gradient(135deg, ${GREEN_MID}, #2d6a4f)`,
    color: '#fff', border: 'none', borderRadius: '10px',
    padding: '14px 28px', fontSize: '15px', fontWeight: '600',
    fontFamily: 'sans-serif', cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  alertSuccess: {
    background: '#d1fae5', color: '#065f46',
    padding: '12px 16px', borderRadius: '8px',
    fontSize: '14px', fontFamily: 'sans-serif', marginBottom: '16px',
  },
  alertError: {
    background: '#fee2e2', color: '#b91c1c',
    padding: '12px 16px', borderRadius: '8px',
    fontSize: '14px', fontFamily: 'sans-serif', marginBottom: '16px',
  },
};

export default KontakDetail;