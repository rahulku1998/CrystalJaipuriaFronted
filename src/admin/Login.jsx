import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-10 flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">Hello Kishan ! </h1>
          <p className="text-blue-100">
            Manage your website with ease.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;