import { NavLink, Link } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const link = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition hover:bg-white/10 ${
      isActive ? "bg-white/20" : ""
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur shadow-soft transition duration-500
        ${theme === "light" ? "bg-primary/95 text-black" : "bg-darkBg/95 text-white"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-10 w-10 rounded-full" />
            <span className="font-bold text-xl">YugenVerse</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-2">
            <NavLink to="/" className={link}>Home</NavLink>
            <NavLink to="/poetry" className={link}>Poetry</NavLink>
            <NavLink to="/stories" className={link}>Stories</NavLink>
            <NavLink to="/about" className={link}>About</NavLink>

            {!user && (
              <button onClick={() => setShowLogin(true)} className={link}>
                Login
              </button>
            )}

            {user?.role === "admin" && <NavLink to="/admin" className={link}>Admin</NavLink>}
            {user && <NavLink to="/my-submissions" className={link}>My Submissions</NavLink>}
            {user && <button onClick={logout} className={link}>Logout</button>}

            <button onClick={toggleTheme} className="px-3 py-1 rounded-lg border">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </nav>

          <button className="sm:hidden" onClick={() => setOpen(!open)}>☰</button>
        </div>

        {open && (
          <div className="sm:hidden flex flex-col px-4 pb-3 gap-2">
            <NavLink to="/" className={link}>Home</NavLink>
            <NavLink to="/poetry" className={link}>Poetry</NavLink>
            <NavLink to="/stories" className={link}>Stories</NavLink>
            <NavLink to="/about" className={link}>About</NavLink>

            {!user && (
              <button onClick={() => setShowLogin(true)} className={link}>
                Login
              </button>
            )}

            {user?.role === "admin" && <NavLink to="/admin" className={link}>Admin</NavLink>}
            {user && <NavLink to="/my-submissions" className={link}>My Submissions</NavLink>}

            {user && <button onClick={logout} className={link}>Logout</button>}
          </div>
        )}
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
