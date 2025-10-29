// // import { useState } from "react";
// // import Compressor from "compressorjs";
// // import { useNavigate } from "react-router-dom";

// // export default function Upload() {
// //   const [file, setFile] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const [error, setError] = useState("");
// //   const [saved, setSaved] = useState(false);
// //   const navigate = useNavigate();

// //   // Save file data to IndexedDB
// //   const saveToIndexedDB = (fileBlob, name) => {
// //     const openReq = indexedDB.open("MemoryVaultDB", 1);
// //     openReq.onupgradeneeded = () => {
// //       openReq.result.createObjectStore("files", { keyPath: "name" });
// //     };
// //     openReq.onsuccess = () => {
// //       const db = openReq.result;
// //       const tx = db.transaction("files", "readwrite");
// //       tx.objectStore("files").put({ name, data: fileBlob });
// //       tx.oncomplete = () => setSaved(true);
// //     };
// //   };

// //   const handleFileChange = (e) => {
// //     const selected = e.target.files[0];
// //     if (!selected) return;
// //     if (!["image/jpeg", "image/png", "video/mp4"].includes(selected.type)) {
// //       setError("Only JPG, PNG, or MP4 allowed");
// //       return;
// //     }
// //     setError("");
// //     setFile(selected);
// //   };

// //   const handleUpload = () => {
// //     if (!file) return setError("Select a file first");
// //     const process = (blob) => {
// //       let uploaded = 0;
// //       const interval = setInterval(() => {
// //         uploaded += 10;
// //         setProgress(uploaded);
// //         if (uploaded >= 100) {
// //           clearInterval(interval);
// //           saveToIndexedDB(blob, file.name);
// //         }
// //       }, 150);
// //     };

// //     if (file.size > 10 * 1024 * 1024) {
// //       new Compressor(file, { quality: 0.6, success: process });
// //     } else process(file);
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
// //         <h2 className="text-2xl font-bold mb-6">Upload Your Memory</h2>
// //         <input type="file" onChange={handleFileChange} className="mb-4 w-full border p-2 rounded" />
// //         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
// //         {progress > 0 && (
// //           <div className="mb-4">
// //             <div className="w-full bg-gray-200 h-3 rounded-full">
// //               <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
// //             </div>
// //             <p className="text-sm mt-2 text-gray-600">{progress}% uploaded</p>
// //           </div>
// //         )}
// //         {saved ? (
// //           <>
// //             <p className="text-green-600 font-medium mb-4">File saved successfully 🎉</p>
// //             <button onClick={() => navigate("/home")} className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">
// //               Back to Home
// //             </button>
// //           </>
// //         ) : (
// //           <button onClick={handleUpload} className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">
// //             Upload
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import Compressor from "compressorjs";
// import { putFile } from "../utils/db";
// import { useNavigate } from "react-router-dom";

// import Navbar from "./Navbar";

// export default function Upload() {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 transition-colors duration-500">
//       <Navbar />

//       <main className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Upload a Memory</h1>
//         {/* your upload form here */}
//       </main>
//     </div>
//   );
// }


// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [category, setCategory] = useState("");
//   const [tagsText, setTagsText] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [saved, setSaved] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const categories = ["Sympathy Cards","Art","Anniversary Cards","Wedding Cards","Thank You Cards"];

//   const onFile = (e) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     if (!["image/jpeg","image/png","video/mp4"].includes(f.type)) {
//       setError("Only JPG, PNG or MP4"); return;
//     }
//     setError("");
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const simulate = (blob) => {
//     let p = 0;
//     const timer = setInterval(() => {
//       p += 10; setProgress(p);
//       if (p >= 100) { clearInterval(timer); save(blob); }
//     }, 120);
//   };

//   const save = async (blob) => {
//     const tags = tagsText.split(",").map(t => t.trim()).filter(Boolean);
//     const rec = {
//       name: file.name,
//       category,
//       data: blob,
//       tags,
//       favorite: false,
//       createdAt: Date.now(),
//     };
//     await putFile(rec);
//     setSaved(true);
//   };

//   const upload = () => {
//     if (!file) return setError("Select a file");
//     if (!category) return setError("Select a category");
//     if (file.size > 10*1024*1024) {
//       new Compressor(file, { quality: 0.6, success: simulate, error: ()=>setError("Compression failed") });
//     } else simulate(file);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
//       <div className="card w-[380px] p-8 text-center">
//         <h2 className="text-2xl font-bold mb-6">Upload Your Memory</h2>

//         <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 w-full mb-3 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700">
//           <option value="">Select Category</option>
//           {categories.map((c,i)=><option key={i} value={c}>{c}</option>)}
//         </select>

//         <input type="text" placeholder="Tags (comma separated)" value={tagsText} onChange={e=>setTagsText(e.target.value)}
//           className="border p-2 w-full mb-3 rounded bg-white dark:bg-neutral-900 dark:border-neutral-700" />

//         <input type="file" onChange={onFile} className="mb-4 w-full border p-2 rounded dark:border-neutral-700" />

//         {preview && (
//           <div className="mb-4">
//             <img src={preview} alt="preview" className="rounded-lg border shadow-sm max-h-48 mx-auto dark:border-neutral-700" />
//           </div>
//         )}

//         {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

//         {progress > 0 && (
//           <div className="mb-4">
//             <div className="w-full bg-gray-200 dark:bg-neutral-800 h-3 rounded-full">
//               <div className="bg-blue-700 h-3 rounded-full" style={{ width: `${progress}%` }} />
//             </div>
//             <p className="text-xs mt-2 text-gray-600 dark:text-neutral-400">{progress}% uploaded</p>
//           </div>
//         )}

//         {saved ? (
//           <>
//             <p className="text-green-600 font-medium mb-3">Saved successfully 🎉</p>
//             <button onClick={()=>navigate("/memories")} className="btn-primary w-full">View in Memories</button>
//           </>
//         ) : (
//           <button onClick={upload} className="btn-primary w-full">Upload</button>
//         )}
//       </div>
//     </div>
//   );
// }


// src/components/Upload.jsx
import { useState } from "react";
import Navbar from "./Navbar";
import { putFile } from "../utils/db";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const categories = [
    "Sympathy Cards",
    "Art",
    "Anniversary Cards",
    "Wedding Cards",
    "Thank You Cards"
  ];

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f && f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file || !category) {
      alert("Please select a file and category.");
      return;
    }

    const tags = tagsText
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const blob = new Blob([reader.result], { type: file.type });
      const data = {
        name: file.name,
        category,
        tags,
        favorite: false,
        data: blob,
      };
      await putFile(data);
      setProgress(100);
      setTimeout(() => navigate("/memories"), 800);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Upload a Memory</h1>

        <div className="w-full max-w-md space-y-4">
          {/* File Input */}
          <div>
            <label className="block text-sm mb-1 font-medium">Choose File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 dark:text-neutral-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1 font-medium">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-2 bg-white dark:bg-neutral-900 dark:border-neutral-700"
            >
              <option value="">-- Choose --</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm mb-1 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="e.g. vacation, family, fun"
              className="w-full border rounded p-2 bg-white dark:bg-neutral-900 dark:border-neutral-700"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="preview" className="w-full rounded shadow" />
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded transition"
          >
            Upload
          </button>

          {/* Progress */}
          {progress > 0 && (
            <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
              Uploading... {progress}%
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

