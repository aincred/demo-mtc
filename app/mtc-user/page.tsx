"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MtcUserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Generate random captcha
  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptcha("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Captcha validation
    if (captcha.trim() !== captchaCode) {
      toast.error("Invalid Captcha. Please try again.");
      handleRefreshCaptcha();
      setLoading(false);
      return;
    }

    // ✅ Hardcoded login validation
    await new Promise((res) => setTimeout(res, 1000)); // simulate network delay

    if (username === "admin@example.com" && password === "123@admin") {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/mtc-user/dashboard/home"), 1500);
    } else {
      toast.error("Invalid username or password!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-700 to-blue-500">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
        {/* Avatar */}
        <div className="flex justify-center -mt-16">
          <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
            <User className="text-white w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
          MTC User Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Captcha */}
          <div>
            <label className="block text-gray-700 mb-1">Captcha Image</label>
            <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-lg text-gray-700 select-none">
              {captchaCode}
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <input
                type="text"
                placeholder="Enter Captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition text-white ${
              loading
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
