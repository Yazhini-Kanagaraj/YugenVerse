import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Poetry from "./pages/Poetry";
import Stories from "./pages/Stories";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-turquoise-radial text-gray-900">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  );
}
