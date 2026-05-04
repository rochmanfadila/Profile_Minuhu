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

          {/* Share */}
          <div style={styles.shareSection}>
            <span style={styles.shareLabel}>Bagikan:</span>
            <div style={styles.shareButtons}>
              {[
                {
                  label: 'WhatsApp',
                  color: '#25d366',
                  href: `https://wa.me/?text=${encodeURIComponent(berita.judul + ' ' + window.location.href)}`,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.522 5.83L.057 23.998l6.304-1.453A11.945 11.945 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 22c-1.886 0-3.655-.507-5.186-1.395l-.371-.22-3.861.891.944-3.742-.241-.385A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  color: '#1877f2',
                  href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ ...styles.shareBtn, background: s.color }}>
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
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