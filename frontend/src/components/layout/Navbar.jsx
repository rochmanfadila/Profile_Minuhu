import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const active = (path) =>
    loc.pathname === path ? "font-bold opacity-100" : "opacity-80 hover:opacity-100";

  return (
    <nav className="bg-green-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 font-bold text-sm tracking-widest uppercase">
          <img src={logo} alt="Logo MI Nurul Huda"
            className="w-12 h-12 object-contain"
          />
          MI NURUL HUDA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase">
          <Link to="/" className={active("/")}>Home</Link>
          <Link to="/profil" className={active("/profil")}>Profil</Link>
          <Link to="/berita" className={active("/berita")}>Berita</Link>
          <Link to="/kontak" className={active("/kontak")}>Kontak</Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
      </div>

      {open && (
        <div className="md:hidden bg-green-800 px-6 pb-4 flex flex-col gap-3 text-xs font-semibold tracking-widest uppercase">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/profil" onClick={() => setOpen(false)}>Profil</Link>
          <Link to="/berita" onClick={() => setOpen(false)}>Berita</Link>
          <Link to="/kontak" onClick={() => setOpen(false)}>Kontak</Link>
        </div>
      )}
    </nav>
  );
}