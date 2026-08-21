import React from "react"

export default function Homepage() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">Selamat Datang di Resto Kami</h1>
        <p className="text-blue-100">Nikmati ragam hidangan terbaik dengan bahan segar pilihan.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {["Spesial Hari Ini", "Menu Favorit", "Promo Minggu Ini"].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium">
              Foto {item}
            </div>
            <h3 className="font-bold text-lg mb-1">{item}</h3>
            <p className="text-xs text-slate-500">Kombinasi rasa unik siap memanjakan lidah Anda.</p>
          </div>
        ))}
      </section>
    </div>
  )
}