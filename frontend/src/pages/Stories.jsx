import { useState, useEffect, useContext } from "react";
import StoryCard from "../components/StoryCard";
import SubmitWritingModal from "../components/SubmitWritingModal.jsx";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal";

const categories = [
  "All",
  "Happy",
  "Sad",
  "Inspiring",
  "Funny",
  "Short Story",
  "Life Experience",
  "Random",
];

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const API = import.meta.env.VITE_API_URL;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      try {
        const url =
          activeCategory === "All"
            ? `${API}/api/stories`
            : `${API}/api/stories/mood/${activeCategory}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch stories");
        const data = await res.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, [activeCategory]);
  useEffect(() => {
  if (location.state?.openSubmit && user) {
    setShowModal(true);
  }

  if (location.state?.openSubmit && !user) {
    setShowLogin(true);
  }
}, [location.state, user]);


  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-cyan-50 to-white">
      <h1 className="text-3xl font-bold text-teal-800 mb-6 text-center">
        Story Realms
      </h1>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeCategory === cat
                ? "bg-teal-500 text-white shadow-md"
                : "bg-teal-100 text-teal-700 hover:bg-teal-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Story Button */}
<div className="text-right mb-6">
 <button
  onClick={() => {
    if (!user) {
      setShowLogin(true);
    } else {
      setShowModal(true);
    }
  }}
  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl"
>
  ✨ Add Story
</button>

</div>

{loading && (
  <p className="text-center text-teal-600 mb-6 animate-pulse">
    Loading...
  </p>
)}

{error && (
  <p className="text-center text-red-500 mb-6">
    Error: {error}
  </p>
)}

      {/* Stories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>

      {/* Submit Modal */}
      {showModal && <SubmitWritingModal type="story" onClose={() => setShowModal(false)} />}

      {showLogin && (
  <LoginModal onClose={() => setShowLogin(false)} />
)}
    </div>
  );
}

