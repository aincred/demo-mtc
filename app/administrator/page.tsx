"use client";

import { useState } from "react";
import { RefreshCw, User } from "lucide-react";

export default function AdministratorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptcha("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captcha.trim() !== captchaCode) {
      alert("Invalid Captcha. Please try again.");
      handleRefreshCaptcha();
      return;
    }
    alert(`Welcome, ${username || "Administrator"}!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 to-indigo-600">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
        <div className="flex justify-center -mt-16">
          <div className="bg-indigo-600 rounded-full p-4 shadow-lg">
            <User className="text-white w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-indigo-700 mt-2">
          Administrator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div>
            <label className="block text-gray-700 mb-1">Captcha Image</label>
            <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-lg text-gray-700">
              {captchaCode}
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <input
                type="text"
                placeholder="Enter Captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
