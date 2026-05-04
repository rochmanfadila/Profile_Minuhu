import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://profileminuhu-production.up.railway.app/api';

const BeritaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/berita/${id}`);
        const data = res.data.data || res.data;
        setBerita(data);

        const resAll = await axios.get(`${API_BASE}/berita`);
        const all = resAll.data.data || resAll.data || [];

        setRelated(all.filter(b => String(b.id) !== String(id)).slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const content = berita?.konten ?? berita?.isi ?? '';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-green-800">
        Memuat berita...
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="text-center py-20">
        <p className="mb-4 text-gray-600">Berita tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-800 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_300px] gap-8">

        {/* MAIN */}
        <div className="bg-white rounded-xl shadow p-6 md:p-10">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-green-800 border border-green-800 px-3 py-1 rounded"
          >
            ← Kembali ke Berita
          </button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-gray-500">
            {berita.kategori && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                {berita.kategori}
              </span>
            )}
            <span>
              {new Date(berita.tanggal || berita.created_at).toLocaleDateString('id-ID')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
            {berita.judul}
          </h1>

          {/* Author */}
          {berita.penulis && (
            <p className="text-sm text-gray-600 mb-6">
              Oleh <span className="font-semibold">{berita.penulis}</span>
            </p>
          )}

          {/* Image */}
          {berita.gambar && (
            <img
              src={berita.gambar}
              alt={berita.judul}
              className="w-full h-[300px] object-cover rounded-lg mb-6"
            />
          )}

          {/* Content */}
          <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
            {content.split('\n').filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-6">
          <h3 className="font-bold text-green-900 mb-4 border-b pb-2">
            Berita Terkait
          </h3>

          {related.length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada berita lain.</p>
          ) : (
            <div className="space-y-4">
              {related.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/berita/${item.id}`)}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-16 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-gray-200 rounded" />
                  )}

                  <div>
                    <p className="text-sm font-semibold text-green-900 line-clamp-2">
                      {item.judul}
                    </p>
                    {item.kategori && (
                      <span className="text-xs text-green-600">
                        {item.kategori}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BeritaDetail;