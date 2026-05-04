import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://profileminuhu-production.up.railway.app/api";

export default function ProfilDetail() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/profile`)
      .then(res => setProfile(res.data.data || res.data))
      .catch(() => console.error("Gagal ambil profil"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-700 rounded-full animate-spin"></div>
        <p className="text-green-700">Memuat profil...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-center text-white py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          {profile?.nama_sekolah || "MI Nurul Huda"}
        </h1>
        <p className="mt-2 text-green-200 italic">
          {profile?.tagline || "Mencetak generasi rabbani"}
        </p>
      </section>

      {/* STATS */}
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

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Tentang */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Tentang Sekolah
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {profile?.deskripsi || "Deskripsi sekolah belum tersedia."}
          </p>
        </div>

        {/* Visi Misi */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-green-800 mb-2">Visi</h2>
            <p className="text-gray-600">
              {profile?.visi || "Visi belum tersedia"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-green-800 mb-2">Misi</h2>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              {(profile?.misi
                ? profile.misi.split("\n")
                : ["Misi belum tersedia"]
              ).map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Info */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Informasi Sekolah
          </h2>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <p><b>Nama:</b> {profile?.nama_sekolah}</p>
            <p><b>NPSN:</b> {profile?.npsn}</p>
            <p><b>Status:</b> {profile?.status}</p>
            <p><b>Kepala:</b> {profile?.kepala_sekolah}</p>
            <p><b>Alamat:</b> {profile?.alamat}</p>
          </div>
        </div>

      </div>
    </div>
  );
}