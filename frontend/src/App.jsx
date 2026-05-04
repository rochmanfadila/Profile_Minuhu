import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import Profil from "./pages/Profil";
import Berita from "./pages/Berita";
import BeritaDetail from "./pages/BeritaDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Profil />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;