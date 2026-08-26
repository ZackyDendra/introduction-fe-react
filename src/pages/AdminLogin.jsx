import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  
  // State Form
  const [formData, setFormData] = useState({
    username: "", // Sesuaikan jika backend kamu memakai "email"
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Kirim data login ke endpoint backend kamu (misal: /login atau /auth/login)
      const response = await API.post("/login", formData);
      
      // Ambil token & user data dari respon backend (sesuaikan dengan struktur respon API kamu)
      const data = response.data.data || response.data;
      const token = data.token || data.accessToken;
      const role = data.role || data.user?.role || "admin";

      if (token) {
        // 2. Simpan token dan role ke localStorage agar user tetap login setelah refresh
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(data.user || data));

        alert("Login Berhasil!");
        
        // 3. Arahkan ke halaman Admin / Dashboard
        navigate("/admin");
      } else {
        setError("Token tidak ditemukan dalam respon server.");
      }
    } catch (err) {
      console.error("Gagal Login:", err);
      // Menampilkan pesan error dari response backend jika ada
      const msg = err.response?.data?.message || "Username atau password salah!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block bg-red-600 text-white text-3xl p-3 rounded-2xl shadow-sm">
            🍔
          </div>
          <h1 className="text-2xl font-black text-slate-800">Masuk sebagai Admin</h1>
          <p className="text-sm text-slate-500">
            Kelola menu resto dan kelola pesanan masuk.
          </p>
        </div>

        {/* PESAN ERROR DARI BACKEND */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* FORM LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Username / Email
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="Masukkan username/email"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}