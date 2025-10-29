// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserCircle2 } from "lucide-react"; // cool profile icon (from lucide-react library)

export default function Navbar() {
  const navigate = useNavigate();

  // initialize dark mode based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // apply and persist theme
  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);


  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // get user info (from localStorage)
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "Guest User";

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-neutral-900 shadow transition-colors duration-500">
      {/* Left side - App Title */}
      <h1
        onClick={() => navigate("/home")}
        className="text-lg font-semibold text-gray-800 dark:text-gray-100 cursor-pointer"
      >
        MEMORY VAULT
      </h1>

      {/* Right side - user + dark mode + logout */}
      <div className="flex items-center gap-5">
        {/* Profile Section */}
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <UserCircle2 className="w-6 h-6" />
          <span className="hidden sm:block text-sm">{userEmail}</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-xl transition"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}


