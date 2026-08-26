import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Selamat Datang</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Silakan login ke akun Resto Anda</p>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-all mt-2"
          >
            Masuk
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          Kembali ke{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Beranda
          </Link>
        </p>
      </div>
    </div>
  )
};


