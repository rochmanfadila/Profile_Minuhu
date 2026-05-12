import { useEffect, useState } from "react";
import axios from "axios";
// Tambahkan import di bagian atas file

const API = "https://profileminuhu-production.up.railway.app/api";

export default function Profil({ profile: propProfile, isHomePage }) {
  const [profile, setProfile] = useState(propProfile || {});

  useEffect(() => {
    if (!propProfile) {
      axios.get(`${API}/profile`)
        .then(res => setProfile(res.data.data || res.data))
        .catch(console.error);
    } else {
      setProfile(propProfile);
    }
  }, [propProfile]);

  const misiList = (profile?.misi || "").split("\n").filter(Boolean);

  return (
    <div>
      {/* Label + Judul */}
      <div className="text-center mb-8">
        <p className="text-xs font-bold text-green-600 tracking-widest uppercase mb-2">
          Profil Minuhu
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wide">
          {profile?.nama_sekolah || "MI Nurul Huda Sumberngepoh"}
        </h1>
      </div>

      {/* Grid foto + kartu */}
      <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
        {/* Foto gedung */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
          <img
            src="/assets/foto-gedung.jpeg"
            alt="Gedung Sekolah"
            className="w-full rounded-xl object-cover h-72"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Kartu kanan */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-2">
              🏫 Tentang Kami
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {profile?.deskripsi || "MI Nurul Huda adalah madrasah ibtidaiyah yang berdedikasi memberikan pendidikan berkualitas dengan landasan nilai-nilai Islam yang kuat."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">
              <p className="text-xs font-bold text-green-600 uppercase mb-2">👁 Visi</p>
              <p className="text-sm italic text-gray-500">
                {profile?.visi || "Terwujudnya Generasi yang Berakhlakul Karimah, Unggul dalam Prestasi, dan Berjiwa Qur’ani."}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">
              <p className="text-xs font-bold text-green-600 uppercase mb-2">🎯 Misi</p>
              {misiList.length > 0 ? (
                <ul className="text-sm text-gray-500 list-disc pl-4 leading-relaxed">
                  {misiList.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500">Menanamkan Aqidah dan Akhlak: Menyelenggarakan pendidikan yang berbasis pada nilai-nilai keislaman dan pembiasaan akhlak mulia dalam kehidupan sehari-hari.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Detail */}
      <div className="rounded-xl overflow-hidden shadow">
        <div className="bg-green-800 px-6 py-4">
          <h2 className="text-white text-sm font-bold uppercase tracking-widest">
            Informasi Detail Sekolah
          </h2>
        </div>
        <div className="bg-white divide-y">
          {[
            [{ lbl: "Nama Sekolah", val: profile?.nama_sekolah || "MI Nurul Huda" },
             { lbl: "NPSN", val: profile?.npsn || "-" }],
            [{ lbl: "Status", val: profile?.status || "Swasta" },
             { lbl: "Akreditasi", val: profile?.akreditasi || "B" }],
            [{ lbl: "Kepala Sekolah", val: profile?.kepala_sekolah || "-" },
             { lbl: "Tahun Berdiri", val: profile?.tahun_berdiri || "1973" }],
            [{ lbl: "Jumlah Siswa", val: `${profile?.jumlah_siswa || "500+"} siswa` },
             { lbl: "Alamat", val: profile?.alamat || "Desa Sumberngepoh, Lawang, Malang" }],
          ].map((row, ri) => (
            <div key={ri} className="grid grid-cols-2">
              {row.map((cell, ci) => (
                <div key={ci} className="px-6 py-4 border-r last:border-r-0">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                    › {cell.lbl}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">{cell.val}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}