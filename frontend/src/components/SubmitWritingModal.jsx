import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const poetryCategories = [
  "Dream", "Random", "Gothic", "Love", "Healing",
  "Nature", "Philosophy", "Existential", "Spiritual"
];

const storyCategories = [
  "Happy", "Sad", "Inspiring", "Funny",
  "Short Story", "Life Experience", "Random"
];

export default function SubmitWritingModal({ onClose, type, editData }) {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setContent(editData.content || "");
      setCategory(editData.category || editData.mood || "");
      setAnonymous(editData.anonymous || false);
    }
  }, [editData]);

  const categories = type === "poem" ? poetryCategories : storyCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEdit = !!editData;

      const url = isEdit
        ? type === "poem"
          ? `${import.meta.env.VITE_API_URL}/poems/my/${editData._id}`
          : `${import.meta.env.VITE_API_URL}/stories/my/${editData._id}`
        : type === "poem"
          ? `${import.meta.env.VITE_API_URL}/poems`
          : `${import.meta.env.VITE_API_URL}/stories`;

      const payload = type === "poem"
        ? { title, content, category, anonymous }
        : { title, content, mood: category, anonymous };

      if (isEdit) {
        await axios.put(url, payload, { headers: { Authorization: `Bearer ${user.token}` } });
        setSuccess("✏️ Updated & sent for re-approval");
      } else {
        await axios.post(url, payload, { headers: { Authorization: `Bearer ${user.token}` } });
        setSuccess("✨ Submitted for approval!");
      }

      setTimeout(() => onClose(), 1200);
    } catch {
      setError("Action failed. Try again.");
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center text-white">
          <p className="mb-4">Login to submit your writing ✨</p>
          <button onClick={onClose} className="bg-teal-500 px-6 py-2 rounded-full">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-lg text-white relative"
      >
      <button
  type="button"
  onClick={onClose}
  className="absolute top-3 right-4 text-xl"
>
  ✕
</button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {editData ? "Edit" : "Submit"} Your {type === "poem" ? "Poem" : "Story"}
        </h2>

        {error && <p className="text-red-300 text-center mb-3">{error}</p>}
        {success && <p className="text-green-300 text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 cursor-pointer"
/>


          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded-xl bg-white/30 text-white focus:ring-2 focus:ring-teal-300
            [&_option]:text-black [&_option]:bg-white"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

        <textarea
  rows="6"
  placeholder="Write your heart here..."
  value={content}
  onChange={(e) => setContent(e.target.value)}
  required
  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 cursor-pointer"
/>


          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Post as Anonymous
          </label>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-xl"
          >
            {editData ? "Update & Send for Review" : "Submit for Review"}
          </button>

        </form>
      </motion.div>
    </div>
  );
}
