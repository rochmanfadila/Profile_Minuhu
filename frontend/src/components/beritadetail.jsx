import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://profileminuhu-production.up.railway.app/api";

const DetailBerita = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`${API}/berita/${id}`)
      .then(res => setData(res.data.data));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.judul}</h1>
      <p>{data.isi}</p>
    </div>
  );
};

export default DetailBerita;