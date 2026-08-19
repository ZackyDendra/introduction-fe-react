import { useState } from "react"
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/ui/app-sidebar"

// Data Promo McD
const PROMO_DATA = [
  {
    id: 1,
    title: "Promo Hemat Drive Thru",
    desc: "Diskon 30% untuk transaksi via Drive Thru tiap hari Rabu.",
    code: "DRIVETH30",
    badge: "Diskon 30%",
    bg: "bg-red-50 border-red-200",
  },
  {
    id: 2,
    title: "Package Paket Rame-Rame",
    desc: "Beli 3 Ayam McD + 3 Nasi + 3 Coke hanya Rp 60.000 saja!",
    code: "RAMERAME60",
    badge: "Super Hemat",
    bg: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 3,
    title: "Cashback McDelivery",
    desc: "Gratis ongkir + Cashback 20% untuk pemesanan via aplikasi.",
    code: "DELIVFREE",
    badge: "Gratis Ongkir",
    bg: "bg-amber-50 border-amber-200",
  },
]

// Data Menu Khas McD
const MCD_PRODUCTS = [
  {
    id: 1,
    name: "Big Mac®",
    category: "Burger",
    desc: "Dua lapis daging sapi gurih dengan saus spesial, selada segar, keju, acar, dan bawang.",
    price: "Rp 42.000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  {
    id: 2,
    name: "McSpicy™",
    category: "Burger",
    desc: "Daging paha ayam goreng renyah dengan rasa pedas khas, dilapisi selada segar dan mayones.",
    price: "Rp 38.500",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&q=80",
  },
  {
    id: 3,
    name: "Ayam Goreng McD Crispy",
    category: "Ayam",
    desc: "Ayam goreng renyah khas McDonald's dengan bumbu pilihan yang meresap hingga ke dalam.",
    price: "Rp 22.000",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
  },
  {
    id: 4,
    name: "French Fries",
    category: "Cemilan",
    desc: "Kentang goreng gurih dan renyah dipotong dari kentang pilihan berkualitas tinggi.",
    price: "Rp 21.000",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&q=80",
  },
  {
    id: 5,
    name: "McFlurry™ feat. OREO",
    category: "Dessert",
    desc: "Es krim soft serve vanila lembut dipadu dengan renyahnya remahan biskuit OREO.",
    price: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
  },
  {
    id: 6,
    name: "Coca-Cola Zero Sugar",
    category: "Minuman",
    desc: "Minuman bersoda dingin menyegarkan tanpa gula.",
    price: "Rp 14.000",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80",
  },
]

// Modal Login & Register
function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi login/daftar sukses
    const userName = isRegister ? formData.name : (formData.email.split('@')[0] || "Pelanggan")
    onLoginSuccess({ name: userName, email: formData.email })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border-4 border-[#ffbc0d]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-10 bg-[#ffbc0d] rounded-b-xl inline-flex items-center justify-center font-black text-2xl text-[#db0007] mb-2 shadow-inner">
            M
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            {isRegister ? "Buat Akun Akun McD" : "Masuk ke Akun McD"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isRegister ? "Daftar untuk menikmati berbagai promo eksklusif" : "Masukan email dan kata sandi Anda"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db0007] text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Email</label>
            <input 
              type="email" 
              required
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db0007] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Kata Sandi</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db0007] text-sm"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#db0007] hover:bg-[#b80006] text-white font-extrabold py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm mt-2"
          >
            {isRegister ? "Daftar Sekarang" : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-600">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[#db0007] hover:underline"
          >
            {isRegister ? "Masuk di sini" : "Daftar Akun Baru"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Navbar Komponen
function Navbar({ user, onOpenAuth, onLogout }) {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-1.5 bg-[#db0007]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="md:hidden text-gray-700" />
          
          <button 
            onClick={toggleSidebar} 
            className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
            title="Klik untuk menyembunyikan / menampilkan sidebar"
          >
            <div className="w-12 h-10 bg-[#ffbc0d] rounded-b-xl flex items-center justify-center font-black text-3xl text-[#db0007] shadow-inner group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 hidden sm:inline">
              McDonald's <span className="text-[#db0007]">Indonesia</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-700 ml-6">
            <a href="#promo" className="hover:text-[#db0007] transition-colors">Promo</a>
            <a href="#menu" className="hover:text-[#db0007] transition-colors">Menu</a>
            <a href="#mccafe" className="hover:text-[#db0007] transition-colors">McCafé</a>
            <a href="#mcdelivery" className="hover:text-[#db0007] transition-colors">McDelivery</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-800 hidden sm:inline">
                Halo, <span className="text-[#db0007]">{user.name}</span>
              </span>
              <button 
                onClick={onLogout}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-full text-xs transition-all"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="bg-[#ffbc0d] hover:bg-[#e0a400] text-[#7a0004] font-extrabold px-6 py-2.5 rounded-full text-sm shadow-md transition-all active:scale-95"
            >
              Masuk / Daftar
            </button>
          )}

          <button className="bg-[#db0007] hover:bg-[#b80006] text-white font-extrabold px-6 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
            Mulai Pesan
          </button>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />

        <div className="flex flex-col min-h-screen w-full bg-[#f8f9fa] font-sans antialiased text-gray-800">
          
          {/* Navbar */}
          <Navbar 
            user={user} 
            onOpenAuth={() => setIsAuthOpen(true)} 
            onLogout={() => setUser(null)} 
          />

          {/* Modal Login / Register */}
          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
            onLoginSuccess={(userData) => setUser(userData)} 
          />

          {/* Hero Banner Promo */}
          <section className="bg-[#db0007] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <span className="bg-[#ffbc0d] text-[#db0007] font-black text-xs uppercase px-3 py-1 rounded-full tracking-wider">
                  Nikmati Momen Manis
                </span>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                  i'm lovin' it<span className="text-[#ffbc0d]">.</span>
                </h1>
                <p className="text-red-100 text-base sm:text-lg">
                  Pesan menu favoritmu sekarang lewat McDelivery, Drive Thru, atau langsung di restoran terdekat.
                </p>
                <div className="pt-2 flex justify-center md:justify-start gap-4">
                  <a href="#menu" className="bg-[#ffbc0d] hover:bg-[#e0a400] text-[#7a0004] font-extrabold px-8 py-3.5 rounded-full shadow-lg transition-all">
                    Lihat Semua Menu
                  </a>
                </div>
              </div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-[#ffbc0d] rounded-full p-3 shadow-2xl flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" 
                  alt="Big Mac Hero" 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>
            </div>
          </section>

          {/* SECTION PROMOSI TERBARU */}
          <section id="promo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Promo Spesial Hari Ini 🔥</h2>
                <p className="text-sm text-gray-500">Gunakan kode promo saat transaksi untuk mendapatkan penawaran spesial</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROMO_DATA.map((promo) => (
                <div 
                  key={promo.id} 
                  className={`p-6 rounded-3xl border-2 ${promo.bg} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div>
                    <span className="bg-[#db0007] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                      {promo.badge}
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-3 mb-1">{promo.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">{promo.desc}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200/60 pt-4 mt-2">
                    <span className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-bold">
                      {promo.code}
                    </span>
                    <button 
                      onClick={() => !user && setIsAuthOpen(true)}
                      className="text-xs font-black text-[#db0007] hover:underline"
                    >
                      Klaim Promo →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Menu Section */}
          <main id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Menu Favorit McDonald's</h2>
              <div className="w-16 h-1 bg-[#ffbc0d] mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MCD_PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="p-6">
                    <div className="relative h-48 w-full mb-4 bg-gray-50 rounded-2xl overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-[#ffbc0d] text-[#7a0004] font-black text-xs px-3 py-1 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#db0007] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Harga Mula</span>
                      <span className="text-lg font-black text-[#db0007]">{product.price}</span>
                    </div>
                    <button className="bg-[#ffbc0d] hover:bg-[#e0a400] text-[#7a0004] font-extrabold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
                      + Pesan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 border-t-8 border-[#ffbc0d] mt-16 py-8 px-6 text-center">
            <p className="text-xs text-gray-500">© 2026 McDonald's Indonesia. All Rights Reserved.</p>
          </footer>

        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
} 