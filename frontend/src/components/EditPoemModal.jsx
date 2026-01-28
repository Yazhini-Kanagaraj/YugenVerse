import { useState } from "react";
import axios from "axios";

export default function EditPoemModal({ poem, user, onClose, onUpdated }) {
  const [title, setTitle] = useState(poem.title || "");
  const [content, setContent] = useState(poem.content || "");
  const [category, setCategory] = useState(poem.category || "Dream");
  const [anonymous, setAnonymous] = useState(poem.anonymous || false);
  const [loading, setLoading] = useState(false);

  const allowedCategories = [
    "Dream",
    "Random",
    "Gothic",
    "Love",
    "Healing",
    "Nature",
    "Philosophy",
    "Existential",
    "Spiritual"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/poems/my/${poem._id}`,
        { title, content, category, anonymous },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      onUpdated(res.data.poem); // update parent state
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update poem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Poem</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border px-3 py-2 rounded w-full h-32 resize-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            {allowedCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Submit as Anonymous
          </label>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
