// src/components/Home.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6 flex-grow">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Your Memories, Safely Stored
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/memories")}
            className="px-8 py-3 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
          >
            Browse Memories
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="px-8 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 font-medium transition"
          >
            Add Keepsake
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-gray-500 dark:text-neutral-400 text-sm">
        OUR HOMEPAGE
      </footer>
    </div>
  );
}

