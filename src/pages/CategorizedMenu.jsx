import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

// Fallback gambar jika URL backend error/terblokir
const fallbackImages = {
  1: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  2: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500",
  3: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
  4: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
  5: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500",
  6: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
  7: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500",
};

export default function CategorizedMenu() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Modal detail deskripsi
  const [isCartOpen, setIsCartOpen] = useState(false); // Quick Sidebar keranjang
  const navigate = useNavigate();

  // Ambil state keranjang dari localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axios
      .get("/menu")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setMenus(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Simpan otomatis ke localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Tambah item ke keranjang & buka sidebar ringkas
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Ubah porsi (+ / -) di sidebar
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Pindah ke Halaman Utama /cart
  const handleGoToCartPage = () => {
    setIsCartOpen(false);
    navigate("/cart"); // Menuju ke /cart
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 relative">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari nama makanan secara real-time..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />

      {/* Grid Katalog Makanan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredMenus.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between p-4 hover:shadow-md transition-shadow"
          >
            <div>
              {/* Gambar (Klik untuk Pop-up Deskripsi) */}
              <div
                className="h-48 rounded-xl overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      fallbackImages[item.id] ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
                  }}
                />
              </div>

              {/* Informas Makanan */}
              <div className="mt-4 space-y-2">
                <h3
                  className="font-bold text-slate-800 text-lg cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.name}
                </h3>
                <p
                  className="text-xs text-slate-500 line-clamp-2 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  title="Klik untuk deskripsi lengkap"
                >
                  {item.description}
                </p>
                <p className="font-bold text-blue-600 text-base">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Tombol + Keranjang */}
            <button
              onClick={() => addToCart(item)}
              className="mt-4 w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
            >
              + Keranjang
            </button>
          </div>
        ))}
      </div>

      {/* QUICK SIDEBAR KERANJANG */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-lg font-bold text-slate-800">
                  🛒 Item Ditambahkan
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* List Item Ringkas */}
              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-slate-400 text-center py-8 text-sm">
                    Keranjang kosong
                  </p>
                ) : (
                  cart.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between border-b pb-3 gap-2"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm">
                          {c.name}
                        </h4>
                        <p className="text-xs text-blue-600 font-semibold">
                          Rp {Number(c.price).toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(c.id, -1)}
                          className="w-5 h-5 bg-white rounded text-slate-700 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1">{c.quantity}</span>
                        <button
                          onClick={() => updateQuantity(c.id, 1)}
                          className="w-5 h-5 bg-white rounded text-slate-700 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total & Tombol Menuju /cart */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center text-slate-800">
                <span className="text-sm font-semibold">Total Sementara:</span>
                <span className="font-bold text-lg text-blue-600">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-200 text-xs"
                >
                  Lanjut Pilih
                </button>
                <button
                  onClick={handleGoToCartPage}
                  className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 text-xs"
                >
                  Lihat Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DESKRIPSI LENGKAP */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-slate-100 text-slate-600 rounded-full w-8 h-8 font-bold hover:bg-slate-200"
            >
              ✕
            </button>
            <img
              src={selectedItem.imgUrl}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  fallbackImages[selectedItem.id] ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
              }}
            />
            <h2 className="text-xl font-bold text-slate-800">
              {selectedItem.name}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedItem.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-bold text-blue-600 text-lg">
                Rp {Number(selectedItem.price).toLocaleString("id-ID")}
              </span>
              <button
                onClick={() => {
                  addToCart(selectedItem);
                  setSelectedItem(null);
                }}
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-blue-700 text-sm"
              >
                + Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}