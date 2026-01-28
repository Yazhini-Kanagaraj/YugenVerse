import { useState } from "react";
import { motion } from "framer-motion";
const API = import.meta.env.VITE_API_URL;
export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent 🌿 Thank you for reaching out.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "Failed to send message");
      }
    } catch (err) {
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 text-white px-4 sm:px-6 lg:px-8">

      {/* About Section */}
      <section className="text-center space-y-6">
        <motion.h1
          className="text-4xl font-bold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-teal-200">YugenVerse</span>
        </motion.h1>

        <motion.p
          className="leading-relaxed text-white/90 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          YugenVerse is a quiet space for poems and short stories
           in English. Inspired by Yugen—the quiet,
            mysterious beauty that exists beyond what
             can be seen or spoken—it’s where fleeting 
             emotions, unspoken thoughts, and hidden moments
              find a voice.
        </motion.p>

        <motion.blockquote
          className="italic text-teal-100 border-l-4 border-teal-300 pl-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          “Poetry is when an emotion has found its thought and the thought has found
          words.”
        </motion.blockquote>

        <motion.div
          className="h-px bg-white/30 w-2/3 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        />

        <motion.p
          className="text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          ✨ Built for dreamers, readers, and writers — those who wander with words.
        </motion.p>
      </section>

      {/* Contact Section */}
      <section className="max-w-xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-turquoise-400 text-black"
            placeholder="Your name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-turquoise-400 text-black"
            placeholder="Your email"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-turquoise-400 text-black"
            placeholder="Your message"
          />

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-xl transition"
          >
            Send
          </button>

          {status && (
            <p className="text-center text-sm mt-2 text-teal-200">{status}</p>
          )}
        </motion.form>

        <motion.p
          className="mt-4 text-sm opacity-70 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Or email directly:{" "}
          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=nagaveniyazhini@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="underline"
>
  nagaveniyazhini@gmail.com
</a>

        </motion.p>
      </section>
    </div>
  );
}
