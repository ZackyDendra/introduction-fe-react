import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function NavbarHomepage() {
  const location = useLocation()

  const getBtnClass = (path, bgColor) => {
    const isActive = location.pathname === path
    return `h-20 w-48 text-white font-bold text-xs flex items-center justify-center text-center p-2 rounded-xl transition-all ${bgColor} ${
      isActive ? "border-4 border-white shadow-lg" : "hover:opacity-90"
    }`
  }

  return (
    <nav className="bg-[#e31b40] w-full h-28 flex items-center justify-center gap-4 px-4">
      <Link to="/" className={getBtnClass("/", "bg-[#0091ff]")}>
        ini tombol ke / (Home)
      </Link>

      <Link to="/categorizedMenu" className={getBtnClass("/categorizedMenu", "bg-[#4a3b52]")}>
        ini tombol /categorizedMenu
      </Link>

      <Link to="/about" className={getBtnClass("/about", "bg-[#2d7a42]")}>
        ini tombol ke /about (About Our)
      </Link>
    </nav>
  )
}