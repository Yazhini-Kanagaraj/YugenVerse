import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from "../assets/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
