import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80",
      badge: "🔥 PROMO POPULER",
      title: "Sensasi Kelezatan",
      highlight: "Burger Grilled & Daging Juices",
      desc: "Daging sapi pilihan dipanggang sempurna dengan bumbu rahasia khas resto. Pesan sekarang!",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1600&q=80",
      badge: "🍗 KRISPI & LEZAT",
      title: "Ayam Crispy Spesial",
      highlight: "Renyah Diluar, Lembut Di Dalam",
      desc: "Ayam goreng dengan balutan tepung rempah istimewa yang dipadukan sambal khas.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&q=80",
      badge: "⚡ DISKON HINGGA 50%",
      title: "Spesial Combo Feast",
      highlight: "Paket Hemat Sekeluarga",
      desc: "Dapatkan potongan harga khusus untuk pembelian menu combo pilihan hari ini.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[450px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl group bg-slate-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent" />

          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between max-w-xl text-white z-10">
            <div className="space-y-3 pt-2">
              <span className="inline-block bg-red-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                {slide.badge}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
                {slide.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">
                  {slide.highlight}
                </span>
              </h1>
              <p className="text-slate-200 text-xs md:text-sm leading-relaxed max-w-md">
                {slide.desc}
              </p>
            </div>

            <div className="pb-4">
              <button
                onClick={() => navigate("/categorizedMenu")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer text-sm"
              >
                Lihat Semua Menu →
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? "w-7 bg-red-600" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}