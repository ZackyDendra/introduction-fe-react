import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

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

  const quickNavs = [
    { name: "✨ Beranda", path: "/" },
    { name: "🍔 Menu Spesial", path: "/categorizedMenu" },
    { name: "🛒 Keranjang", path: "/cart" },
    { name: "💳 Pembayaran", path: "/payment" },
    { name: "🌟 Tentang Kami", path: "/about" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-red-950 via-red-900 to-black font-sans antialiased text-white selection:bg-amber-400 selection:text-red-950">
      {/* SIDEBAR MERAH ELEGAN */}
      <div className="relative z-30">
        <aside
          className={`sticky top-0 h-screen bg-red-950/95 text-slate-200 border-r border-red-800/60 transition-all duration-300 flex flex-col shadow-2xl ${
            isOpen ? "w-64" : "w-20"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-amber-300 text-red-950 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer z-40 text-xs font-black ring-4 ring-red-950"
            title={isOpen ? "Tutup Sidebar" : "Buka Sidebar"}
          >
            {isOpen ? "◀" : "▶"}
          </button>

          <div className="flex items-center gap-3 px-6 py-7 border-b border-red-800/50 shrink-0 bg-red-950/80">
            <div className="bg-amber-400 text-red-950 p-2.5 rounded-2xl text-lg font-black shadow-md shadow-amber-400/20">
              🍔
            </div>
            {isOpen && (
              <span className="text-xl font-black tracking-tight text-white">
                Resto<span className="text-amber-400">App</span>
                <span className="block text-[9px] font-medium tracking-widest uppercase text-amber-200/70">
                  Fast & Delicious
                </span>
              </span>
            )}
          </div>

          <div className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
            {isOpen && (
              <p className="px-3 text-[10px] font-extrabold text-red-300/60 uppercase tracking-widest mb-3">
                Navigasi Utama
              </p>
            )}

            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              if (item.external) {
                return (
                  <a
                    key={index}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-medium text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all group"
                    title={!isOpen ? item.name : ""}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    {isOpen && <span className="text-sm font-semibold">Hubungi WA</span>}
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-medium transition-all ${
                    isActive
                      ? "bg-amber-400 text-red-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]"
                      : "text-slate-300 hover:bg-red-900/50 hover:text-white"
                  }`}
                  title={!isOpen ? item.name : ""}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isOpen && <span className="text-sm">{item.name}</span>}
                </Link>
              );
            })}
          </div>

          {isOpen && (
            <div className="p-4 m-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl text-red-950 shadow-xl shrink-0 font-bold">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">🔥</span>
                <p className="text-[10px] uppercase tracking-wider">
                  Promo Spesial
                </p>
              </div>
              <h4 className="text-xs font-black">Diskon Kilat 50%</h4>
              <p className="text-[10px] font-medium opacity-90 mt-1 leading-relaxed">
                Pesan menu favoritmu sekarang juga sebelum kehabisan!
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* KONTEN UTAMA KANAN */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-red-950 via-red-950/90 to-zinc-950">
        <div className="px-6 md:px-8 pt-6">
          <header className="bg-red-900/60 backdrop-blur-xl border border-red-700/50 px-6 py-4 flex items-center justify-between rounded-3xl shadow-2xl shadow-red-950/80 z-20">
            <nav className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {quickNavs.map((nav, idx) => {
                const isNavActive = location.pathname === nav.path;
                return (
                  <Link
                    key={idx}
                    to={nav.path}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isNavActive
                        ? "bg-amber-400 text-red-950 font-black shadow-md shadow-amber-400/20 scale-105"
                        : "bg-red-950/60 text-slate-200 hover:bg-red-900 hover:text-white"
                    }`}
                  >
                    {nav.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-red-800/60 shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-red-950 flex items-center justify-center font-black shadow-md text-sm">
                👑
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-white leading-none">VIP Member</p>
                <p className="text-[10px] text-amber-300 font-bold flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Active Status
                </p>
              </div>
            </div>
          </header>
        </div>

        {/* AREA KONTEN HALAMAN */}
        <main className="flex-1 p-6 md:p-8">
          <div className="bg-red-950/40 backdrop-blur-md border border-red-800/40 p-6 md:p-8 rounded-3xl shadow-2xl">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}