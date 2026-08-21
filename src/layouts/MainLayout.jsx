import React from "react"
import { Outlet } from "react-router-dom"
import NavbarHomepage from "../components/Navigation/NavbarHomepage"
import Sidebar from "../components/Navigation/Sidebar"
import Footer from "../components/Footer/Footer"

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-50">
      <NavbarHomepage />

      {/* Pembungkus agar Sidebar & Konten selalu berdampingan */}
      <div className="flex flex-1 w-full">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {/* Outlet adalah tempat halaman (Home, Menu, About) otomatis berganti */}
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}