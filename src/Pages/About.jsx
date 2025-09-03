import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto text-center text-white space-y-6">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About <span className="text-teal-200">YugenVerse</span>
      </motion.h1>

      {/* Main paragraph */}
      <motion.p
        className="leading-relaxed text-white/90 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        YugenVerse is a quiet space for poems, letters, and short stories —
        in both English and Tamil.  
        Crafted with a turquoise calm, subtle motion, and a focus on pure reading comfort,
        it’s a little corner of the internet where words breathe.
      </motion.p>

      {/* Quote block */}
      <motion.blockquote
        className="italic text-teal-100 border-l-4 border-teal-300 pl-4 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        “Poetry is when an emotion has found its thought  
        and the thought has found words.”
      </motion.blockquote>

      {/* Divider */}
      <motion.div
        className="h-px bg-white/30 w-2/3 mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      />

      {/* Closing line */}
      <motion.p
        className="text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        ✨ Built for dreamers, readers, and writers — like you.
      </motion.p>
    </div>
  );
}
