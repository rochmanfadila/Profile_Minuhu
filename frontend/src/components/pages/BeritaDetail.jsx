import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/ui/Loader";
import Container from "../components/layout/Container";

export default function BeritaDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/berita/${id}`)
      .then(res => setData(res.data.data || res.data));
  }, [id]);

  if (!data) return <Loader />;

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          {data.judul}
        </h1>

        {data.gambar && (
          <img src={data.gambar} className="rounded-lg mb-6" />
        )}

        <div className="text-gray-700 leading-relaxed space-y-4">
          {(data.konten || "").split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Container>
  );
}