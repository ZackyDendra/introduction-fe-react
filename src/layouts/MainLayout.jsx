import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // Hitung jumlah item di keranjang secara berkala
  useEffect(() => {
    const updateCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const total = cart.reduce((acc, item) => acc + item.qty, 0);
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    };

    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Beranda", path: "/", icon: "🏠" },
    { name: "Menu Resto", path: "/categorizedMenu", icon: "🍔" },
    { name: "Keranjang", path: "/cart", icon: "🛒", badge: cartCount },
    { name: "Tentang Kami", path: "/about", icon: "ℹ️" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* NAVBAR ATAS */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xl p-2 rounded-xl">🍔</span>
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">
              Resto<span className="text-red-600">App</span>
            </span>
          </Link>

          {/* Menu Navigasi Navbar */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Tombol Login */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
            >
              Masuk
            </button>
          </div>
        </div>
      </header>

      {/* STRUKTUR UTAMA (SIDEBAR + KONTEN) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* SIDEBAR SAMBUNGAN (SEBELAH KIRI) */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Menu Utama
              </p>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* CARD PROMO SIDEBAR */}
            <div className="bg-gradient-to-br from-amber-500 to-red-500 text-white p-4 rounded-2xl shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-100">
                Diskon Member
              </p>
              <p className="text-lg font-black mt-1">Gratis Ongkir</p>
              <p className="text-xs text-white/90 mt-1">
                Khusus pemesanan minimal Rp 50.000 hari ini.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-400 text-center font-medium">
              © 2026 RestoApp Inc.
            </p>
          </div>
        </aside>

        {/* KONTEN HALAMAN UTAMA */}
        <main className="flex-1 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}