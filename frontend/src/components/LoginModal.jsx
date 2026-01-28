import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

export default function LoginModal({ onClose }) {
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const toggleMode = () => {
    setAuthError("");
    setIsLogin(!isLogin);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!isLogin && password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "register"}`;
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await axios.post(url, payload);

      login({
        token: res.data.token,
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
      });

      onClose();
    } catch (err) {
      setAuthError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Authentication failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-turquoise-300 max-w-md w-full relative animate-fadeIn">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {authError && (
          <p className="text-red-300 mb-4 text-center">{authError}</p>
        )}

        <form onSubmit={handleAuthSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mb-4 rounded-xl border border-turquoise-200 bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-turquoise-300"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded-xl border border-turquoise-200 bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-turquoise-300"
          />

          <input
            type="password"
            placeholder={isLogin ? "Password" : "Create Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded-xl border border-turquoise-200 bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-turquoise-300"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mb-4 rounded-xl border border-turquoise-200 bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-turquoise-300"
            />
          )}

          <button
            type="submit"
            className={`w-full mb-4 ${
              isLogin
                ? "bg-teal-500 hover:bg-teal-600"
                : "bg-turquoise-500 hover:bg-turquoise-600"
            } text-white p-3 rounded-xl transition`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-white/80 cursor-pointer">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-teal-200 font-semibold"
            onClick={toggleMode}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        <div className="text-center my-4 text-white font-semibold">OR</div>

        <div className="flex justify-center">
          <GoogleLoginButton
            onSuccess={(data) => {
              login({
                token: data.token,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role,
              });
              onClose();
            }}
            onError={() => setAuthError("Google login failed")}
          />
        </div>
      </div>
    </div>
  );
}
