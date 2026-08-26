import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Homepage from "./pages/Homepage"
import CategorizedMenu from "./pages/CategorizedMenu"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import MenuDetailPage from "./pages/MenuDetailPage"
import CartPage from "./pages/CartPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login berdiri sendiri tanpa Sidebar/Navbar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman yang dibungkus MainLayout (Pakai Sidebar & Navbar) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/categorizedMenu" element={<CategorizedMenu />} />
          <Route path="/menu/:id" element={<MenuDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}