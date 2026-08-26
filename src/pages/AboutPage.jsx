import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-10 w-full pb-20">
      {/* HERO / SECTION UTAMA TENTANG KAMI */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid md:grid-cols-2 gap-8 p-6 md:p-8 items-center">
        {/* GAMBAR RESTORAN / TIM */}
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-inner group">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
            alt="Suasana Restoran RestoApp"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          <span className="absolute bottom-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Dapur & Suasana Resto
          </span>
        </div>

        {/* DESKRIPSI TENTANG KAMI */}
        <div className="space-y-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Tentang RestoApp
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Menyajikan Kelezatan Fast Food Berkualitas Sejak 2020
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Berdiri sejak tahun 2020, kami berkomitmen menyajikan hidangan berkualitas tinggi dengan resep otentik dan suasana tempat yang nyaman. Setiap bahan pilihan diolah higienis untuk memberikan sensasi rasa terbaik di setiap gigitan.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/categorizedMenu")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-all active:scale-95"
            >
              Jelajahi Menu Kami →
            </button>
          </div>
        </div>
      </div>

      {/* ANGKA & STATISTIK RESTO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-3xl font-black text-red-600">100%</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Bahan Segar & Halal</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-3xl font-black text-red-600">50K+</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Pelanggan Puas</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-3xl font-black text-red-600">15 Min</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Rata-rata Penyajian</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-3xl font-black text-red-600">4.9 ★</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Rating Ulasan</p>
        </div>
      </div>

      {/* KEUNGGULAN / NILAI UTAMA */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Mengapa Memilih Kami?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-black text-xl mb-3">
              🍔
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Resep Khas Otentik</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bumbu dan racikan rahasia chef kami memberikan cita rasa burger dan ayam yang gurih renyah tanpa tanding.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-black text-xl mb-3">
              ⚡
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Pelayanan Cepat</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pesanan siap dalam hitungan menit tanpa mengorbankan kualitas kesegaran rasa hidangan Anda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-black text-xl mb-3">
              🛵
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Pengiriman Hangat</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kemasan ramah lingkungan yang menjaga suhu makanan tetap hangat sampai ke pintu rumah Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}