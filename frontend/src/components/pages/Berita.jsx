import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "../layout/Container";

const API = "https://profileminuhu-production.up.railway.app/api";

export default function Berita() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/berita`)
      .then((res) => {
        setBeritaList(res.data.data || res.data || []);
      })
      .catch((err) => console.error("Gagal ambil berita:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = beritaList.filter((b) =>
    b.judul?.toLowerCase().includes(search.toLowerCase())
  );

  const formatTanggal = (str) => {
    if (!str) return "";
    return new Date(str).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-green-900 text-white py-14 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Berita & Informasi</h1>
        <p className="text-green-300 text-sm">
          Kabar terkini dari MI Nurul Huda Lawang
        </p>

        {/* Search */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      <Container>
        <div className="py-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">📰</p>
              <p className="text-lg font-semibold">Belum ada berita</p>
              <p className="text-sm mt-1">
                {search ? "Coba kata kunci lain" : "Nantikan berita terbaru dari kami"}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Menampilkan {filtered.length} berita
              </p>

              {/* Featured (berita pertama besar) */}
              {!search && filtered.length > 0 && (
                <Link
                  to={`/berita/${filtered[0]._id || filtered[0].id}`}
                  className="block mb-8 group"
                >
                  <div className="bg-white rounded-2xl shadow overflow-hidden md:flex hover:shadow-lg transition">
                    {filtered[0].gambar ? (
                      <img
                        src={"/" + filtered[0].gambar}
                        alt={filtered[0].judul}
                        className="w-full md:w-1/2 h-56 md:h-72 object-cover"
                      />
                    ) : (
                      <div className="w-full md:w-1/2 h-56 md:h-72 bg-green-100 flex items-center justify-center text-5xl">
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full w-fit mb-3">
                        Terbaru
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-green-700 transition mb-3 line-clamp-3">
                        {filtered[0].judul}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        {formatTanggal(filtered[0].createdAt)}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {(filtered[0].isi_berita || filtered[0].konten || "").substring(0, 200)}...
                      </p>
                      <span className="mt-4 text-xs font-bold text-green-700 group-hover:underline">
                        Baca Selengkapnya →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid berita lainnya */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(search ? filtered : filtered.slice(1)).map((b) => (
                  <Link
                    key={b._id || b.id}
                    to={`/berita/${b._id || b.id}`}
                    className="group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                  >
                    {b.gambar ? (
                      <img
                        src={"/" + b.gambar}
                        alt={b.judul}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-44 bg-green-50 flex items-center justify-center text-4xl">
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">
                        {formatTanggal(b.createdAt)}
                      </p>
                      <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition line-clamp-2 mb-2">
                        {b.judul}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {(b.isi_berita || b.konten || "").substring(0, 120)}...
                      </p>
                      <span className="mt-3 inline-block text-xs font-bold text-green-700">
                        Baca →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}