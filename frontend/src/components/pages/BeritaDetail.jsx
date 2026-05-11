import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { beritaService } from "../../service/api"; // sesuaikan kalau beda
import Loader from "../layout/ui/Loader";
import Container from "../layout/Container";

export default function BeritaDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    beritaService.getById(id)
      .then(res => setData(res?.data || res))
      .catch(err => console.error(err));
  }, [id]);

  if (!data) return <Loader />;

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-10">

        {/* Gambar utama */}
        {data.gambar && (
          <img
            src={"/" + data.gambar}
            alt={data.judul}
            className="w-full h-[400px] object-cover rounded-xl mb-6 shadow"
          />
        )}

        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
          {data.judul}
        </h1>

        {/* Meta info */}
        <p className="text-sm text-gray-500 mb-6">
          Dipublikasikan pada {data.createdAt || "Tanggal tidak tersedia"}
        </p>

        {/* Konten */}
        <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
          {(data.isi_berita || data.konten || "")
            .split("\n")
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>

      </div>
    </Container>
  );
}