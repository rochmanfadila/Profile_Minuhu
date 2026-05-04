import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://profileminuhu-production.up.railway.app/api';

const ProfilDetail = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/profile`);
        setProfile(res.data.data || res.data);
      } catch (err) {
        console.error('Gagal mengambil data profil:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Memuat profil...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Tentang Kami</span>
          <h1 style={styles.heroTitle}>
            {profile?.nama_sekolah || 'MI NURUL HUDA'}
          </h1>
          <p style={styles.heroSubtitle}>
            {profile?.tagline || 'Mencetak generasi rabbani yang berakhlak mulia.'}
          </p>
        </div>
        <div style={styles.heroDecor}></div>
      </section>

      {/* Stats Bar */}
      <section style={styles.statsBar}>
        {[
          { label: 'Siswa Aktif', value: profile?.jumlah_siswa ? `${profile.jumlah_siswa}+` : '500+' },
          { label: 'Tenaga Pengajar', value: profile?.jumlah_guru ? `${profile.jumlah_guru}+` : '30+' },
          { label: 'Akreditasi', value: profile?.akreditasi || 'A' },
          { label: 'Tahun Berdiri', value: profile?.tahun_berdiri || '2009' },
        ].map((stat, i) => (
          <div key={i} style={styles.statItem}>
            <span style={styles.statValue}>{stat.value}</span>
            <span style={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <section style={styles.mainSection}>
        <div style={styles.container}>

          {/* Tentang Sekolah */}
          <div style={styles.card}>
            <div style={styles.cardAccent}></div>
            <div style={styles.cardBody}>
              <div style={styles.sectionHeader}>
                <div style={styles.iconBox}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 style={styles.sectionTitle}>Tentang Sekolah</h2>
              </div>
              <p style={styles.bodyText}>
                {profile?.deskripsi ||
                  'MI Nurul Huda adalah madrasah ibtidaiyah yang berdedikasi untuk memberikan pendidikan berkualitas dengan landasan nilai-nilai Islam yang kuat. Kami berkomitmen mencetak generasi yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan.'}
              </p>
            </div>
          </div>

          {/* Visi & Misi */}
          <div style={styles.visiMisiGrid}>
            <div style={{ ...styles.card, ...styles.visiCard }}>
              <div style={styles.cardAccentGold}></div>
              <div style={styles.cardBody}>
                <div style={styles.sectionHeader}>
                  <div style={{ ...styles.iconBox, background: '#d4a017' }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 style={styles.sectionTitle}>Visi</h2>
                </div>
                <p style={styles.bodyText}>
                  {profile?.visi || 'Menjadi madrasah unggulan yang melahirkan generasi berilmu, beriman, bertaqwa, dan berakhlakul karimah.'}
                </p>
              </div>
            </div>

            <div style={{ ...styles.card, ...styles.misiCard }}>
              <div style={styles.cardAccent}></div>
              <div style={styles.cardBody}>
                <div style={styles.sectionHeader}>
                  <div style={styles.iconBox}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 style={styles.sectionTitle}>Misi</h2>
                </div>
                {profile?.misi ? (
                  <ul style={styles.misiList}>
                    {(Array.isArray(profile.misi) ? profile.misi : profile.misi.split('\n').filter(Boolean)).map((item, i) => (
                      <li key={i} style={styles.misiItem}>
                        <span style={styles.misiDot}></span>
                        <span style={styles.bodyText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul style={styles.misiList}>
                    {[
                      'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan.',
                      'Menanamkan nilai-nilai Islam dalam setiap aspek kehidupan sekolah.',
                      'Mengembangkan potensi siswa secara akademik dan non-akademik.',
                      'Membangun kerjasama yang harmonis antara sekolah, orang tua, dan masyarakat.',
                    ].map((item, i) => (
                      <li key={i} style={styles.misiItem}>
                        <span style={styles.misiDot}></span>
                        <span style={styles.bodyText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Informasi Sekolah */}
          <div style={styles.card}>
            <div style={styles.cardAccent}></div>
            <div style={styles.cardBody}>
              <div style={styles.sectionHeader}>
                <div style={styles.iconBox}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 style={styles.sectionTitle}>Informasi Sekolah</h2>
              </div>
              <div style={styles.infoGrid}>
                {[
                  { label: 'Nama Sekolah', value: profile?.nama_sekolah || 'MI Nurul Huda' },
                  { label: 'NPSN', value: profile?.npsn || '-' },
                  { label: 'Status', value: profile?.status || 'Swasta' },
                  { label: 'Akreditasi', value: profile?.akreditasi || 'A' },
                  { label: 'Kepala Sekolah', value: profile?.kepala_sekolah || '-' },
                  { label: 'Tahun Berdiri', value: profile?.tahun_berdiri || '2009' },
                  { label: 'Alamat', value: profile?.alamat || '-' },
                  { label: 'Website', value: 'profile-minuhu.vercel.app' },
                ].map((info, i) => (
                  <div key={i} style={styles.infoRow}>
                    <span style={styles.infoLabel}>{info.label}</span>
                    <span style={styles.infoColon}>:</span>
                    <span style={styles.infoValue}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

const GREEN_DARK = '#1a3a2a';
const GREEN_MID = '#1f4d33';
const GREEN_LIGHT = '#2d6a4f';
const GREEN_ACCENT = '#52b788';
const GOLD = '#d4a017';
const TEXT_LIGHT = '#e8f5e9';
const TEXT_MUTED = '#a8c5b4';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7f5',
    fontFamily: "'Georgia', serif",
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: `4px solid #e0e0e0`,
    borderTop: `4px solid ${GREEN_MID}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: GREEN_MID,
    fontSize: '16px',
  },

  /* Hero */
  hero: {
    position: 'relative',
    background: `linear-gradient(135deg, ${GREEN_DARK} 0%, ${GREEN_MID} 60%, ${GREEN_LIGHT} 100%)`,
    padding: '100px 24px 80px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 70% 50%, rgba(82,183,136,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroDecor: {
    position: 'absolute',
    bottom: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200%',
    height: '80px',
    background: '#f4f7f5',
    borderRadius: '50% 50% 0 0',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '700px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(82,183,136,0.25)',
    border: `1px solid ${GREEN_ACCENT}`,
    color: GREEN_ACCENT,
    padding: '6px 18px',
    borderRadius: '100px',
    fontSize: '13px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '20px',
    fontFamily: 'sans-serif',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: '700',
    margin: '0 0 16px',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    color: TEXT_MUTED,
    fontSize: '17px',
    margin: 0,
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
  },

  /* Stats Bar */
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0',
    background: GREEN_DARK,
    padding: '0',
    marginTop: '-2px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '28px 48px',
    borderRight: `1px solid rgba(255,255,255,0.08)`,
  },
  statValue: {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: 1,
  },
  statLabel: {
    color: TEXT_MUTED,
    fontSize: '13px',
    marginTop: '6px',
    fontFamily: 'sans-serif',
    letterSpacing: '0.5px',
  },

  /* Main Section */
  mainSection: {
    padding: '60px 24px 80px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },

  /* Cards */
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    position: 'relative',
  },
  visiMisiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
  },
  visiCard: {},
  misiCard: {},
  cardAccent: {
    height: '4px',
    background: `linear-gradient(90deg, ${GREEN_MID}, ${GREEN_ACCENT})`,
  },
  cardAccentGold: {
    height: '4px',
    background: `linear-gradient(90deg, ${GOLD}, #f0c040)`,
  },
  cardBody: {
    padding: '32px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '20px',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: GREEN_MID,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    color: GREEN_DARK,
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
  },
  bodyText: {
    color: '#4a5568',
    lineHeight: 1.75,
    fontSize: '15px',
    margin: 0,
    fontFamily: 'sans-serif',
  },

  /* Misi List */
  misiList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  misiItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  misiDot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: GREEN_ACCENT,
    marginTop: '6px',
    flexShrink: 0,
  },

  /* Info Grid */
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    background: '#f8faf9',
    borderRadius: '8px',
    alignItems: 'flex-start',
    fontFamily: 'sans-serif',
  },
  infoLabel: {
    color: GREEN_DARK,
    fontWeight: '600',
    fontSize: '14px',
    minWidth: '120px',
    flexShrink: 0,
  },
  infoColon: {
    color: TEXT_MUTED,
    fontSize: '14px',
  },
  infoValue: {
    color: '#4a5568',
    fontSize: '14px',
  },
};

export default ProfilDetail;