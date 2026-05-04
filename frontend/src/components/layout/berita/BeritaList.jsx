import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/ui/Loader";
import Container from "../components/layout/Container";
import BeritaCard from "../components/berita/BeritaCard";

export default function Berita() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/berita")
      .then(res => setData(res.data.data || res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      <h1 className="text-2xl font-bold text-green-800 mb-6 mt-6">
        Berita Sekolah
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map(item => (
          <BeritaCard key={item.id} item={item} />
        ))}
      </div>
    </Container>
  );
}