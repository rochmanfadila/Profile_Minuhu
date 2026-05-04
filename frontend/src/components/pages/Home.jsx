import { useEffect, useState } from "react";
import axios from "axios";

// PERBAIKAN PATH IMPORT:
// Karena Home.jsx ada di src/components/pages/, 
// gunakan '../' untuk naik ke folder 'components'
import Navbar from "../layout/Navbar";
import Hero from "../Hero"; 
import Profil from "./Profil"; // Gunakan './' karena Profil.jsx ada di folder yang sama (pages)
import BeritaList from "../layout/berita/BeritaList"; 
import Kontak from "./Kontak/KontakDetail"; // Sesuaikan dengan nama file/folder kontak kamu
import Footer from "../layout/Footer";

const API = "https://profileminuhu-production.up.railway.app/api";

export default function Home() {
  const [profile, setProfile] = useState({});
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await axios.get(`${API}/profile`);
        const b = await axios.get(`${API}/berita`);
        setProfile(p.data.data || {});
        setBerita(b.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <Profil profile={profile} />
      <BeritaList berita={berita} />
      <Kontak profile={profile} />
      <Footer />
    </>
  );
}