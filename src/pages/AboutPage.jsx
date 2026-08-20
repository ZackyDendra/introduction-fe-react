import React from "react"
import NavbarHomepage from "../components/Navigation/NavbarHomepage"
import Footer from "../components/Footer/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-50">
      <NavbarHomepage />
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-8">
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
      </main>
      <Footer />
    </div>
  )
}