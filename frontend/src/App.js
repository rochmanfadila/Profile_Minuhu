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
            {/* Beranda dihilangkan */}
            <a href="#profil" className="hover:text-green-300 transition-colors">Profil</a>
            <a href="#berita" className="hover:text-green-300 transition-colors">Berita</a>
            <a href="#kontak" className="hover:text-green-300 transition-colors">Kontak</a>
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

      {/* TENTANG KAMI & KONTAK */}
      <section id="profil" className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
    
      {/* Bagian Kiri: Map saja */}
      <div className="md:w-1/2 h-[400px]">
         <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.54848!2d112.789!3d-7.915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTQnNTQuMCJTIDExMsKwNDcnMjAuNCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" 
        className="w-full h-full border-0"
        allowFullScreen="" 
        loading="lazy"
        title="Lokasi Sekolah"
      ></iframe>
      </div>

    {/* Bagian Kanan: Info Kontak */}
    <div className="md:w-1/2 p-10 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4 text-[#1a4d2e]">Kontak Kami</h2>
      <p className="text-gray-500 mb-8">
        Hubungi kami untuk informasi lebih lanjut mengenai pendaftaran dan kegiatan sekolah.
      </p>
      <div className="space-y-4">
        <div className="border-l-4 border-green-600 pl-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Alamat</p>
          <p className="font-bold text-gray-800">Sumberngepoh, Lawang, Kab. Malang</p>
        </div>
        <div className="border-l-4 border-red-500 pl-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Telepon</p>
          <p className="text-red-500 font-bold text-2xl">+62 812-3456-7890</p>
        </div>
        <div className="border-l-4 border-gray-400 pl-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Email</p>
          <p className="text-gray-600 font-medium">info@minuruhuda.sch.id</p>
        </div>
      </div>
    </div>

  </div> {/* Penutup div flex */}
</section> {/* Penutup section profil */}

      {/* BERITA */}
      <section id="berita" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Berita Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {berita.length > 0 ? berita.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gray-300">
                   <img 
                     src={`/${item.gambar}`} 
                     className="w-full h-full object-cover" 
                     alt={item.judul} 
                     onError={(e) => { e.target.src = "https://via.placeholder.com/400x200" }}
                   />
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
      
      {/* FOOTER MODERN DENGAN MAP */}
      <footer id="kontak" className="bg-gray-100 py-20 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[450px]">
            
            {/* Bagian Kiri: Google Maps */}
            <div className="md:w-1/2 w-full h-[300px] md:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.5354432168925!2d112.7161685!3d-7.7214777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d05776d6342b%3A0x633513a48e7e163b!2sMI%20Nurul%20Huda%20Sumberngepoh!5e0!3m2!1sid!2sid!4v1713430000000!5m2!1sid!2sid" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy"
                title="Lokasi MI Nurul Huda"
              ></iframe>
            </div>

            {/* Bagian Kanan: Info Kontak (Desain Sesuai Gambar) */}
            <div className="md:w-1/2 w-full p-8 md:p-16 flex flex-col justify-center">
              <span className="text-green-600 font-bold tracking-widest text-sm uppercase mb-2">Kontak Kami</span>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              
              <p className="text-gray-500 mb-10 leading-relaxed">
                Silakan hubungi kami untuk informasi pendaftaran siswa baru, kegiatan akademik, atau kunjungan langsung ke sekolah.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-700">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Alamat</p>
                    <p className="text-gray-700 font-medium">Sumberngepoh, Lawang, Kab. Malang</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full text-red-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Telepon & WhatsApp</p>
                    <p className="text-red-600 font-bold text-2xl">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Email Resmi</p>
                    <p className="text-gray-700 font-medium">info@minuruhuda.sch.id</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Kecil di Bawah */}
          <div className="mt-12 text-center text-gray-400 text-sm">
            &copy; 2026 MI Nurul Huda Sumberngepoh. Created by Moch Rochman Fadila Faqih.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;