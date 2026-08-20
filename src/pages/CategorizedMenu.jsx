import React from "react"
import NavbarHomepage from "../components/Navigation/NavbarHomepage"
import Footer from "../components/Footer/Footer"

export default function CategorizedMenu() {
  const categories = ["Makanan Utama", "Minuman", "Cemilan", "Dessert"]

  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-50">
      <NavbarHomepage />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Kategori Menu</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer">
              <div className="h-40 bg-purple-100 rounded-lg mb-3 flex items-center justify-center text-purple-600 font-bold">
                {cat}
              </div>
              <h3 className="font-semibold text-center text-slate-700">{cat}</h3>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}