import React from "react"

export default function AboutPage() {
  return (
    <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
      <div className="w-full md:w-1/2 h-56 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold">
        Foto Restoran / Tim
      </div>
      <div className="w-full md:w-1/2 space-y-3">
        <h2 className="text-2xl font-bold text-slate-800">Tentang Kami</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Berdiri sejak tahun 2020, kami berkomitmen menyajikan hidangan berkualitas tinggi dengan resep otentik dan suasana tempat yang nyaman.
        </p>
      </div>
    </section>
  )
}