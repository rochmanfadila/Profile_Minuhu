import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Hero from "../Hero";
import Profil from "./Profil";
import KontakDetail from "./Kontak/KontakDetail";
import Footer from "../layout/Footer";

const API = "https://profileminuhu-production.up.railway.app/api";

export default function Home({ profile }) {
  console.log("Data Profil yang diterima:", profile);
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get(`${API}/berita`);
        setBerita(res.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      }
    };
    fetchBerita();
  }, []);

  return (
    <>
      {/* HERO */}
      <Hero profile={profile} />

      {/* PROFIL */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <Profil profile={profile} isHomePage={true} />
        </div>
      </section>

      {/* BERITA TERBARU 🔥 */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Berita Terbaru
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {berita.slice(0, 3).map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {item.judul}
                </h3>

                <Link
                  to={`/berita/${item.id}`}
                  className="text-green-700 text-sm font-medium"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol ke halaman berita */}
        <div className="text-center mt-8">
          <Link
            to="/berita"
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </section>

      {/* KONTAK (MAPS BESAR) */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <KontakDetail profile={profile} simple />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}