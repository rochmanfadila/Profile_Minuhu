export default function Hero({ profile }) {
  return (
    <section className="relative h-[400px]">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/webp70/1200x/71/6d/17/716d17054496eb12098b990de2538522.webp"
        alt="Hero Background"
        className="w-full h-full object-cover"
      />

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-green-900/60 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          MI NURUL HUDA
        </h1>
        <p className="mt-2 text-sm md:text-lg">
          Mewujudkan Generasi Islami dan Berprestasi
        </p>
      </div>
    </section>
  );
}