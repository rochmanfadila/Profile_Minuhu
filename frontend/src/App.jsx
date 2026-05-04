import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import Profil from "./components/pages/Profil";
import Berita from "./components/pages/Berita";
import BeritaDetail from "./components/pages/BeritaDetail";
import Home from "./components/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;