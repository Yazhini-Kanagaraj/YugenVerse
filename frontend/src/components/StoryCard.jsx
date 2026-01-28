import { useState } from "react";
import { motion } from "framer-motion";

export default function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="card p-5 hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold">{story.title || story.mood || "Untitled Story"}</h3>
      {/* Author */}
      <p className="text-sm italic text-gray-500 mt-1">
        — {story.anonymous ? "Anonymous" : story?.author || "Unknown"}
      </p>
      <motion.p
        className={`mt-3 text-slate-700 leading-relaxed whitespace-pre-line
        ${!expanded ? "line-clamp-2" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {story.content}
      </motion.p>

      {story.content.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-turquoise-700 hover:underline focus:outline-none"
        >
          {expanded ? "Show Less ▲" : "Read More ▼"}
        </button>
      )}
    </motion.article>
  );
}
