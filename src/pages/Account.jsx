
import { useNavigate, Link } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  // Get logged-in customer
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Check customer login
  if (!user || user.role !== "customer") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#160D10] text-white p-6">
        <h1 className="text-2xl font-bold">
          Please Login First
        </h1>

        <Link
          to="/login"
          className="mt-5 rounded-lg bg-yellow-600 px-6 py-3"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#160D10] p-6 text-white">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">
            My <span className="text-yellow-500">Account</span>
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        {/* Customer Profile */}
        <div className="mt-8 rounded-2xl border border-yellow-600/40 bg-[#24171B] p-6 sm:p-8">

          <div className="mb-6">
            <p className="text-sm uppercase tracking-widest text-yellow-500">
              Customer Profile
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Welcome, {user.name}!
            </h2>

            <p className="mt-2 text-gray-400">
              Welcome to Pooja Boutique.
            </p>
          </div>

          <div className="space-y-5">

            <div>
              <p className="text-sm text-gray-400">
                Full Name
              </p>
              <p className="mt-1 text-lg font-medium">
                {user.name || "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Email Address
              </p>
              <p className="mt-1 text-lg font-medium break-all">
                {user.email || "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Phone Number
              </p>
              <p className="mt-1 text-lg font-medium">
                {user.phone || "Not Available"}
              </p>
            </div>

          </div>

          <Link
            to="/"
            className="mt-8 inline-block rounded-lg bg-yellow-600 px-6 py-3 font-semibold hover:bg-yellow-500"
          >
            Back to Home
          </Link>

        </div>
      </div>
    </div>
  );
}
