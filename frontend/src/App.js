import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Calendar, Award, Users } from 'lucide-react';
import logoSekolah from './assets/logo.png';
import fotoGedung from './assets/foto-gedung.jpeg'; 

const App = () => {
  const [profile, setProfile] = useState({});
  const [berita, setBerita] = useState([]);

  // Ambil data dari Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sesuaikan URL jika port backend kamu bukan 5000
        const resProfile = await axios.get('http://localhost:5000/api/profile'); 
        const resBerita = await axios.get('http://localhost:5000/api/berita');
        setProfile(resProfile.data.data || {});
        setBerita(resBerita.data.data || []);
      } catch (err) {
        console.error("Gagal konek ke backend. Pastikan backend sudah menyala!", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-[#1a4d2e] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logoSekolah} alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="font-bold text-lg uppercase tracking-wider">{profile.nama_sekolah || "MI NURUL HUDA"}</h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold uppercase">
            <a href="#" className="hover:text-green-300">Beranda</a>
            <a href="#" className="hover:text-green-300">Profil</a>
            <a href="#" className="hover:text-green-300">Berita</a>
            <a href="#" className="hover:text-green-300">Kontak</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative h-[450px] bg-emerald-900 flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">"Sekolahku adalah surgaku"</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{profile.deskripsi || "Mencetak generasi rabbani yang berakhlak mulia."}</p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="bg-[#1a4d2e] py-10 text-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><h3 className="text-4xl font-bold">500+</h3><p className="text-xs opacity-70">Siswa Aktif</p></div>
          <div><h3 className="text-4xl font-bold">30+</h3><p className="text-xs opacity-70">Tenaga Pengajar</p></div>
          <div><h3 className="text-4xl font-bold">A</h3><p className="text-xs opacity-70">Akreditasi</p></div>
          <div><h3 className="text-4xl font-bold">15+</h3><p className="text-xs opacity-70">Tahun Berdiri</p></div>
        </div>
      </div>

      {/* TENTANG KAMI */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <span className="text-green-700 font-bold tracking-widest text-sm uppercase">Tentang Kami</span>
            <h2 className="text-4xl font-bold text-gray-800 uppercase leading-tight">{profile.nama_sekolah || "MI Nurul Huda Sumberngepoh"}</h2>
            <div className="grid grid-cols-1 gap-4">
               <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
                  <h4 className="font-bold mb-2">Visi</h4>
                  <p className="text-gray-600 italic text-sm">{profile.visi || "Belum ada data visi."}</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
                  <h4 className="font-bold mb-2">Misi</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{profile.misi || "Belum ada data misi."}</p>
               </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-gray-200 aspect-video rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white">
              <img src={fotoGedung} alt="Gedung Sekolah" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* BERITA */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Berita Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {berita.length > 0 ? berita.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gray-300">
                   <img src={item.gambar || "https://via.placeholder.com/400x200"} className="w-full h-full object-cover" alt={item.judul} />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-400 mb-3"><Calendar size={14} className="mr-1"/> {item.createdAt}</div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.judul}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.isi_berita}</p>
                  <button className="text-green-700 font-bold text-sm">BACA SELENGKAPNYA</button>
                </div>
              </div>
            )) : <p className="text-center col-span-3 opacity-50 italic">Belum ada berita yang diposting.</p>}
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-zinc-900 text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase border-b border-green-700 pb-2 inline-block">Hubungi Kami</h4>
            <div className="space-y-4 text-sm opacity-80">
              <p className="flex items-start gap-3"><MapPin className="text-green-500 shrink-0" size={20}/> Sumberngepoh, Kab. Malang</p>
              <p className="flex items-center gap-3"><Phone className="text-green-500 shrink-0" size={20}/> +62 812-3456-7890</p>
              <p className="flex items-center gap-3"><Mail className="text-green-500 shrink-0" size={20}/> info@minuruhuda.sch.id</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase border-b border-green-700 pb-2 inline-block">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:text-green-500">Profil Guru</a></li>
              <li><a href="#" className="hover:text-green-500">Pendaftaran Siswa Baru</a></li>
              <li><a href="#" className="hover:text-green-500">Galeri Foto</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
             <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700">
                <h4 className="font-bold mb-2">MI NURUL HUDA</h4>
                <p className="text-xs opacity-50 italic">"Mencetak Generasi Cerdas & Berakhlak"</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;