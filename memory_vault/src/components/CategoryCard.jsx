// src/components/CategoryCard.jsx
export default function CategoryCard({ title, count, img }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg h-52 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center transform transition duration-300 hover:scale-[1.02]"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 p-4 z-10 text-white">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-sm opacity-90">{count} MEMORIES</p>
      </div>
    </div>
  );
}
