export default function Hero({ profile }) {
  return (
    <div className="h-[400px] bg-green-900 text-white flex items-center justify-center text-center">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          "Sekolahku adalah surgaku"
        </h2>
        <p className="opacity-80">
          {profile.deskripsi || "Sekolah terbaik untuk masa depan."}
        </p>
      </div>
    </div>
  );
}