import Navbar from "./Navbar";
import Footer from "./Footer";
import { Settings, Plus } from "lucide-react";

const categories = [
  { name: "Sympathy Cards", count: 0 },
  { name: "Art", count: 4 },
  { name: "Anniversary Cards", count: 0 },
  { name: "Wedding Cards", count: 0 },
  { name: "Thank You Cards", count: 0 },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4">
        {categories.map((cat, i) => (
          <div key={i} className="relative mb-4 rounded-lg overflow-hidden shadow">
            <img
              src={`https://source.unsplash.com/random/400x200?${cat.name}`}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-4">
              <h3 className="text-white text-lg font-semibold">{cat.name}</h3>
              <p className="text-gray-200 text-sm">{cat.count} MEMORIES</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-around border-t py-3 text-sm font-medium text-gray-700">
        <button className="flex items-center gap-1">
          <Settings className="w-4 h-4" /> MANAGE CATEGORIES
        </button>
        <button className="flex items-center gap-1">
          <Plus className="w-4 h-4" /> ADD NEW CATEGORY
        </button>
      </div>
      <Footer text="MENU OPTIONS" />
    </div>
  );
}

// src/pages/Categories.jsx
