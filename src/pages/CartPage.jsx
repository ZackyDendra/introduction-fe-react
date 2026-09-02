import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState("drivethru"); // drivethru | dinein | takeaway | delivery
  const [paymentMethod, setPaymentMethod] = useState("qris");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length === 0) {
      const initialCart = [
        {
          id: 1,
          name: "Big Mac",
          price: 35000,
          quantity: 1,
          imgUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        },
        {
          id: 2,
          name: "Chicken McNuggets",
          price: 40000,
          quantity: 1,
          imgUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
        },
        {
          id: 3,
          name: "Coca-Cola",
          price: 15000,
          quantity: 1,
          imgUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
        },
      ];
      setCartItems(initialCart);
      localStorage.setItem("cart", JSON.stringify(initialCart));
    } else {
      setCartItems(savedCart);
    }
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQuantity = (id, delta) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === "delivery" ? (subtotal >= 50000 ? 0 : 10000) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Keranjang kamu masih kosong!");
    
    // Simpan data pesanan sementara untuk dibawa ke halaman pembayaran
    const orderData = {
      items: cartItems,
      orderType,
      paymentMethod,
      subtotal,
      deliveryFee,
      grandTotal
    };
    localStorage.setItem("pendingOrder", JSON.stringify(orderData));

    // Pindah ke halaman pembayaran sesuai route aplikasi kamu
    navigate("/payment");
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-wide">Keranjang Belanja</h1>
          <p className="text-xs text-amber-200/90 font-medium">Periksa kembali pesanan Anda sebelum checkout</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-300 hover:text-white transition cursor-pointer"
          >
            Kosongkan Keranjang
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-red-900/60 backdrop-blur-md rounded-3xl p-12 text-center border border-red-700/50 space-y-4 shadow-xl">
          <span className="text-6xl">🛒</span>
          <h3 className="text-xl font-bold text-white">Keranjang Kamu Masih Kosong</h3>
          <p className="text-sm text-amber-200/90">Yuk, pilih menu lezat favoritmu sekarang!</p>
          <button
            onClick={() => navigate("/categorizedMenu")}
            className="bg-amber-400 text-red-950 font-black px-6 py-2.5 rounded-xl shadow-md hover:bg-amber-300 transition-all cursor-pointer"
          >
            Lihat Menu Resto
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* LIST ITEM PESANAN */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-red-900/60 backdrop-blur-md p-4 rounded-2xl border border-red-700/50 shadow-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imgUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-red-950/60 border border-red-800"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                    <p className="text-xs text-amber-200/80 font-medium">
                      Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                    </p>
                    <p className="text-sm font-black text-amber-400 mt-1">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-red-950/80 rounded-xl p-1 border border-red-800/80">
                    <button
                      onClick={() => handleQuantity(item.id, -1)}
                      className="w-7 h-7 bg-red-900 rounded-lg shadow-sm font-bold text-white hover:bg-red-800 transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity(item.id, 1)}
                      className="w-7 h-7 bg-red-900 rounded-lg shadow-sm font-bold text-white hover:bg-red-800 transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-300 hover:text-white p-1 font-bold text-lg transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RINGKASAN PESANAN & TIPE PESANAN */}
          <div className="space-y-4">
            <div className="bg-red-900/60 backdrop-blur-md p-5 rounded-2xl border border-red-700/50 shadow-xl space-y-4">
              <h3 className="font-bold text-white border-b border-red-800/60 pb-3">
                Ringkasan Pesanan
              </h3>

              {/* TIPE PESANAN */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-200 block">
                  Pilih Layanan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("drivethru")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "drivethru"
                        ? "bg-amber-400 border-amber-400 text-red-950 font-black shadow-md"
                        : "bg-red-950/50 border-red-800/60 text-slate-200 hover:bg-red-900"
                    }`}
                  >
                    🚗 Drive Thru
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("dinein")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "dinein"
                        ? "bg-amber-400 border-amber-400 text-red-950 font-black shadow-md"
                        : "bg-red-950/50 border-red-800/60 text-slate-200 hover:bg-red-900"
                    }`}
                  >
                    🍽️ Dine In
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("takeaway")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "takeaway"
                        ? "bg-amber-400 border-amber-400 text-red-950 font-black shadow-md"
                        : "bg-red-950/50 border-red-800/60 text-slate-200 hover:bg-red-900"
                    }`}
                  >
                    🛍️ Takeaway
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "delivery"
                        ? "bg-amber-400 border-amber-400 text-red-950 font-black shadow-md"
                        : "bg-red-950/50 border-red-800/60 text-slate-200 hover:bg-red-900"
                    }`}
                  >
                    🛵 Delivery
                  </button>
                </div>
              </div>

              {/* RINCIAN BIAYA */}
              <div className="space-y-2 text-xs pt-2 border-t border-red-800/60">
                <div className="flex justify-between text-amber-100/80">
                  <span>Subtotal Menu</span>
                  <span className="font-bold text-white">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>

                {orderType === "delivery" && (
                  <div className="flex justify-between text-amber-100/80">
                    <span>Biaya Pengiriman</span>
                    {deliveryFee === 0 ? (
                      <span className="font-bold text-amber-400">GRATIS</span>
                    ) : (
                      <span className="font-bold text-white">
                        Rp {deliveryFee.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* METODE PEMBAYARAN */}
              <div className="pt-2 space-y-2 border-t border-red-800/60">
                <label className="text-xs font-bold text-amber-200 block">
                  Metode Pembayaran
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-800/80 rounded-xl p-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="qris" className="bg-red-950 text-white">📱 QRIS / E-Wallet</option>
                  <option value="bank" className="bg-red-950 text-white">🏦 Transfer Bank</option>
                  <option value="cash" className="bg-red-950 text-white">💵 Tunai di Kasir</option>
                </select>
              </div>

              {/* TOTAL PEMBAYARAN */}
              <div className="border-t border-red-800/60 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-amber-200/80 font-medium">Total Bayar</p>
                  <p className="text-xl font-black text-amber-400">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* TOMBOL CHECKOUT */}
              <button
                onClick={handleCheckout}
                className="w-full bg-amber-400 hover:bg-amber-300 text-red-950 font-black py-3 rounded-xl shadow-md transition-all active:scale-95 text-sm cursor-pointer"
              >
                Buat Pesanan Sekarang →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}