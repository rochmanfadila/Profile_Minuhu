import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://profileminuhu-production.up.railway.app/api';

const KontakDetail = () => {
  const [kontak, setKontak] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const alamat = kontak?.alamat || profile?.alamat || 'Jl. KH. Agus Salim, Indonesia';
  const telepon = kontak?.telepon || profile?.telepon || '-';
  const email = kontak?.email || profile?.email || '-';
  const mapQuery = encodeURIComponent(profile?.nama_sekolah || 'MI Nurul Huda');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
        <p className="text-green-700 text-sm font-sans">Memuat kontak...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-serif pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 px-6 py-20 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(82,183,136,0.15)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-emerald-500/20 border border-emerald-400 text-emerald-400 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans mb-5">
            Hubungi Kami
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
            Get in Touch With Us
          </h1>
          <p className="text-white/70 text-lg font-sans leading-relaxed">
            Kami siap membantu Anda dengan informasi seputar sekolah, pendaftaran, dan pertanyaan lainnya.
          </p>
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[200%] h-16 bg-gray-50 rounded-t-full"></div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Phone */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-2 font-sans">Phone</h3>
            <p className="text-gray-600 mb-4 text-sm font-sans">{telepon}</p>
            {telepon !== '-' && (
              <a href={`tel:${telepon.replace(/\D/g, '')}`} className="text-green-700 font-semibold text-sm font-sans hover:text-green-600 transition-colors">
                Hubungi Sekarang →
              </a>
            )}
          </div>

          {/* Email */}
          <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow text-white">
            <div className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 font-sans">Email</h3>
            <p className="text-white/85 mb-4 text-sm font-sans">{email}</p>
            {email !== '-' && (
              <a href={`mailto:${email}`} className="text-emerald-300 font-semibold text-sm font-sans hover:text-emerald-200 transition-colors">
                Kirim Email →
              </a>
            )}
          </div>

          {/* Alamat */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-2 font-sans">Head Office</h3>
            <p className="text-gray-600 mb-4 text-sm font-sans leading-relaxed">{alamat}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank" rel="noopener noreferrer"
              className="text-green-700 font-semibold text-sm font-sans hover:text-green-600 transition-colors"
            >
              Lihat di Maps →
            </a>
          </div>

        </div>
      </section>

      {/* Full Width Map */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-green-900 mb-6 font-sans text-center">Lokasi Kami</h2>
            <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                title="Lokasi Sekolah"
                src={`https://www.google.com/maps/embed/v1/search?q=${mapQuery}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3aEo`}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-gray-500 text-sm mt-6 text-center font-sans">
              * Jika peta tidak muncul, buka{' '}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank" rel="noopener noreferrer"
                className="text-green-700 hover:text-green-600 font-semibold"
              >
                Google Maps
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontakDetail;