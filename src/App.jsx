import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Homepage from "./pages/Homepage"
import CategorizedMenu from "./pages/CategorizedMenu"
import AboutPage from "./pages/AboutPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout membungkus semua route halaman di bawahnya */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/categorizedMenu" element={<CategorizedMenu />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}