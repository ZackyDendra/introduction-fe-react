import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Helper untuk cek route mana yang aktif
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        {/* LOGO RESTO */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center text-xl shadow-md text-white font-bold">
            🍔
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight">
            Resto<span className="text-red-600">App</span>
          </span>
        </div>

        {/* MENU UTAMA */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Utama
          </p>

          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive("/")
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>🏠</span> Beranda
          </Link>

          <Link
            to="/categorizedMenu"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive("/categorizedMenu")
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>🍔</span> Menu Resto
          </Link>

          <Link
            to="/cart"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive("/cart")
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>🛒</span> Keranjang
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive("/about")
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>ℹ️</span> Tentang Kami
          </Link>
        </div>

        {/* PESANAN & AKTIVITAS */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Aktivitas Saya
          </p>

          <Link
            to="/orders"
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive("/orders")
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <span>📜</span> Riwayat Pesanan
            </div>
          </Link>

          <Link
            to="/favorites"
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive("/favorites")
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <span>❤️</span> Favorit Saya
            </div>
          </Link>
        </div>

        {/* CARD BANNER PROMO */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 text-white shadow-lg space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20 text-7xl font-black">
            🍔
          </div>
          <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide">
            Diskon Member
          </span>
          <h4 className="font-extrabold text-lg leading-tight">Gratis Ongkir</h4>
          <p className="text-xs text-orange-100 leading-relaxed">
            Khusus pemesanan minimal Rp 50.000 hari ini.
          </p>
        </div>
      </div>

      {/* FOOTER SIDEBAR (BANTUAN & HAK CIPTA) */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-all">
          <span>🎧</span> Bantuan & CS
        </button>

        <p className="text-[10px] text-center text-slate-400 font-medium">
          © 2026 RestoApp Inc.
        </p>
      </div>
    </aside>
  );
}