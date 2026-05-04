export default function Kontak({ profile }) {
  return (
    <section id="kontak" className="py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Kontak</h2>
      <p>{profile.telepon || "08xxxx"}</p>
      <p>{profile.email || "email@gmail.com"}</p>
    </section>
  );
}