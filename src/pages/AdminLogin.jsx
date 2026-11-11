
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL = "http://localhost:3000";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.user?.role !== "admin") {
        throw new Error("This account does not have admin access.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

     navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#171112] flex items-center justify-center p-4 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-[#806044] bg-[#241b1c] p-8 shadow-xl"
      >
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#d8b778]">
          Pooja Boutique
        </p>

        <h1 className="mb-2 text-3xl font-semibold">Admin Login</h1>
        <p className="mb-7 text-sm text-gray-400">
          Sign in to manage enquiries and customers.
        </p>

        <label className="mb-2 block text-sm">Email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-5 w-full rounded-lg border border-[#5c4742] bg-[#171112] p-3 outline-none focus:border-[#d8b778]"
          placeholder="admin@example.com"
        />

        <label className="mb-2 block text-sm">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full rounded-lg border border-[#5c4742] bg-[#171112] p-3 outline-none focus:border-[#d8b778]"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-[#d8b778] p-3 font-semibold text-[#211718] transition hover:bg-[#ead09b] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 w-full text-sm text-gray-400 hover:text-white"
        >
          Back to website
        </button>
      </form>
    </div>
  );
}
