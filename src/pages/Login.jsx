
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL = "https://pooja-boutique-backend-z2se.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || result.status === false) {
        throw new Error(result.message || "Login failed.");
      }

      // Backend response mein token hona chahiye.
      const token = result.token;
const user = result.user;

if (!token || !user) {
  throw new Error("Login response mein token ya user nahi mila.");
}

  // Only Customer Login allowed
if (user.role === "customer") {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  navigate("/account");
} else {
  throw new Error(
    "Admin account cannot login from Customer Login. Please use Admin Login."
  );
}
 
    } catch (err) {
      setError(
        err.message || "Server se connect nahi ho pa raha."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#160D10] p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-yellow-600/40 bg-[#24171B] p-8">
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-yellow-500">Back</span>
        </h1>

        <p className="mt-3 text-gray-300">
          Login to Pooja Boutique
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full rounded-lg border border-gray-600 bg-[#160D10] p-3 text-white outline-none focus:border-yellow-500"
          />

        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="current-password"
    required
    className="w-full rounded-lg border border-gray-600 bg-[#160D10] p-3 pr-12 text-white outline-none focus:border-yellow-500"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

<div className="text-right">
  <Link
    to="/forgot-pass"
    className="text-sm text-yellow-400 underline hover:text-yellow-300"
  >
    Forgot Password?
  </Link>
</div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-600 p-3 font-semibold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-300">
          New customer?{" "}
          <Link to="/register" className="text-yellow-400 underline">
            Sign Up
          </Link>
        </p>

        <Link to="/" className="mt-5 inline-block text-sm text-yellow-400">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
