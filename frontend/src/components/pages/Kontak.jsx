import React from "react";
import Container from "../layout/Container";

export default function Kontak() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan seputar pendaftaran atau informasi sekolah? Silakan hubungi kami melalui formulir di bawah ini atau kontak resmi sekolah.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Info Kontak Kiri */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600">
              <h3 className="font-bold text-gray-800 mb-2">📍 Alamat</h3>
              <p className="text-sm text-gray-600">Desa Sumberngepoh, Lawang, Kab. Malang, Jawa Timur</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600">
              <h3 className="font-bold text-gray-800 mb-2">📞 Telepon / WA</h3>
              <p className="text-sm text-gray-600">+62 8xx-xxxx-xxxx</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600">
              <h3 className="font-bold text-gray-800 mb-2">✉️ Email</h3>
              <p className="text-sm text-gray-600">minurulhuda@sch.id</p>
            </div>
          </div>

          {/* Form Kanan */}
          <div className="md:col-span-2">
            <form className="bg-white p-8 rounded-2xl shadow-sm grid grid-cols-1 gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nama Lengkap" className="p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                <input type="email" placeholder="Email" className="p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <input type="text" placeholder="Subjek" className="p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              <textarea placeholder="Pesan Anda" rows="4" className="p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"></textarea>
              <button className="bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition">Kirim Pesan</button>
            </form>
          </div>
        </div>

        {/* Google Maps Placeholder */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-sm h-80 bg-gray-200 flex items-center justify-center">
           <p className="text-gray-500 italic">[ Masukkan Embed Google Maps Di Sini ]</p>
        </div>
      </Container>
    </div>
  );
}