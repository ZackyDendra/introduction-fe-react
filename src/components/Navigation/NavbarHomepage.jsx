import React from "react"
import { Link } from "react-router-dom"

export default function NavbarHomepage() {
  return (
    <div className="bg-red-600 p-4 flex gap-4">
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">
        Home
      </Link>
      <Link to="/categorizedMenu" className="bg-slate-700 text-white px-4 py-2 rounded-lg font-bold">
        Categorized Menu
      </Link>
      <Link to="/cart" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold">
        Keranjang
      </Link>
      <Link to="/login" className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">
        Login
      </Link>
    </div>
  )
}