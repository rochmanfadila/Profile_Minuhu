// src/components/pages/Profil.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://profileminuhu-production.up.railway.app/api";

export default function ProfilDetail({ isHomePage = false, profileData = null }) {
  const [profile, setProfile] = useState(profileData);
  const [loading, setLoading] = useState(!profileData);

  useEffect(() => {
    if (!profileData) {
      axios.get(`${API_BASE}/profile`)
        .then(res => setProfile(res.data.data || res.data))
        .catch(() => console.error("Gagal ambil profil"))
        .finally(() => setLoading(false));
    }
  }, [profileData]);

  if (loading) return null; // Agar tidak muncul loading dobel di Home

  return (
    <div className={`${isHomePage ? "" : "bg-gray-50 min-h-screen"}`}>

      {/* Tampilkan HERO & STATS hanya jika BUKAN di halaman Home */}
      {!isHomePage && (
        <>
          <section className="bg-gradient-to-r from-green-900 to-green-700 text-center text-white py-16 px-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {profile?.nama_sekolah || "MI Nurul Huda"}
            </h1>
            <p className="mt-2 text-green-200 italic">
              {profile?.tagline || "Mencetak generasi rabbani"}
            </p>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 text-center bg-green-900 text-white">
            {[
              { label: "Siswa", value: profile?.jumlah_siswa || "500+" },
              { label: "Guru", value: profile?.jumlah_guru || "30+" },
              { label: "Akreditasi", value: profile?.akreditasi || "A" },
              { label: "Berdiri", value: profile?.tahun_berdiri || "2009" },
            ].map((item, i) => (
              <div key={i} className="py-6 border border-white/10">
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-sm text-green-200">{item.label}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {/* ISI CONTENT (Ini yang akan muncul di Home) */}
      <div className={`max-w-4xl mx-auto p-6 space-y-6 ${isHomePage ? "py-12" : ""}`}>
        
        {/* Judul Seksi jika di Home */}
        {isHomePage && (
          <h2 className="text-3xl font-bold text-green-900 text-center mb-8">Profil Sekolah</h2>
        )}

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Tentang Sekolah</h2>
          <p className="text-gray-600 leading-relaxed">
            {profile?.deskripsi || "Deskripsi sekolah belum tersedia."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-green-800 mb-2">Visi</h2>
            <p className="text-gray-600">{profile?.visi || "Visi belum tersedia"}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-green-800 mb-2">Misi</h2>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              {(profile?.misi ? profile.misi.split("\n") : ["Misi belum tersedia"]).map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}