import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#1a4d2e] text-white p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">MI NURUL HUDA</h1>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          <Link to="/profile">Profil</Link>
          <Link to="/berita">Berita</Link>
          <Link to="/kontak">Kontak</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col mt-4 gap-3 md:hidden">
          <Link to="/profile" onClick={() => setOpen(false)}>Profil</Link>
          <Link to="/berita" onClick={() => setOpen(false)}>Berita</Link>
          <Link to="/kontak" onClick={() => setOpen(false)}>Kontak</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;