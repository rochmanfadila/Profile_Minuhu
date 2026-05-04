import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Calendar, Award, Users, X, ChevronRight, Share2, ArrowLeft } from 'lucide-react';
import logoSekolah from './assets/logo.png';
import fotoGedung from './assets/foto-gedung.jpeg';

const API = 'https://profileminuhu-production.up.railway.app/api';

const App = () => {
  const [profile, setProfile] = useState({});
  const [berita, setBerita] = useState([]);
  const [selectedBerita, setSelectedBerita] = useState(null); // untuk modal berita detail
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nama: '', telepon: '', pesan: '' });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProfile = await axios.get(`${API}/profile`);
        const resBerita = await axios.get(`${API}/berita`);
        setProfile(resProfile.data.data || {});
        setBerita(resBerita.data.data || []);
      } catch (err) {
        console.error("Gagal konek ke backend. Pastikan backend sudah menyala!", err);
      }
    };
    fetchData();
  }, []);

  const openBerita = (item) => {
    setSelectedBerita(item);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBerita = () => {
    setModalOpen(false);
    setSelectedBerita(null);
    document.body.style.overflow = '';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    } catch { return dateStr; }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const noWA = (profile.telepon || '+6281234567890').replace(/\D/g, '');
    const msg = encodeURIComponent(
      `*Pesan dari Website MI Nurul Huda*\n\nNama: ${formData.nama}\nTelepon: ${formData.telepon}\n\nPesan:\n${formData.pesan}`
    );
    window.open(`https://wa.me/${noWA}?text=${msg}`, '_blank');
    setFormStatus('success');
    setFormData({ nama: '', telepon: '', pesan: '' });
    setTimeout(() => setFormStatus(null), 4000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── NAVBAR ── */}
      <nav className="bg-[#1a4d2e] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logoSekolah} alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="font-bold text-lg uppercase tracking-wider">
              {profile.nama_sekolah || "MI NURUL HUDA"}
            </h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold uppercase">
            <a href="#profil" className="hover:text-green-300 transition-colors">Profil</a>
            <a href="#berita" className="hover:text-green-300 transition-colors">Berita</a>
            <a href="#kontak" className="hover:text-green-300 transition-colors">Kontak</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative h-[450px] bg-emerald-900 flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">"Sekolahku adalah surgaku"</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {profile.deskripsi || "Mencetak generasi rabbani yang berakhlak mulia."}
          </p>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="bg-[#1a4d2e] py-10 text-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><h3 className="text-4xl font-bold">500+</h3><p className="text-xs opacity-70 mt-1">Siswa Aktif</p></div>
          <div><h3 className="text-4xl font-bold">30+</h3><p className="text-xs opacity-70 mt-1">Tenaga Pengajar</p></div>
          <div><h3 className="text-4xl font-bold">A</h3><p className="text-xs opacity-70 mt-1">Akreditasi</p></div>
          <div><h3 className="text-4xl font-bold">15+</h3><p className="text-xs opacity-70 mt-1">Tahun Berdiri</p></div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PROFIL DETAIL
      ══════════════════════════════════════ */}
      <section id="profil" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-green-700 font-bold tracking-widest text-sm uppercase inline-block border-b-2 border-green-600 pb-1 mb-4">
              Profil MINUHU
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight uppercase">
              {profile.nama_sekolah || "MI Nurul Huda Sumberngepoh"}
            </h2>
          </div>

          {/* Foto + Deskripsi */}
          <div className="flex flex-col md:flex-row items-center gap-16 mb-16">
            {/* Foto */}
            <div className="md:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-emerald-100 rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl overflow-hidden border-4 border-white aspect-[4/3]">
                  <img
                    src={fotoGedung}
                    alt="Gedung Utama MI Nurul Huda"
                    className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Tentang + Visi Misi */}
            <div className="md:w-1/2 w-full space-y-8">
              {/* Tentang */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-green-700">
                <h4 className="font-bold text-gray-900 text-xl mb-3 uppercase tracking-wider">
                  Tentang Kami
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {profile.tentang ||
                    "MI Nurul Huda adalah madrasah ibtidaiyah yang berdedikasi memberikan pendidikan berkualitas dengan landasan nilai-nilai Islam yang kuat. Kami berkomitmen mencetak generasi yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan."}
                </p>
              </div>

              {/* Visi & Misi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-green-600 hover:shadow-2xl transition-shadow duration-300">
                  <h4 className="font-bold text-gray-900 text-xl mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Award className="text-green-600" size={22} /> Visi
                  </h4>
                  <p className="text-gray-600 italic text-sm leading-relaxed whitespace-pre-line">
                    {profile.visi || "Belum ada data visi."}
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-emerald-500 hover:shadow-2xl transition-shadow duration-300">
                  <h4 className="font-bold text-gray-900 text-xl mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Users className="text-emerald-500" size={22} /> Misi
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {profile.misi || "Belum ada data misi."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── INFO DETAIL SEKOLAH ── */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header strip */}
            <div className="bg-[#1a4d2e] px-8 py-5">
              <h3 className="text-white font-bold text-xl uppercase tracking-widest">
                Informasi Detail Sekolah
              </h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Nama Sekolah', value: profile.nama_sekolah || 'MI Nurul Huda' },
                { label: 'NPSN', value: profile.npsn || '-' },
                { label: 'Status', value: profile.status || 'Swasta' },
                { label: 'Akreditasi', value: profile.akreditasi || 'A' },
                { label: 'Kepala Sekolah', value: profile.kepala_sekolah || '-' },
                { label: 'Tahun Berdiri', value: profile.tahun_berdiri || '2009' },
                { label: 'Jumlah Siswa', value: profile.jumlah_siswa ? `${profile.jumlah_siswa} siswa` : '500+ siswa' },
                { label: 'Alamat', value: profile.alamat || 'Desa Sumberngepoh, Lawang, Malang' },
              ].map((info, i) => (
                <div key={i} className="flex gap-3 items-start bg-gray-50 rounded-xl px-5 py-4">
                  <ChevronRight size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">{info.label}</span>
                    <span className="text-gray-800 font-medium mt-0.5 text-sm">{info.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          BERITA
      ══════════════════════════════════════ */}
      <section id="berita" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-700 font-bold tracking-widest text-sm uppercase inline-block border-b-2 border-green-600 pb-1 mb-4">
              Kabar Terkini
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Berita Terbaru</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {berita.length > 0 ? berita.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
                onClick={() => openBerita(item)}
              >
                {/* Thumbnail */}
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img
                    src={item.gambar ? (item.gambar.startsWith('http') ? item.gambar : `/${item.gambar}`) : 'https://via.placeholder.com/400x200/1a4d2e/ffffff?text=MI+Nurul+Huda'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.judul}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x200/1a4d2e/ffffff?text=MI+Nurul+Huda"; }}
                  />
                  {item.kategori && (
                    <span className="absolute top-3 left-3 bg-[#1a4d2e] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {item.kategori}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-gray-400 mb-3 gap-1">
                    <Calendar size={13} />
                    <span>{formatDate(item.tanggal || item.createdAt || item.created_at)}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-green-700 transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                    {item.isi_berita || item.konten || item.isi || ''}
                  </p>
                  <button className="flex items-center gap-1 text-green-700 font-bold text-sm hover:gap-3 transition-all duration-200">
                    BACA SELENGKAPNYA <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-center col-span-3 opacity-50 italic py-12">Belum ada berita yang diposting.</p>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          KONTAK DETAIL
      ══════════════════════════════════════ */}
      <section id="kontak" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-green-700 font-bold tracking-widest text-sm uppercase inline-block border-b-2 border-green-600 pb-1 mb-4">
              Hubungi Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch With Us</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Kami siap membantu Anda dengan informasi seputar pendaftaran, kegiatan akademik, dan pertanyaan lainnya.
            </p>
          </div>

          {/* 3 Kartu Kontak */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {/* Telepon */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1a4d2e] transition-colors duration-300">
                <Phone size={28} className="text-green-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 uppercase tracking-wider">Phone</h3>
              <p className="text-gray-500 text-sm mb-4">{profile.telepon || '+62 812-3456-7890'}</p>
              <a
                href={`tel:${(profile.telepon || '+6281234567890').replace(/\D/g, '')}`}
                className="inline-flex items-center gap-1 text-green-700 font-bold text-sm hover:underline"
              >
                Hubungi Sekarang <ChevronRight size={14} />
              </a>
            </div>

            {/* Email — Highlight */}
            <div className="bg-[#1a4d2e] rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300 group transform md:-translate-y-3">
              <div className="w-16 h-16 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 uppercase tracking-wider">Email</h3>
              <p className="text-green-200 text-sm mb-4">{profile.email || 'info@minurulhuda.sch.id'}</p>
              <a
                href={`mailto:${profile.email || 'info@minurulhuda.sch.id'}`}
                className="inline-flex items-center gap-1 text-green-300 font-bold text-sm hover:text-white transition-colors"
              >
                Kirim Email <ChevronRight size={14} />
              </a>
            </div>

            {/* Alamat */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1a4d2e] transition-colors duration-300">
                <MapPin size={28} className="text-green-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 uppercase tracking-wider">Head Office</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {profile.alamat || 'Dusun Krajan RT 001 RW 003, Desa Sumberngepoh, Kec. Lawang, Kab. Malang, Jawa Timur 65216'}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=MI+Nurul+Huda+Lawang"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-700 font-bold text-sm hover:underline"
              >
                Lihat di Maps <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Map + Form */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row min-h-[480px]">

              {/* Google Maps */}
              <div className="md:w-1/2 w-full h-[300px] md:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.2725901031595!2d112.72180874731448!3d-7.837864341141903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62cac7030969b%3A0x3a1783dddfb415b5!2sMI%20Nurul%20Huda%20Lawang!5e0!3m2!1sid!2sid!4v1777301858864!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Lokasi MI Nurul Huda"
                />
              </div>

              {/* Form Pesan */}
              <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan</h3>
                <p className="text-gray-400 text-sm mb-8">Pesan Anda akan diteruskan via WhatsApp.</p>

                {formStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm mb-6 flex items-center gap-2">
                    ✓ Pesan berhasil dibuka di WhatsApp!
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleFormChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nomor Telepon</label>
                    <input
                      type="tel"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleFormChange}
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Pesan</label>
                    <textarea
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleFormChange}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition bg-gray-50 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleFormSubmit}
                    className="w-full bg-[#1a4d2e] hover:bg-[#154026] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  >
                    <Mail size={16} /> Kirim via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a4d2e] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src={logoSekolah} alt="Logo" className="w-8 h-8 object-contain opacity-80" />
            <span className="font-bold uppercase tracking-widest text-sm">MI Nurul Huda</span>
          </div>
          <p className="text-green-300 text-xs">© 2026 MI Nurul Huda Sumberngepoh. Created by Moch Rochman Fadila Faqih.</p>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          MODAL BERITA DETAIL
      ══════════════════════════════════════ */}
      {modalOpen && selectedBerita && (
        <div
          className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeBerita(); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden">

            {/* Modal Header */}
            <div className="bg-[#1a4d2e] px-8 py-5 flex items-center justify-between">
              <button
                onClick={closeBerita}
                className="flex items-center gap-2 text-green-200 hover:text-white transition text-sm font-semibold"
              >
                <ArrowLeft size={18} /> Kembali ke Berita
              </button>
              <button onClick={closeBerita} className="text-green-200 hover:text-white transition">
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col md:flex-row">

              {/* Konten Utama */}
              <div className="md:w-2/3 p-8 md:p-10">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {selectedBerita.kategori && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {selectedBerita.kategori}
                    </span>
                  )}
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(selectedBerita.tanggal || selectedBerita.createdAt || selectedBerita.created_at)}
                  </span>
                </div>

                {/* Judul */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-5">
                  {selectedBerita.judul}
                </h1>

                {/* Penulis */}
                {selectedBerita.penulis && (
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-9 h-9 bg-[#1a4d2e] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {selectedBerita.penulis.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{selectedBerita.penulis}</p>
                      <p className="text-xs text-gray-400">Penulis</p>
                    </div>
                  </div>
                )}

                {/* Gambar Cover */}
                {selectedBerita.gambar && (
                  <div className="rounded-2xl overflow-hidden mb-6 max-h-72">
                    <img
                      src={selectedBerita.gambar.startsWith('http') ? selectedBerita.gambar : `/${selectedBerita.gambar}`}
                      alt={selectedBerita.judul}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* Isi Berita */}
                <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                  {(selectedBerita.isi_berita || selectedBerita.konten || selectedBerita.isi || 'Konten berita tidak tersedia.')
                    .split('\n').filter(Boolean).map((para, i) => (
                      <p key={i} className="text-justify">{para}</p>
                    ))}
                </div>

                {/* Share */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4 flex-wrap">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Share2 size={14} /> Bagikan:
                  </span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(selectedBerita.judul + ' - ' + window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-[#25d366] text-white text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-[#1877f2] text-white text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              {/* Sidebar Berita Terkait */}
              <div className="md:w-1/3 bg-gray-50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-100">
                <h3 className="font-bold text-gray-900 text-base uppercase tracking-wider mb-5 pb-3 border-b-2 border-green-600">
                  Berita Terkait
                </h3>
                <div className="space-y-4">
                  {berita.filter(b => b.id !== selectedBerita.id).slice(0, 5).length === 0 ? (
                    <p className="text-gray-400 text-xs italic">Tidak ada berita lain.</p>
                  ) : (
                    berita.filter(b => b.id !== selectedBerita.id).slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedBerita(item)}
                        className="flex gap-3 cursor-pointer group"
                      >
                        <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={item.gambar ? (item.gambar.startsWith('http') ? item.gambar : `/${item.gambar}`) : 'https://via.placeholder.com/64x56/1a4d2e/fff?text=MH'}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/64x56/1a4d2e/fff?text=MH'; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-2 leading-snug">
                            {item.judul}
                          </p>
                          {item.kategori && (
                            <span className="text-xs text-green-600 font-bold mt-1 block">{item.kategori}</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;