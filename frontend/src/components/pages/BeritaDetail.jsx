import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Gunakan beritaService dan pastikan folder 'service' (tanpa s)
import { beritaService } from "../../service/api"; 
// Loader ada di ../ui/ (naik satu tingkat dari pages ke components)
import Loader from "../ui/Loader"; 
import Container from "../layout/Container";

export default function BeritaDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    beritaService.getBeritaById(id)
      .then(res => setData(res.data.data || res.data))
      .catch(err => console.error("Gagal memuat detail:", err));
  }, [id]);

  if (!data) return <Loader />;

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-bold text-green-800 mb-4">{data.judul}</h1>
        {data.gambar && (
          <img src={data.gambar} alt={data.judul} className="w-full h-auto rounded-lg mb-6 object-cover" />
        )}
        <div className="text-gray-700 leading-relaxed space-y-4">
          {(data.isi_berita || data.konten || "").split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Container>
  );
}