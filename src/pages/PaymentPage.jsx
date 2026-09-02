import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("pendingOrder"));
    if (savedOrder) {
      setOrderData(savedOrder);
    }
  }, []);

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS / E-Wallet",
      desc: "GoPay, OVO, Dana, ShopeePay",
      icon: "📱",
    },
    {
      id: "bank",
      name: "Transfer Bank",
      desc: "BCA, Mandiri, BNI, BRI",
      icon: "🏦",
    },
    {
      id: "cash",
      name: "Tunai di Kasir",
      desc: "Bayar langsung di kasir saat ambil pesanan",
      icon: "💵",
    },
  ];

  const handlePay = () => {
    alert(`Pembayaran dengan metode [${selectedMethod.toUpperCase()}] berhasil diproses! Pesanan segera disiapkan.`);
    localStorage.removeItem("pendingOrder");
    localStorage.removeItem("cart");
    navigate("/");
  };

  const subtotal = orderData ? orderData.subtotal : 90000;
  const deliveryFee = orderData ? orderData.deliveryFee : 0;
  const grandTotal = orderData ? orderData.grandTotal : 90000;

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            Konfirmasi & Pembayaran
          </h1>
          <p className="text-xs text-amber-200/90 font-medium mt-1">
            Periksa kembali pesanan Anda sebelum melakukan pembayaran akhir.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* KOLOM KIRI (2 Kolom): DAFTAR PESANAN & METODE PEMBAYARAN */}
        <div className="md:col-span-2 space-y-6">
          {/* 1. DAFTAR PESANAN KAMU */}
          <div className="bg-red-900/80 backdrop-blur-md p-5 rounded-3xl border border-amber-400/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-red-800 pb-3">
              <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider">
                Daftar Pesanan Kamu
              </h3>
              <button
                onClick={() => navigate("/cart")}
                className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
              >
                ✏️ Ubah / Tambah Pesanan
              </button>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {orderData && orderData.items && orderData.items.length > 0 ? (
                orderData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-red-950/60 p-3 rounded-xl border border-red-800/60">
                    <div className="flex items-center gap-3">
                      <img src={item.imgUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        <p className="text-[11px] text-amber-200/80">Rp {item.price.toLocaleString("id-ID")} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-amber-400">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-amber-200/80">Memuat rincian item...</p>
              )}
            </div>
          </div>

          {/* 2. PILIH METODE PEMBAYARAN */}
          <div className="bg-red-900/80 backdrop-blur-md p-5 rounded-3xl border border-amber-400/30 shadow-2xl space-y-4">
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Pilih Metode Pembayaran
            </h3>

            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-red-800 border-amber-400 shadow-lg shadow-amber-400/10 scale-[1.01]"
                        : "bg-red-950/70 border-red-800/80 hover:border-amber-400/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl bg-red-900/90 p-2 rounded-xl border border-red-700">
                        {method.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-xs">
                          {method.name}
                        </h4>
                        <p className="text-[11px] text-amber-200/80 font-medium">
                          {method.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-amber-400 bg-amber-400"
                          : "border-red-400 bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-950"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: TOTAL TAGIHAN & TOMBOL BAYAR (PAS & TIDAK KEPANJANGAN) */}
        <div className="bg-red-900/80 backdrop-blur-md p-5 rounded-3xl border border-amber-400/30 shadow-2xl space-y-5 h-fit sticky top-6">
          <div className="space-y-3">
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider border-b border-red-800 pb-2">
              Total Tagihan
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-amber-100/80">
                <span>Subtotal Menu</span>
                <span className="font-bold text-white">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-amber-100/80">
                <span>Biaya Layanan</span>
                <span className="font-bold text-amber-400">
                  {deliveryFee === 0 ? "Gratis" : `Rp ${deliveryFee.toLocaleString("id-ID")}`}
                </span>
              </div>
            </div>

            <div className="border-t border-red-800 pt-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-amber-200/80 font-medium">Total Bayar</p>
                <p className="text-xl font-black text-amber-400">Rp {grandTotal.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-red-950 font-black py-3 rounded-2xl shadow-xl transition-all active:scale-95 text-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Bayar Sekarang</span>
            <span>🔥</span>
          </button>
        </div>

      </div>
    </div>
  );
}