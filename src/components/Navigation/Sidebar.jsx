import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Beranda", path: "/", icon: "🏠" },
    { name: "Menu Resto", path: "/categorizedMenu", icon: "🍔" },
    { name: "Keranjang", path: "/cart", icon: "🛒" },
    { name: "Tentang Kami", path: "/about", icon: "ℹ️" },
    { 
      name: "Hubungi WA", 
      path: "https://wa.me/6281514296437?text=Halo%20Admin,%20saya%20mau%20pesan%20menu%20resto.", 
      icon: "💬", 
      external: true 
    },
    { name: "Pengaturan", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* HEADER SIDEBAR */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-100">
        <div className="bg-red-600 text-white p-2 rounded-xl text-lg font-black shadow">
          🍔
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-800">
          Resto<span className="text-red-600">App</span>
        </span>
      </div>

      {/* DAFTAR MENU */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Menu Utama
        </p>

        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          if (item.external) {
            return (
              <a
                key={index}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition group"
              >
                <span className="text-xl group-hover:scale-110 transition">{item.icon}</span>
                <span className="text-sm font-semibold">Hubungi WA</span>
              </a>
            );
          }

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-medium transition ${
                isActive
                  ? "bg-red-50 text-red-600 font-bold shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* BANNER PROMO MEMBER DI BAWAH */}
      <div className="p-4 m-3 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl text-white shadow-lg">
        <p className="text-[10px] font-bold tracking-wider uppercase opacity-90">
          Diskon Member
        </p>
        <h4 className="text-sm font-extrabold mt-0.5">Gratis Ongkir</h4>
        <p className="text-[11px] opacity-80 mt-1 leading-tight">
          Min. pesanan Rp 50.000 hari ini.
        </p>
      </div>
    </div>
  );
}