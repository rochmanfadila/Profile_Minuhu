import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-900 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="font-bold text-lg">MINUHU</h1>

        <div className="flex gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/profil">Profil</Link>
          <Link to="/berita">Berita</Link>
        </div>
      </div>
    </nav>
  );
}