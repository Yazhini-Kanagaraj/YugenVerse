import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { poems as fallbackPoems } from "../data/poems";
import { stories as fallbackStories } from "../data/stories";

export default function Home() {
  const poems = fallbackPoems.slice(0, 3);
  const stories = fallbackStories.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg">
        <div className="px-6 py-16 sm:px-10 sm:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md"
          >
            Welcome to <span className="text-teal-200">YugenVerse</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-5 max-w-2xl mx-auto text-lg opacity-95 leading-relaxed"
          >
            A calm corner for poems, letters, and short stories — in English &
            Tamil. ✨
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link to="/poetry" className="btn btn-primary shadow-lg">
              Explore Poems
            </Link>
            <Link
              to="/stories"
              className="btn bg-white text-teal-700 hover:bg-teal-50 shadow-lg"
            >
              Read Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Poems */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">🌸 Featured Poems</h2>
          <Link className="text-teal-600 hover:underline font-medium" to="/poetry">
            See all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <article className="card p-6 hover:shadow-xl transition">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="mt-3 whitespace-pre-line font-poem text-slate-700 leading-relaxed">
                  {p.content}
                </p>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Stories */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">📖 Latest Stories</h2>
          <Link className="text-teal-600 hover:underline font-medium" to="/stories">
            See all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <article className="card p-6 hover:shadow-xl transition">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-3 text-slate-700 leading-relaxed">{s.content}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
