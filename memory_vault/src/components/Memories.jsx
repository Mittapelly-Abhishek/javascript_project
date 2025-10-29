import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllFiles, deleteFile, getFile, putFile } from "../utils/db";
import { motion } from "framer-motion";

export default function Memories() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null); // modal view
  const [editing, setEditing] = useState(null);   // name string being edited
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const categories = [
    "All",
    "Sympathy Cards",
    "Art",
    "Anniversary Cards",
    "Wedding Cards",
    "Thank You Cards"
  ];

  const load = () => getAllFiles().then(setFiles);
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const byCategory = filter === "All" ? files : files.filter(f => f.category === filter);
    const q = search.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(f =>
      f.name.toLowerCase().includes(q) ||
      (f.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }, [files, filter, search]);

  const stats = useMemo(() => {
    const total = files.length;
    const cats = new Set(files.map(f => f.category)).size;
    const favs = files.filter(f => f.favorite).length;
    return { total, cats, favs };
  }, [files]);

  const toggleFavorite = async (name) => {
    const item = await getFile(name);
    if (!item) return;
    await putFile({ ...item, favorite: !item.favorite });
    load();
  };

  const onDelete = async (name) => { await deleteFile(name); load(); };

  const openEdit = (name) => {
    setEditing(name);
    const f = files.find(x => x.name === name);
    setNewName(f?.name || "");
    setNewCategory(f?.category || "");
  };

  const saveEdit = async () => {
    const old = await getFile(editing);
    if (!old) return;
    const updated = { ...old, name: newName || old.name, category: newCategory || old.category };
    if (updated.name !== editing) {
      await deleteFile(editing);
    }
    await putFile(updated);
    setEditing(null); setNewName(""); setNewCategory("");
    load();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 transition-colors duration-500">
      <Navbar />

      {/* Search + Filters */}
      <div className="p-4 flex flex-col items-center gap-3">
        <input
          type="text"
          placeholder="Search memories or #tags..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xl bg-white dark:bg-neutral-900 dark:border-neutral-700"
        />
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setFilter(c)}
              className={`chip ${filter === c
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-700 dark:text-neutral-200"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length === 0 && (
          <p className="text-center col-span-full text-gray-500 dark:text-neutral-400">No memories found.</p>
        )}

        {filtered.map((f, idx) => {
          const url = URL.createObjectURL(f.data);
          const isVideo = f.data.type.includes("video");
          return (
            <motion.div
              key={f.name}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
            >
              <div className="relative">
                {isVideo ? (
                  <video src={url} className="w-full h-48 object-cover" controls />
                ) : (
                  <img
                    src={url}
                    alt={f.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelected(f)}
                  />
                )}
                <button
                  onClick={() => toggleFavorite(f.name)}
                  className={`absolute top-2 right-2 text-xl ${f.favorite ? "text-yellow-400" : "text-white/80"}`}
                  title="Favorite"
                >★</button>
              </div>

              <div className="p-3 text-center text-sm">
                <p className="font-semibold">{f.category}</p>
                <p className="truncate">{f.name}</p>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {(f.tags || []).map((t, i) =>
                    <span key={i} className="text-xs bg-gray-200 dark:bg-neutral-800 px-2 py-0.5 rounded-full">#{t}</span>
                  )}
                </div>

                <div className="flex justify-center gap-3 mt-2 text-xs">
                  <button onClick={() => setSelected(f)} className="text-blue-600 dark:text-blue-400 underline">View</button>
                  <button onClick={() => openEdit(f.name)} className="text-indigo-600 dark:text-indigo-400 underline">Edit</button>
                  <button onClick={() => onDelete(f.name)} className="text-red-600 underline">Delete</button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="px-6 pb-4 text-center text-sm text-gray-600 dark:text-neutral-400">
        <span className="mx-2">Total: <b>{stats.total}</b></span>
        <span className="mx-2">Categories: <b>{stats.cats}</b></span>
        <span className="mx-2">Favorites: <b>{stats.favs}</b></span>
      </div>

      <Footer text="YOUR SAVED MEMORIES" />

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-xl relative">
            <button className="absolute top-2 right-2 text-white bg-black/40 rounded px-2"
              onClick={() => setSelected(null)}>✖</button>
            <div className="p-4">
              {selected.data.type.includes("video") ? (
                <video src={URL.createObjectURL(selected.data)} controls className="w-full rounded" />
              ) : (
                <img src={URL.createObjectURL(selected.data)} alt={selected.name} className="w-full rounded" />
              )}
              <div className="mt-3 text-center">
                <p className="font-semibold">{selected.name}</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400">{selected.category}</p>
                <a
                  href={URL.createObjectURL(selected.data)}
                  download={selected.name}
                  className="inline-block mt-3 btn-outline"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-sm p-5">
            <h3 className="font-bold text-lg mb-3">Edit Memory</h3>
            <input
              type="text"
              className="border rounded w-full p-2 mb-3 bg-white dark:bg-neutral-900 dark:border-neutral-700"
              placeholder="New name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <select
              className="border rounded w-full p-2 mb-4 bg-white dark:bg-neutral-900 dark:border-neutral-700"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.filter(c => c !== "All").map((c, i) =>
                <option key={i} value={c}>{c}</option>
              )}
            </select>
            <div className="flex justify-between">
              <button onClick={() => setEditing(null)} className="px-3 py-1 rounded bg-gray-300 dark:bg-neutral-700">Cancel</button>
              <button onClick={saveEdit} className="px-3 py-1 rounded bg-blue-700 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

