import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Profil from "../components/Profil";
import BeritaList from "../components/BeritaList";
import Kontak from "../components/Kontak";
import Footer from "../components/Footer";

const API = "https://profileminuhu-production.up.railway.app/api";

export default function Home() {
  const [profile, setProfile] = useState({});
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const p = await axios.get(`${API}/profile`);
      const b = await axios.get(`${API}/berita`);
      setProfile(p.data.data || {});
      setBerita(b.data.data || []);
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