import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg"; // ✅ Import logo

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const link = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition hover:bg-white/10 ${
      isActive ? "bg-white/20" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 bg-turquoise-600/95 backdrop-blur text-white shadow-soft">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        {/* ✅ Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="YugenVerse Logo" className="h-10 w-10 rounded-full object-cover shadow-md" />
          <span className="font-bold text-xl tracking-wide">YugenVerse</span>
        </Link>

        {/* ✅ Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>

        {/* ✅ Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/" className={link}>Home</NavLink>
          <NavLink to="/poetry" className={link}>Poetry</NavLink>
          <NavLink to="/stories" className={link}>Stories</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/contact" className={link}>Contact</NavLink>
        </nav>
      </div>

      {/* ✅ Mobile Nav */}
      {open && (
        <div className="sm:hidden px-4 pb-3">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={link} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/poetry" className={link} onClick={() => setOpen(false)}>Poetry</NavLink>
            <NavLink to="/stories" className={link} onClick={() => setOpen(false)}>Stories</NavLink>
            <NavLink to="/about" className={link} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={link} onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
