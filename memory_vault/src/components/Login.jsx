// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (password === "memory123") {
//       localStorage.setItem("user", JSON.stringify({ email }));
//       navigate("/home");
//     } else {
//       setError("Invalid credentials! Use any email and password: memory123");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-md w-96 text-center"
//       >
//         <h2 className="text-2xl font-bold mb-6">Memory Vault Login</h2>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 w-full mb-4 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password (use memory123)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full mb-4 rounded"
//           required
//         />
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === "memory123") {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/home");
    } else {
      setErr("Invalid credentials. Use any email + password: memory123");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
      <form onSubmit={onSubmit} className="card w-[380px] text-center p-8">
        <h2 className="text-2xl font-bold mb-6">Memory Vault Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 dark:border-neutral-700 p-2 rounded w-full mb-3 bg-white dark:bg-neutral-900"
          value={email} onChange={(e)=>setEmail(e.target.value)} required
        />
        <input
          type="password"
          placeholder="Password (memory123)"
          className="border border-gray-300 dark:border-neutral-700 p-2 rounded w-full mb-4 bg-white dark:bg-neutral-900"
          value={password} onChange={(e)=>setPassword(e.target.value)} required
        />
        {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
        <button className="w-full btn-primary">Login</button>
      </form>
    </div>
  );
}

