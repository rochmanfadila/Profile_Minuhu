import { useNavigate } from "react-router-dom";

export default function BeritaCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/berita/${item.id}`)}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      {item.gambar && (
        <img src={item.gambar} className="h-40 w-full object-cover" />
      )}

      <div className="p-4">
        <h3 className="font-semibold text-green-800 line-clamp-2">
          {item.judul}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {item.kategori}
        </p>
      </div>
    </div>
  );
}