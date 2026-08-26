import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
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
  
  // Biaya Ongkir cuma ada kalau pilih Delivery
  const deliveryFee = orderType === "delivery" ? (subtotal >= 50000 ? 0 : 10000) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Keranjang kamu masih kosong!");
    
    const typeLabel = {
      drivethru: "Drive Thru",
      dinein: "Makan di Tempat (Dine In)",
      takeaway: "Bawa Pulang (Takeaway)",
      delivery: "Pesan Antar (Delivery)"
    }[orderType];

    alert(`Pesanan [${typeLabel}] berhasil dibuat!\nTotal Bayar: Rp ${grandTotal.toLocaleString("id-ID")}`);
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Keranjang Belanja</h1>
          <p className="text-xs text-slate-500">Periksa kembali pesanan Anda sebelum checkout</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline"
          >
            Kosongkan Keranjang
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <span className="text-6xl">🛒</span>
          <h3 className="text-xl font-bold text-slate-800">Keranjang Kamu Masih Kosong</h3>
          <p className="text-sm text-slate-500">Yuk, pilih menu lezat favoritmu sekarang!</p>
          <button
            onClick={() => navigate("/categorizedMenu")}
            className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-red-700 transition-all"
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
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imgUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                  />
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                    </p>
                    <p className="text-sm font-black text-blue-600 mt-1">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button
                      onClick={() => handleQuantity(item.id, -1)}
                      className="w-7 h-7 bg-white rounded-lg shadow-sm font-bold text-slate-700 hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity(item.id, 1)}
                      className="w-7 h-7 bg-white rounded-lg shadow-sm font-bold text-slate-700 hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RINGKASAN PESANAN & TIPE PESANAN */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3">
                Ringkasan Pesanan
              </h3>

              {/* TIPE PESANAN */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Layanan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("drivethru")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === "drivethru"
                        ? "bg-red-600 border-red-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    🚗 Drive Thru
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("dinein")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === "dinein"
                        ? "bg-red-600 border-red-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    🍽️ Dine In
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("takeaway")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === "takeaway"
                        ? "bg-red-600 border-red-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    🛍️ Takeaway
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === "delivery"
                        ? "bg-red-600 border-red-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    🛵 Delivery
                  </button>
                </div>
              </div>

              {/* RINCIAN BIAYA */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Menu</span>
                  <span className="font-bold text-slate-800">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>

                {orderType === "delivery" && (
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Pengiriman</span>
                    {deliveryFee === 0 ? (
                      <span className="font-bold text-emerald-600">GRATIS</span>
                    ) : (
                      <span className="font-bold text-slate-800">
                        Rp {deliveryFee.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* METODE PEMBAYARAN */}
              <div className="pt-2 space-y-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Metode Pembayaran
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="qris">📱 QRIS / E-Wallet</option>
                  <option value="cash">💵 Bayar di Kasir / Tempat</option>
                  <option value="bank">M-Banking / Transfer Bank</option>
                </select>
              </div>

              {/* TOTAL PEMBAYARAN */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Total Bayar</p>
                  <p className="text-xl font-black text-emerald-600">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* TOMBOL CHECKOUT */}
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 text-sm"
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