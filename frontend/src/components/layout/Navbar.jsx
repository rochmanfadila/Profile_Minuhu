import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-800 text-white sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <h1 className="font-bold text-lg">MI NURUL HUDA</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/profil">Profil</Link>
          <Link to="/berita">Berita</Link>
          <Link to="/kontak">Kontak</Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-green-700 px-4 pb-4 space-y-3">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/profil" onClick={() => setOpen(false)}>Profil</Link>
          <Link to="/berita" onClick={() => setOpen(false)}>Berita</Link>
          <Link to="/kontak" onClick={() => setOpen(false)}>Kontak</Link>
        </div>
      )}
    </nav>
  );
}