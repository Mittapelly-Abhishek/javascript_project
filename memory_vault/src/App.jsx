// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Home from "./components/Home";
// import Categories from "./components/Categories"; // old one (keep if used elsewhere)
// import Upload from "./components/Upload";
// import CategoryList from "./pages/CategoryList"; // ✅ new page with image backgrounds

// export default function App() {
//   const isLoggedIn = localStorage.getItem("user");

//   return (
//     <Routes>
//       {/* Login Page */}
//       <Route path="/" element={<Login />} />

//       {/* Home Page */}
//       <Route
//         path="/home"
//         element={isLoggedIn ? <Home /> : <Navigate to="/" />}
//       />

//       {/* Old Categories (if still needed) */}
//       <Route
//         path="/categories-old"
//         element={isLoggedIn ? <Categories /> : <Navigate to="/" />}
//       />

//       {/* ✅ New Category List with Background Images */}
//       <Route
//         path="/categories"
//         element={isLoggedIn ? <CategoryList /> : <Navigate to="/" />}
//       />

//       {/* Upload Page */}
//       <Route
//         path="/upload"
//         element={isLoggedIn ? <Upload /> : <Navigate to="/" />}
//       />
//     </Routes>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Memories from "./components/Memories";
import Upload from "./components/Upload";

const Guard = ({ children }) => {
  const authed = !!localStorage.getItem("user");
  return authed ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Guard><Home /></Guard>} />
      <Route path="/memories" element={<Guard><Memories /></Guard>} />
      <Route path="/upload" element={<Guard><Upload /></Guard>} />
      <Route path="*" element={<Navigate to={!!localStorage.getItem("user") ? "/home" : "/"} replace />} />
    </Routes>
  );
}

