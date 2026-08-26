import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Konten Utama Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Kolom 1: Profil Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <span className="text-2xl font-black text-white tracking-wide">
              Resto<span className="text-red-500">App</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Menyajikan hidangan fast food segar dan berkualitas tinggi. Pesan makanan favoritmu secara online dengan mudah, cepat, dan terpercaya.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center text-sm cursor-pointer transition-all">
              🌐
            </span>
            <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center text-sm cursor-pointer transition-all">
              📸
            </span>
            <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center text-sm cursor-pointer transition-all">
              💬
            </span>
          </div>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Navigasi Cepat
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/" className="hover:text-red-400 transition-colors">
                🏠 Beranda
              </Link>
            </li>
            <li>
              <Link to="/categorizedMenu" className="hover:text-red-400 transition-colors">
                🍔 Menu Resto
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-red-400 transition-colors">
                🛒 Keranjang Belanja
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-400 transition-colors">
                ℹ️ Tentang Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Jam Operasional */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Jam Buka Resto
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex justify-between border-b border-slate-800 pb-1">
              <span>Senin - Jumat:</span>
              <span className="text-white font-medium">09:00 - 22:00</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-1">
              <span>Sabtu - Minggu:</span>
              <span className="text-white font-medium">08:00 - 23:00</span>
            </li>
            <li className="flex justify-between">
              <span>Hari Libur Nasional:</span>
              <span className="text-red-400 font-medium">Tetap Buka</span>
            </li>
          </ul>
        </div>

        {/* Kolom 4: Hubungi Kami */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Kontak & Lokasi
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Jl. Telekomunikasi No. 1, Telkom University, Bandung</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span>support@restoapp.id</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bagian Bawah Footer (Copyright) */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>© 2026 RestoApp Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}