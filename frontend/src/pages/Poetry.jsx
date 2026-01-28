import { useState, useEffect, useContext } from "react";
import PoemCard from "../components/PoemCard";
import SubmitWritingModal from "../components/SubmitWritingModal.jsx";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal";
const API = import.meta.env.VITE_API_URL;
const categories = [
  "All",
  "Dream",
  "Random",
  "Gothic",
  "Love",
  "Healing",
  "Nature",
  "Philosophy",
  "Existential",
  "Spiritual",
];

export default function Poetry() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();


  useEffect(() => {
    async function fetchPoems() {
      setLoading(true);
      try {
        const url =
          activeCategory === "All"
            ? `${API}/poems`
            : `${API}/poems/category/${activeCategory}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch poems");
        const data = await res.json();
        setPoems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPoems();
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
        Poetry Realms
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

     {/* Add Poem Button */}
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
  ✨ Add Poem
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


      {/* Poems Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem) => (
          <PoemCard key={poem._id} poem={poem} />
        ))}
      </div>

      {/* Submit Modal */}
      {showModal && <SubmitWritingModal type="poem" onClose={() => setShowModal(false)} />}


{showLogin && (
  <LoginModal onClose={() => setShowLogin(false)} />
)}

    </div>
  );
} 

