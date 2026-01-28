import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import SubmitWritingModal from "../components/SubmitWritingModal";

export default function MySubmissions() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    if (!user) return;

    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/poems/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/stories/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    ])
      .then(([poems, stories]) => {
        setItems([
          ...poems.data.map(p => ({ ...p, type: "Poem", status: p.approved ? "approved" : "pending" })),
          ...stories.data.map(s => ({ ...s, type: "Story", status: s.approved ? "approved" : "pending" })),
        ]);
      })
      .catch(err => console.error("Failed to load submissions", err))
      .finally(() => setLoading(false));
  }, [user]);

 const handleDelete = async (id, type) => {
  if (!window.confirm("Delete this submission permanently?")) return;

  try {
    const url =
      type === "Poem"
        ? `${import.meta.env.VITE_API_URL}/poems/my/${id}`
        : `${import.meta.env.VITE_API_URL}/stories/my/${id}`;

    await axios.delete(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setItems(items.filter((item) => item._id !== id));
  } catch (err) {
    alert("Failed to delete submission");
  }
};



  if (loading) return <p className="text-center mt-10">Loading your writings...</p>;

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-cyan-50 to-white">
      <h1 className="text-3xl font-bold text-teal-800 mb-6 text-center">
        My Writings
      </h1>

      {items.length === 0 && (
        <p className="text-center text-gray-600">You haven't submitted anything yet 🌱</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <div
            key={i._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition relative"
          >
            <h2 className="font-semibold text-lg mb-1">{i.title || "Untitled"}</h2>

            <p className="text-sm text-gray-500 mb-2">
              {i.type} · {i.category || i.mood}
            </p>

            <span
              className={`inline-block text-xs px-3 py-1 rounded-full mb-3 ${
                i.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {i.status.toUpperCase()}
            </span>

            <p className="text-gray-700 text-sm line-clamp-4">
              {i.content}
            </p>
            <button
  onClick={() => {
    setEditItem(i);
    setShowEditModal(true);
  }}
  className="absolute top-3 right-20 text-blue-500 hover:text-blue-700 text-sm"
>
  ✏️ Edit
</button>


            <button
              onClick={() => handleDelete(i._id, i.type)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
      {showEditModal && (
  <SubmitWritingModal
    onClose={() => setShowEditModal(false)}
       
    type={editItem.type === "Poem" ? "poem" : "story"}
    editData={editItem}
  />
)}

    </div>
  );
}
