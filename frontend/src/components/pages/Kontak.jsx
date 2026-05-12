export default function KontakDetail({ profile }) {
  return (
    <div>
      {/* 3 kartu kontak */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl mb-3">📞</div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
          <p className="font-semibold text-gray-800">{profile?.telepon || "-"}</p>
          <p className="text-xs text-green-600 font-bold mt-2 cursor-pointer">Hubungi Sekarang ›</p>
        </div>
        <div className="bg-green-900 rounded-xl shadow p-6 text-center text-white">
          <div className="text-3xl mb-3">✉️</div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-1">Email</p>
          <p className="font-semibold">{profile?.email || "info@minurulhuda.sch.id"}</p>
          <p className="text-xs text-green-400 font-bold mt-2 cursor-pointer">Kirim Email ›</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl mb-3">📍</div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Head Office</p>
          <p className="text-sm text-gray-700">{profile?.alamat || "Desa Sumberngepoh, Lawang, Malang"}</p>
          <p className="text-xs text-green-600 font-bold mt-2 cursor-pointer">Lihat di Maps ›</p>
        </div>
      </div>

      {/* Peta full width */}
      <div className="bg-green-50 border border-green-200 rounded-xl h-80 flex items-center justify-center flex-col gap-2 text-green-700 w-full">
        <span className="text-5xl">🗺️</span>
        <span className="font-semibold text-base">Mi Nurul Huda Lawang</span>
        <span className="text-sm opacity-70">Desa Sumberngepoh, Kec. Lawang, Kab. Malang</span>
      </div>
    </div>
  );
}