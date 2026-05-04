export default function Navbar({ profile }) {
  return (
    <nav className="bg-green-800 text-white p-4 sticky top-0">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold">
          {profile.nama_sekolah || "MI NURUL HUDA"}
        </h1>
        <div className="space-x-6 text-sm">
          <a href="#profil">Profil</a>
          <a href="#berita">Berita</a>
          <a href="#kontak">Kontak</a>
        </div>
      </div>
    </nav>
  );
}