// src/pages/CategoryList.jsx
import CategoryCard from "../components/CategoryCard";

export default function CategoryList() {
  const categories = [
    { title: "Sympathy Cards", count: 0, img: "/images/sympathy.jpeg" },
    { title: "Art", count: 4, img: "/images/art.jpeg" },
    { title: "Anniversary Cards", count: 0, img: "/images/anniversary.jpeg" },
    { title: "Wedding Cards", count: 0, img: "/images/wedding_cards.jpeg" },
    { title: "Thank You Cards", count: 0, img: "/images/thankyou.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        MEMORY VAULT
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            title={cat.title}
            count={cat.count}
            img={cat.img}
          />
        ))}
      </div>
    </div>
  );
}
