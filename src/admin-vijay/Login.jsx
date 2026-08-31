import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaRobot, FaLock, FaEnvelope } from "react-icons/fa";

const VijayLogin = () => {
  const [email, setEmail] = useState("vijaykumawat8886@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verify authorized email
    if (cleanEmail !== "vijaykumawat8886@gmail.com") {
      setError("⛔ Access Denied! Only vijaykumawat8886@gmail.com is authorized for Vijay AI Super Admin.");
      setLoading(false);
      return;
    }

    // Master Access Codes for Vijay
    const masterCodes = ["8886", "vijay8886", "888600", "crystal@vijay", "crystaljaipuria"];

    if (masterCodes.includes(cleanPass)) {
      // Direct Master Authentication
      localStorage.setItem("vijay_admin_token", "vijay_ai_superadmin_master_8886");
      localStorage.setItem("vijay_admin_email", "vijaykumawat8886@gmail.com");
      
      // Attempt backend token fetch for API mutations if password is valid
      try {
        const res = await API.post("/admin/login", { email: cleanEmail, password: cleanPass });
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }
      } catch {
        // Continue with master token even if backend admin credentials differ
      }

      setLoading(false);
      navigate("/admin-vijay/dashboard");
      return;
    }

    // Otherwise try backend login
    try {
      const res = await API.post("/admin/login", {
        email: cleanEmail,
        password: cleanPass,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("vijay_admin_token", "vijay_ai_superadmin_master_8886");
      localStorage.setItem("vijay_admin_email", "vijaykumawat8886@gmail.com");
      navigate("/admin-vijay/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Passcode. Enter your Vijay Security Code (e.g. 8886) or Admin Password.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12">
      <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT BRANDING SIDE */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-indigo-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
              <FaRobot className="text-sm" />
              <span>Vijay AI Super Admin</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white mb-3">
              Hello Vijay! 💎
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
              Welcome to your dedicated AI-loaded administration portal with full Gemini SEO engine, 1-Click Super Metadata, FAQ builders, and advanced controls.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-500/20 space-y-2 text-xs text-indigo-300">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-amber-400 shrink-0" />
              <span>Secured exclusively for <strong>vijaykumawat8886@gmail.com</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <FaRobot className="text-indigo-400 shrink-0" />
              <span>Full AI Gemini Generator &amp; Automated SEO</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-slate-900 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Super Admin Login</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your Google Email &amp; Security Passcode
            </p>
          </div>

          {error && (
            <div className="bg-red-950/80 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-5 text-xs sm:text-sm leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FaEnvelope className="text-indigo-400" />
                <span>Authorized Google Email</span>
              </label>
              <input
                type="email"
                placeholder="vijaykumawat8886@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FaLock className="text-indigo-400" />
                <span>Passcode / Security Code</span>
              </label>
              <input
                type="password"
                placeholder="Enter Code (e.g. 8886)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "🚀 Access Vijay AI Admin"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-500">
              Need standard client panel? <a href="/admin/login" className="text-indigo-400 hover:underline">Go to /admin/login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VijayLogin;