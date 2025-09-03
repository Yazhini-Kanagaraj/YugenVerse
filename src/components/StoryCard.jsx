import { motion } from "framer-motion";

export default function StoryCard({ story }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="card p-5 hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold">{story.title}</h3>
      <motion.p
        className="mt-3 text-slate-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {story.content}
      </motion.p>
    </motion.article>
  );
}
