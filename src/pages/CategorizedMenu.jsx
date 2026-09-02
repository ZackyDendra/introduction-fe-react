import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

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
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  // --- STATE KUSTOMISASI MODAL ---
  const [spicyLevel, setSpicyLevel] = useState("Original");
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraSauce, setExtraSauce] = useState(false);

  // --- STATE FAVORITE ---
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem("favorites");
      return savedFavs ? JSON.parse(savedFavs) : [];
    } catch {
      return [];
    }
  });

  // --- STATE CART ---
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    axios
      .get("/menu")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setMenus(data);
      })
      .catch((err) => console.error("Gagal mengambil data menu:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleFavorite = (e, item) => {
    e.stopPropagation(); // Mencegah modal terbuka saat tombol hati diklik
    const idStr = String(item.id);

    setFavorites((prev) => {
      const isExist = prev.some((favId) => String(favId) === idStr);
      let updatedFavs;

      if (isExist) {
        updatedFavs = prev.filter((favId) => String(favId) !== idStr);
        showToast(`💔 Dihapus dari Favorit: ${item.name}`);
      } else {
        updatedFavs = [...prev, item.id];
        showToast(`❤️ Ditambahkan ke Favorit: ${item.name}`);
      }
      return updatedFavs;
    });
  };

  const addToCart = (item, customization = null) => {
    const calculatedPrice =
      Number(item.price) +
      (customization?.extraCheese ? 5000 : 0) +
      (customization?.extraSauce ? 2000 : 0);

    const itemToAdd = {
      ...item,
      cartItemId: `${item.id}-${customization?.spicyLevel || "Std"}-${
        customization?.extraCheese ? "Ch" : ""
      }-${customization?.extraSauce ? "Sc" : ""}`,
      price: calculatedPrice,
      customization: customization || {
        spicyLevel: "Original",
        extraCheese: false,
        extraSauce: false,
      },
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (c) => c.cartItemId === itemToAdd.cartItemId
      );
      if (existingItem) {
        return prevCart.map((c) =>
          c.cartItemId === itemToAdd.cartItemId
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });

    showToast(`🛒 ${item.name} berhasil ditambahkan!`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId || item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Kategori Favorit dipindah ke paling kanan (sebelah Desert)
  const categories = [
    "Semua",
    "Burger",
    "Chicken",
    "Breakfast",
    "Minuman",
    "Desert",
    "Favorit",
  ];

  const getCategoryForItem = (item) => {
    const categoryFromDB = (
      item.category ||
      item.category_name ||
      ""
    ).toLowerCase();

    const name = item.name.toLowerCase();

    if (categoryFromDB.includes("burger") || name.includes("burger") || name.includes("mac")) return "burger";
    if (categoryFromDB.includes("chicken") || name.includes("chicken") || name.includes("nugget")) return "chicken";
    if (categoryFromDB.includes("breakfast") || name.includes("mcmuffin") || name.includes("egg")) return "breakfast";
    if (categoryFromDB.includes("minuman") || name.includes("cola") || name.includes("tea") || name.includes("drink")) return "minuman";
    if (categoryFromDB.includes("desert") || name.includes("pie") || name.includes("ice")) return "desert";

    return categoryFromDB || "lainnya";
  };

  const filteredMenus = menus.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (selectedCategory === "Favorit") {
      const isFav = favorites.some((favId) => String(favId) === String(item.id));
      return matchesSearch && isFav;
    }

    if (selectedCategory === "Semua") {
      return matchesSearch;
    }

    const itemCat = getCategoryForItem(item);
    return matchesSearch && itemCat === selectedCategory.toLowerCase();
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const openCustomModal = (item) => {
    setSelectedItem(item);
    setSpicyLevel("Original");
    setExtraCheese(false);
    setExtraSauce(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen relative font-sans">
      {/* TOAST POP-UP (ditambah pointer-events-none agar tidak menghalangi klik mouse) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 font-medium text-xs flex items-center gap-3 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search Bar & Filter Kategori */}
      <div className="space-y-5 max-w-7xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari hidangan favoritmu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-5 pr-4 py-4 border border-slate-200/80 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 bg-white text-slate-800 placeholder-slate-400 font-medium text-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat === "Favorit" && <span className="text-red-500">♥</span>}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Katalog Makanan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredMenus.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-slate-500 font-medium text-sm">
              {selectedCategory === "Favorit"
                ? "Belum ada menu favorit yang disimpan. Klik ikon hati pada makanan untuk menyimpannya!"
                : "Menu tidak ditemukan."}
            </p>
          </div>
        ) : (
          filteredMenus.map((item) => {
            const isFav = favorites.some(
              (favId) => String(favId) === String(item.id)
            );
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-4 relative group"
              >
                {/* Tombol Favorit (Ikon Hati) */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, item)}
                  className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/60"
                  title="Simpan ke Favorit"
                >
                  <span
                    className={`text-base block transition-colors leading-none ${
                      isFav ? "text-red-500" : "text-slate-300 group-hover:text-slate-400"
                    }`}
                  >
                    ♥
                  </span>
                </button>

                <div>
                  <div
                    className="h-44 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer relative"
                    onClick={() => openCustomModal(item)}
                  >
                    <img
                      src={item.imgUrl || item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          fallbackImages[item.id] ||
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
                      }}
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      ⏱️ 15-20 mnt
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5 px-1">
                    <h3
                      className="font-bold text-slate-900 text-base cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
                      onClick={() => openCustomModal(item)}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-xs text-slate-500 line-clamp-2 cursor-pointer leading-relaxed"
                      onClick={() => openCustomModal(item)}
                    >
                      {item.description}
                    </p>
                    <p className="font-extrabold text-blue-600 text-base pt-1">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full bg-slate-900 text-white font-semibold py-3 rounded-2xl hover:bg-blue-600 active:scale-98 transition-all text-xs shadow-md shadow-slate-900/10 cursor-pointer"
                >
                  + Tambah Keranjang
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* QUICK SIDEBAR KERANJANG */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  🛒 Keranjang Belanja
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold flex items-center justify-center text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[65vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-slate-400 text-center py-12 text-sm">
                    Keranjang masih kosong
                  </p>
                ) : (
                  cart.map((c) => (
                    <div
                      key={c.cartItemId || c.id}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 gap-3"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm">
                          {c.name}
                        </h4>
                        {c.customization && (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {c.customization.spicyLevel}
                            {c.customization.extraCheese && ", Keju"}
                            {c.customization.extraSauce && ", Saus Ekstra"}
                          </p>
                        )}
                        <p className="text-xs text-blue-600 font-bold mt-1">
                          Rp {Number(c.price).toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(c.cartItemId || c.id, -1)
                          }
                          className="w-6 h-6 bg-white rounded-lg text-slate-700 font-bold text-xs shadow-sm hover:bg-slate-50"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1.5 text-slate-800">
                          {c.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(c.cartItemId || c.id, 1)
                          }
                          className="w-6 h-6 bg-white rounded-lg text-slate-700 font-bold text-xs shadow-sm hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div className="flex justify-between items-center text-slate-800">
                <span className="text-sm font-medium text-slate-500">
                  Total Pembayaran:
                </span>
                <span className="font-extrabold text-xl text-slate-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 text-xs transition-colors"
                >
                  Lanjut Belanja
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/cart");
                  }}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 text-xs shadow-md shadow-blue-600/20 transition-all"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KUSTOMISASI */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full max-h-[85vh] overflow-y-auto shadow-2xl p-5 relative border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-500 rounded-full w-8 h-8 font-bold hover:bg-slate-100 hover:text-slate-900 z-20 flex items-center justify-center border border-slate-200/60 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              ✕
            </button>

            <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 relative">
              <img
                src={selectedItem.imgUrl || selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    fallbackImages[selectedItem.id] ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
                }}
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {selectedItem.name}
              </h2>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-3">
                {selectedItem.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-3">
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Tingkat Kepedasan
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {["Original", "Sedang 🌶️", "Pedas 🌶️🌶️"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpicyLevel(lvl)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        spicyLevel === lvl
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Tambahan Topping
                </h4>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="font-semibold text-slate-700">
                      Extra Melted Cheese (+Rp 5.000)
                    </span>
                    <input
                      type="checkbox"
                      checked={extraCheese}
                      onChange={(e) => setExtraCheese(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="font-semibold text-slate-700">
                      Extra Special Sauce (+Rp 2.000)
                    </span>
                    <input
                      type="checkbox"
                      checked={extraSauce}
                      onChange={(e) => setExtraSauce(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Harga
                </span>
                <span className="font-extrabold text-blue-600 text-lg">
                  Rp{" "}
                  {(
                    Number(selectedItem.price) +
                    (extraCheese ? 5000 : 0) +
                    (extraSauce ? 2000 : 0)
                  ).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-slate-100 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-200 transition-all text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedItem, {
                      spicyLevel,
                      extraCheese,
                      extraSauce,
                    });
                    setSelectedItem(null);
                  }}
                  className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-xs shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}