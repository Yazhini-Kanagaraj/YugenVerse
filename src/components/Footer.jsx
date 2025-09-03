import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-turquoise-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center gap-3">
        
        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="opacity-90 text-center"
        >
          © {new Date().getFullYear()} YugenVerse — Crafted with calm.
        </motion.p>

        {/* Social links */}
        <div className="flex justify-center gap-6 text-sm opacity-90">
          {[
            { name: "Medium", url: "https://medium.com/@yazhini.k" },
            { name: "GitHub", url: "https://github.com/Yazhini-Kanagaraj" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/yazhini-kanagaraj-944683293/" }
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
              whileHover={{ scale: 1.08, opacity: 0.85 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
