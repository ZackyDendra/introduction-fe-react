import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";

const DEFAULT_IMAGES = {
  "big mac": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  "mcchicken": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  "egg mcmuffin": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
  "chicken mcnuggets": "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
  "french fries": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500",
  "coca-cola": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
  "apple pie": "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=500"
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500";

export default function MenuDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    API.get(`/menu/${id}`)
      .then((res) => {
        if (isMounted) {
          const itemData = res.data.data || res.data;
          setMenu(itemData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Gagal mengambil detail menu:", err);
          setError("Detail menu tidak ditemukan.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // FUNGSI TAMBAH KE LOCALSTORAGE KERANJANG
  const handleAddToCart = () => {
    if (!menu) return;

    // 1. Ambil data keranjang saat ini dari localStorage
    const savedCart = localStorage.getItem("cart");
    const currentCart = savedCart ? JSON.parse(savedCart) : [];

    // 2. Cek apakah barang sudah ada di keranjang
    const existingIndex = currentCart.findIndex((item) => item.id === menu.id);

    if (existingIndex > -1) {
      currentCart[existingIndex].qty += 1;
    } else {
      currentCart.push({ ...menu, qty: 1 });
    }

    // 3. Simpan kembali keranjang terbaru ke localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // 4. Alert & opsi pindah ke keranjang langsung
    alert(`Menu ${menu.name} berhasil ditambahkan ke keranjang!`);
  };

  if (loading) {
    return <div className="p-6 text-center text-slate-500 font-semibold">Memuat detail menu...</div>;
  }

  if (error || !menu) {
    return <div className="p-6 text-center text-red-500 font-semibold">{error || "Menu tidak ditemukan"}</div>;
  }

  const cleanName = (menu.name || "").toLowerCase().trim();
  const imageSrc = DEFAULT_IMAGES[cleanName] || menu.imgUrl || menu.imageUrl || FALLBACK_IMAGE;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-all"
      >
        ← Kembali
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid md:grid-cols-2">
        <div className="h-72 md:h-full bg-slate-100">
          <img
            src={imageSrc}
            alt={menu.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <div className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{menu.name}</h1>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              Rp {Number(menu.price).toLocaleString("id-ID")}
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Deskripsi & Porsi:
              </h3>
              <p className="text-slate-600 mt-1 leading-relaxed">
                {menu.description || "Menu lezat pilihan terbaik dari kami."}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-sm transition-all active:scale-95"
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}