import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Poetry from "./pages/Poetry";
import Stories from "./pages/Stories";
import About from "./pages/About";
import Admin from "./pages/Admin";
import MySubmissions from "./pages/MySubmissions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="poetry" element={<Poetry />} />
        <Route path="stories" element={<Stories />} />
        <Route path="about" element={<About />} />

        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="my-submissions" element={<MySubmissions />} />
        </Route>
      </Route>
    </Routes>
  );
}
