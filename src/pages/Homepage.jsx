import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

// Fallback gambar jika URL backend broken/CORS
const fallbackImages = {
  1: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  2: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500",
  3: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
  4: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
  5: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500",
  6: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
  7: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500",
};

// Data Promosi Lengkap dengan Harga Asli & Diskon
const promoList = [
  {
    id: "promo-1",
    name: "Paket Diskon Kemerdekaan (McChicken + Big Mac)",
    discountPercent: 17,
    originalPrice: 70000,
    price: 58100, // Harga setelah diskon 17%
    description: "Khusus pemesanan McChicken & Big Mac Combo selama bulan ini!",
    badge: "PROMO MERDEKA",
    discountTag: "Potongan 17%",
    bgGradient: "from-red-600/90 to-rose-900/90",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: "promo-2",
    name: "Family Bucket Package (8 Chicken + 4 Fries)",
    discountPercent: 25,
    originalPrice: 160000,
    price: 120000, // Harga setelah diskon 25%
    description: "Paket 8 pcs Crispy Chicken + 4 Fries hemat buat sekeluarga.",
    badge: "FAMILY PACK",
    discountTag: "Potongan 25%",
    bgGradient: "from-amber-500/90 to-orange-900/90",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600",
  },
  {
    id: "promo-3",
    name: "Weekend McNuggets (20 pcs + 2 Dip)",
    discountPercent: 10,
    originalPrice: 80000,
    price: 72000, // Harga setelah diskon 10%
    description: "Beli 20 pcs Chicken McNuggets gratis 2 Dip Sauce pilihan.",
    badge: "WEEKEND ONLY",
    discountTag: "Potongan 10%",
    bgGradient: "from-blue-600/90 to-indigo-900/90",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600",
  },
];

export default function Homepage() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/menu")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setMenu(data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data menu dari backend:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // FUNGSI UNTUK MEMASUKKAN PROMO LANGSUNG KE KERANJANG
  const handleClaimPromo = (promo, e) => {
    e.stopPropagation(); // Mencegah event bubbling

    // Ambil data keranjang dari localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cek apakah item promo ini sudah ada di keranjang
    const existingIndex = existingCart.findIndex((item) => item.id === promo.id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        id: promo.id,
        name: promo.name,
        price: promo.price,
        originalPrice: promo.originalPrice,
        imgUrl: promo.image,
        quantity: 1,
        isPromo: true,
      });
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Navigasi langsung ke halaman Keranjang
    navigate("/cart");
  };

  return (
    <div className="p-6 space-y-10 w-full pb-20">
      {/* HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[320px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200"
          alt="Hero Resto Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>

        <div className="relative z-10 p-8 md:p-12 max-w-xl space-y-4 text-white">
          <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            🔥 Penawaran Spesial Hari Ini
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-md">
            Nikmati Kelezatan Burger & Ayam Segar
          </h1>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed drop-shadow">
            Pesan makanan favoritmu dengan cepat dan mudah. Berbagai pilihan menu lezat khas RestoApp siap memanjakan lidah Anda.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/categorizedMenu")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              Lihat Semua Menu →
            </button>
          </div>
        </div>
      </div>

      {/* SECTION PROMO & DISKON SPESIAL */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">🔥 Promo & Diskon Spesial</h2>
          <p className="text-sm text-slate-500">Klik "Klaim Promo" untuk langsung menambahkan paket ke keranjang!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoList.map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-end min-h-[280px] group border border-slate-100"
            >
              {/* Gambar Background */}
              <img
                src={promo.image}
                alt={promo.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${promo.bgGradient} via-slate-900/40 to-black/30`}></div>

              {/* Badge Promo Atas */}
              <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {promo.badge}
              </span>

              {/* Tag Diskon (%) */}
              <div className="absolute top-4 right-4 bg-red-600 text-white font-black text-sm px-3 py-1 rounded-xl shadow-md">
                {promo.discountTag}
              </div>

              {/* Info Detail Diskon */}
              <div className="relative z-10 p-5 space-y-2 text-white">
                <h3 className="text-lg font-black tracking-wide drop-shadow-sm leading-snug">
                  {promo.name}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed drop-shadow">
                  {promo.description}
                </p>

                {/* Tampilan Harga Asli vs Harga Diskon */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-base font-black text-emerald-400">
                    Rp {promo.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs text-slate-300 line-through">
                    Rp {promo.originalPrice.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Tombol Klaim Promo */}
                <div className="pt-2">
                  <button
                    onClick={(e) => handleClaimPromo(promo, e)}
                    className="w-full text-center text-xs font-bold text-slate-900 bg-white hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Klaim Promo & Masuk Keranjang →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DAFTAR MENU UTAMA RESTO */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Daftar Menu Resto</h2>
        
        {loading ? (
          <p className="text-slate-500 font-medium">Memuat menu backend...</p>
        ) : menu.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {menu.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/categorizedMenu`)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          fallbackImages[item.id] ||
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
                      }}
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-800 text-xl group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {item.description || "Menu lezat pilihan terbaik."}
                    </p>
                    <p className="font-bold text-blue-600 text-lg">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="inline-block text-sm font-bold text-blue-600 group-hover:underline">
                    Pesan Sekarang →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">Belum ada menu di database.</p>
        )}
      </div>
    </div>
  );
}