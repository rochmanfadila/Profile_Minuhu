export default function BeritaCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={item.gambar}
        alt={item.judul}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {item.judul}
        </h3>
      </div>
    </div>
  );
}