import fotoGedung from "../assets/foto-gedung.jpeg";

export default function Hero({ profile }) {
  return (
    <section className="relative h-[400px]">
      <img
        src={fotoGedung}
        alt="Hero Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-green-900/60 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">MI NURUL HUDA</h1>
        <p className="mt-2 text-sm md:text-lg">
          {profile?.motto || "Mewujudkan Generasi Islami dan Berprestasi"}
        </p>
      </div>
    </section>
  );
}