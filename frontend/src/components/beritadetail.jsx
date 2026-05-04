import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://profileminuhu-production.up.railway.app/api';

const BeritaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resBerita, resAll] = await Promise.all([
          axios.get(`${API_BASE}/berita/${id}`),
          axios.get(`${API_BASE}/berita`),
        ]);
        const beritaData = resBerita.data.data || resBerita.data;
        const allBerita = resAll.data.data || resAll.data || [];
        setBerita(beritaData);
        setRelated(allBerita.filter((b) => String(b.id) !== String(id)).slice(0, 4));
      } catch (err) {
        console.error('Gagal mengambil data berita:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.spinnerRing}></div>
        <p style={styles.loadingText}>Memuat berita...</p>
      </div>
    );
  }

  if (!berita) {
    return (
      <div style={styles.errorWrapper}>
        <p style={styles.errorText}>Berita tidak ditemukan.</p>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Kembali</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.layout}>

        {/* ─── Artikel Utama ─── */}
        <main style={styles.main}>

          {/* Back */}
          <button style={styles.backLink} onClick={() => navigate(-1)}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Berita
          </button>

          {/* Category + Date */}
          <div style={styles.meta}>
            {berita.kategori && (
              <span style={styles.categoryBadge}>{berita.kategori}</span>
            )}
            <span style={styles.metaDate}>{formatDate(berita.tanggal || berita.created_at)}</span>
          </div>

          {/* Title */}
          <h1 style={styles.title}>{berita.judul}</h1>

          {/* Author */}
          {berita.penulis && (
            <div style={styles.authorRow}>
              <div style={styles.authorAvatar}>
                {berita.penulis.charAt(0).toUpperCase()}
              </div>
              <div>
                <span style={styles.authorName}>{berita.penulis}</span>
                <span style={styles.authorSub}> · Penulis</span>
              </div>
            </div>
          )}

          {/* Cover Image */}
          {berita.gambar && (
            <div style={styles.imageWrapper}>
              <img
                src={berita.gambar}
                alt={berita.judul}
                style={styles.coverImage}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Content */}
          <div style={styles.articleBody}>
            {(berita.konten || berita.isi || '').split('\n').filter(Boolean).map((para, i) => (
              <p key={i} style={styles.paragraph}>{para}</p>
            ))}
          </div>
        </main>

        {/* ─── Sidebar ─── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>Berita Terkait</h3>
            {related.length === 0 ? (
              <p style={styles.noRelated}>Tidak ada berita lain.</p>
            ) : (
              <div style={styles.relatedList}>
                {related.map((item) => (
                  <div
                    key={item.id}
                    style={styles.relatedItem}
                    onClick={() => navigate(`/berita/${item.id}`)}
                  >
                    {item.gambar ? (
                      <img src={item.gambar} alt={item.judul} style={styles.relatedThumb}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div style={styles.relatedThumbPlaceholder}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#a8c5b4" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div style={styles.relatedInfo}>
                      <p style={styles.relatedTitle}>{item.judul}</p>
                      {item.kategori && <span style={styles.relatedCat}>{item.kategori}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

      </div>
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
  layout: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '36px',
    alignItems: 'start',
  },

  /* Loading / Error */
  loadingWrapper: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '60vh', gap: '16px',
  },
  spinnerRing: {
    width: '44px', height: '44px',
    border: `4px solid #e0e0e0`,
    borderTop: `4px solid ${GREEN_MID}`,
    borderRadius: '50%',
  },
  loadingText: { color: GREEN_MID, fontSize: '15px', fontFamily: 'sans-serif' },
  errorWrapper: { textAlign: 'center', padding: '80px 24px' },
  errorText: { color: '#666', fontSize: '16px', marginBottom: '20px', fontFamily: 'sans-serif' },

  /* Back */
  backLink: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    color: GREEN_MID, background: 'none', border: `1px solid ${GREEN_MID}`,
    borderRadius: '8px', padding: '8px 16px', cursor: 'pointer',
    fontSize: '14px', fontFamily: 'sans-serif', marginBottom: '28px',
    transition: 'all 0.2s',
  },
  backBtn: {
    background: GREEN_MID, color: '#fff', border: 'none',
    borderRadius: '8px', padding: '10px 24px', cursor: 'pointer', fontFamily: 'sans-serif',
  },

  /* Main */
  main: {
    background: '#fff', borderRadius: '16px',
    padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  },
  meta: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' },
  categoryBadge: {
    background: `${GREEN_ACCENT}22`, color: GREEN_MID,
    padding: '4px 14px', borderRadius: '100px', fontSize: '12px',
    fontFamily: 'sans-serif', fontWeight: '600', letterSpacing: '0.5px',
  },
  metaDate: { color: '#9ab', fontSize: '13px', fontFamily: 'sans-serif' },
  title: {
    color: GREEN_DARK, fontSize: 'clamp(22px, 3vw, 32px)',
    fontWeight: '700', lineHeight: 1.3, margin: '0 0 20px',
  },
  authorRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' },
  authorAvatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: GREEN_MID, color: '#fff', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '14px', fontFamily: 'sans-serif',
  },
  authorName: { color: GREEN_DARK, fontWeight: '600', fontSize: '14px', fontFamily: 'sans-serif' },
  authorSub: { color: '#9ab', fontSize: '13px', fontFamily: 'sans-serif' },

  imageWrapper: {
    borderRadius: '12px', overflow: 'hidden',
    marginBottom: '32px', maxHeight: '400px',
  },
  coverImage: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },

  articleBody: { marginBottom: '40px' },
  paragraph: {
    color: '#333', lineHeight: 1.85, fontSize: '16px',
    marginBottom: '18px', fontFamily: 'sans-serif',
    textAlign: 'justify',
  },

  shareSection: {
    borderTop: '1px solid #eee', paddingTop: '24px',
    display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
  },
  shareLabel: { color: '#666', fontFamily: 'sans-serif', fontSize: '14px' },
  shareButtons: { display: 'flex', gap: '10px' },
  shareBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    color: '#fff', textDecoration: 'none', borderRadius: '8px',
    padding: '8px 16px', fontSize: '13px', fontFamily: 'sans-serif', fontWeight: '600',
  },

  /* Sidebar */
  sidebar: { position: 'sticky', top: '24px' },
  sidebarCard: {
    background: '#fff', borderRadius: '16px',
    padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  },
  sidebarTitle: {
    color: GREEN_DARK, fontSize: '18px', fontWeight: '700',
    margin: '0 0 20px', paddingBottom: '16px',
    borderBottom: `2px solid ${GREEN_ACCENT}`,
  },
  noRelated: { color: '#999', fontSize: '14px', fontFamily: 'sans-serif' },
  relatedList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  relatedItem: {
    display: 'flex', gap: '12px', alignItems: 'flex-start',
    cursor: 'pointer', padding: '8px', borderRadius: '8px',
    transition: 'background 0.2s',
  },
  relatedThumb: {
    width: '70px', height: '56px', borderRadius: '8px',
    objectFit: 'cover', flexShrink: 0,
  },
  relatedThumbPlaceholder: {
    width: '70px', height: '56px', borderRadius: '8px',
    background: '#f0f4f2', display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  relatedInfo: { flex: 1 },
  relatedTitle: {
    color: GREEN_DARK, fontSize: '14px', fontWeight: '600',
    margin: '0 0 6px', lineHeight: 1.4, fontFamily: 'sans-serif',
    display: '-webkit-box', WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical', overflow: 'hidden',
  },
  relatedCat: {
    color: GREEN_ACCENT, fontSize: '11px', fontFamily: 'sans-serif',
    fontWeight: '600', letterSpacing: '0.5px',
  },
};