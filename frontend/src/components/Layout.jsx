import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-turquoise-radial">
      <Navbar />

      <main className="flex-1">
          <motion.div
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6,ease: "easeOut" }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-10"
          >
            {/* Outlet is the magic! */}
            <Outlet />
          </motion.div>
      </main>

      <Footer />
    </div>
  );
}
