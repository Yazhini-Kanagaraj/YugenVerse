import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginModal from "../components/LoginModal";
import SubmitWritingModal from "../components/SubmitWritingModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FeaturedSlider from "../components/FeatureSlider";
const API = import.meta.env.VITE_API_URL;
export default function Home() {
  const [poems, setPoems] = useState([]);
  const [stories, setStories] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitType, setSubmitType] = useState("poem"); // "poem" or "story"
  const [loginFor, setLoginFor] = useState(null); // "poem" or "story"

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
useEffect(() => {
  fetch(`${API}/poems/featured`)
    .then(res => res.json())
    .then(data => setPoems(data))
    .catch(err => console.error("Poems fetch error:", err));

  fetch(`${API}/stories/featured`)
    .then(res => res.json())
    .then(data => setStories(data))
    .catch(err => console.error("Stories fetch error:", err));
}, []);


  // Handle login modal close
 const handleLoginClose = () => {
  setShowLogin(false);

  if (loginFor) {
    navigate(
      loginFor === "poem" ? "/poetry" : "/stories",
      { state: { openSubmit: true } }
    );
    setLoginFor(null);
  }
};


  // Handle submit modal after submission
  const handleSubmitSuccess = () => {
    setShowSubmit(false);
    navigate(submitType === "poem" ? "/poetry" : "/stories");
  };

  // Click handler for Add Poem / Story
  const handleAddClick = (type) => {
    if (user) {
      setSubmitType(type);
      setShowSubmit(true);
    } else {
      setLoginFor(type);
      setShowLogin(true);
    }
  };

  return (
    <div className="space-y-16 relative">

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={handleLoginClose} />}

      {/* Submit Modal */}
      {showSubmit && (
        <SubmitWritingModal
          type={submitType}
          onClose={() => setShowSubmit(false)}
          onSuccess={handleSubmitSuccess}
        />
      )}

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg">

        {/* Top Left & Right Buttons INSIDE the box */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => handleAddClick("poem")}
            className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            ✍ Add Poem
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => handleAddClick("story")}
            className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            📖 Add Story
          </button>
        </div>

        <div className="px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold"
          >
            Welcome to <span className="text-teal-200">YugenVerse</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-5 max-w-2xl mx-auto text-lg"
          >
            A Profound awareness of the universe that triggers
            feelings too deep and mysterious for words!💙
          </motion.p>

          <div className="mt-10 flex gap-4 justify-center">
            <Link to="/poetry" className="btn btn-primary">Explore Poems</Link>
            <Link to="/stories" className="btn bg-white text-teal-700">Read Stories</Link>
          </div>
        </div>
      </section>

      {/* Featured Poems */}
<section className="px-4">
  <div className="flex justify-between mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">🌸 Featured Poems</h2>
    <Link className="text-teal-600 hover:underline" to="/poetry">
      See all
    </Link>
  </div>

  <FeaturedSlider
  items={poems}
  renderItem={(p) => (
    <article className="card p-6 h-full hover:shadow-md">
      <h3 className="font-semibold text-lg">{p.title}</h3>
      <p className="mt-3 whitespace-pre-line text-gray-700 line-clamp-3">
        {p.content}
      </p>
    </article>
  )}
/>

</section>


      {/* Latest Stories */}
<section className="px-4">
  <div className="flex justify-between mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">💌 Latest Stories</h2>
    <Link className="text-teal-600 hover:underline" to="/stories">
      See all
    </Link>
  </div>

  <FeaturedSlider
  items={stories}
  renderItem={(s) => (
    <article className="card p-6 h-full hover:shadow-md">
      <p className="text-sm text-gray-500 mb-2">{s.mood}</p>
      <p className="text-gray-700 line-clamp-3 whitespace-pre-line">
        {s.content}
      </p>
    </article>
  )}
/>

</section>


    </div>
  );
}
