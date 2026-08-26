import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cleaner nilai angka yang aman
  const cleanNumber = (val) => {
    if (!val) return 0;
    if (typeof val === "number") return isNaN(val) ? 0 : val;
    const sanitized = String(val).replace(/[^0-9]/g, "");
    return parseInt(sanitized, 10) || 0;
  };

  // Fungsi ubah jumlah lewat tombol (+ / -)
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const currentQty = cleanNumber(item.quantity) || 1;
            const newQty = currentQty + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Fungsi ubah jumlah lewat KETIK MANUAL
  const handleInputChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          // Jika dikosongkan saat mengetik, berikan nilai 0 sementara (atau min 1)
          return { ...item, quantity: isNaN(parsedValue) ? "" : parsedValue };
        }
        return item;
      })
    );
  };

  // Saat selesai mengetik (blur), jika nilainya 0 atau kosong, kembalikan ke 1
  const handleInputBlur = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: 1 } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPembayaran = cart.reduce((sum, item) => {
    const price = cleanNumber(item.price);
    const qty = cleanNumber(item.quantity);
    return sum + price * qty;
  }, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Keranjang Belanja</h1>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
          >
            Kosongkan Keranjang
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-100 shadow-sm">
          Keranjang belanja Anda masih kosong.
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const price = cleanNumber(item.price);
            const qty = cleanNumber(item.quantity);
            const itemSubtotal = price * qty;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Rp {price.toLocaleString("id-ID")} x
                  </p>
                </div>

                {/* Kontrol Jumlah (+ / Ketik / -) */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-white rounded-lg text-slate-700 font-bold hover:bg-slate-200 shadow-sm flex items-center justify-center transition-all"
                  >
                    -
                  </button>

                  {/* Input Manual Yang Bisa Diketik */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    onBlur={(e) => handleInputBlur(item.id, e.target.value)}
                    className="w-12 text-center font-bold text-slate-800 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-white rounded-lg text-slate-700 font-bold hover:bg-slate-200 shadow-sm flex items-center justify-center transition-all"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4 min-w-[130px] justify-end">
                  <span className="font-bold text-blue-600 text-lg">
                    Rp {itemSubtotal.toLocaleString("id-ID")}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-300 hover:text-red-500 font-bold text-xl px-2 transition-colors"
                    title="Hapus Item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          <div className="bg-slate-900 text-white rounded-2xl p-6 flex justify-between items-center shadow-lg mt-6">
            <span className="text-lg font-bold">Total Pembayaran:</span>
            <span className="text-2xl font-black text-emerald-400">
              Rp {totalPembayaran.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}