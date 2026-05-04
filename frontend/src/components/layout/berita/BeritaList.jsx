import { useEffect, useState } from "react";
// Gunakan kurung kurawal dan pastikan folder bernama 'service'
import { beritaService } from "../../../service/api"; 
// Loader ada di ../../ui/
import Loader from "../ui/Loader";   
import Container from "../../layout/Container"; // Sesuaikan jika Container ada di layout
import BeritaCard from "./BeritaCard";

export default function Berita() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    beritaService.getBerita()
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