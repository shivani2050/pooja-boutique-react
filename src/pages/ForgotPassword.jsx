
import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://pooja-boutique-backend-z2se.onrender.com";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
   
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 
  // Step 1: Send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/pass-reset/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setStep(2);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/pass-reset/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setStep(3);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
 const resetPassword = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/pass-reset/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    );

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setStep(4);
    }
  } catch (error) {
    setMessage("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#160d13] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#c49a57]/30 bg-[#24151e] p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-[#e5c18b]">
          Forgot Password
        </h1>

        <p className="mb-6 text-center text-gray-300">
          {step === 1 && "Enter your registered email address."}
          {step === 2 && "Enter the 6-digit OTP sent to your email."}
          {step === 3 && "Create your new password."}
          {step === 4 && "Your password has been changed successfully."}
        </p>

        {message && (
          <p className="mb-4 text-center text-sm text-yellow-300">
            {message}
          </p>
        )}

 


        {step === 1 && (
          <form onSubmit={sendOTP}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Registered Email"
              required
              className="mb-4 w-full rounded-lg border border-gray-600 bg-[#160d13] p-3 text-white outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#c49a57] p-3 font-semibold text-black disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}
 

        {step === 2 && (
          <form onSubmit={verifyOTP}>
            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
              className="mb-4 w-full rounded-lg border border-gray-600 bg-[#160d13] p-3 text-white outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#c49a57] p-3 font-semibold text-black disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={resetPassword}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password (minimum 8 characters)"
              minLength="8"
              required
              className="mb-4 w-full rounded-lg border border-gray-600 bg-[#160d13] p-3 text-white outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#c49a57] p-3 font-semibold text-black disabled:opacity-50"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        {step === 4 && (
          <Link
            to="/login"
            className="block w-full rounded-lg bg-[#c49a57] p-3 text-center font-semibold text-black"
          >
            Go to Login
          </Link>
        )}

        {step !== 4 && (
          <Link
            to="/login"
            className="mt-5 block text-center text-sm text-gray-300 hover:text-[#e5c18b]"
          >
            Back to Login
          </Link>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
