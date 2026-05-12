import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Profil from "./components/pages/Profil";
import Berita from "./components/pages/Berita";
import BeritaDetail from "./components/pages/BeritaDetail";
import Home from "./components/pages/Home";
import Kontak from "./components/pages/Kontak";

const API = "https://profileminuhu-production.up.railway.app/api";

function App() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Ambil data profile di level paling atas agar bisa dipakai Navbar
    axios.get(`${API}/profile`)
      .then(res => setProfile(res.data.data || {}))
      .catch(err => console.error("Gagal ambil profile:", err));
  }, []);

  return (
    <>
      {/* Kirim data profile ke Navbar di sini */}
      <Navbar profile={profile} />

      <Routes>
        <Route path="/" element={<Home profile={profile} />} />
        <Route path="/profil" element={<Profil profile={profile} />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </>
  );
}

export default App;