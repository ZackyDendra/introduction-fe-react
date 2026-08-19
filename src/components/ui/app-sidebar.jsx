import React from "react"
import {
  Home,
  Utensils,
  Tag,
  Coffee,
  Truck,
  ShoppingBag,
  Heart,
  HelpCircle,
  Settings,
  PhoneCall
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

export function AppSidebar({ activeTab, setActiveTab }) {
  const mainNav = [
    { id: "home", title: "Home", icon: Home },
    { id: "menu", title: "Menu Favorit", icon: Utensils },
    { id: "promo", title: "Promo Spesial", icon: Tag, badge: "HOT" },
    { id: "mccafe", title: "McCafé", icon: Coffee },
    { id: "mcdelivery", title: "McDelivery", icon: Truck },
  ]

  const userNav = [
    { id: "pesanan", title: "Pesanan Saya", icon: ShoppingBag },
    { id: "favorit", title: "Favorit Saya", icon: Heart },
    { id: "faq", title: "Bantuan & FAQ", icon: HelpCircle },
    { id: "settings", title: "Pengaturan", icon: Settings },
  ]

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-100 bg-red-50/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ffbc0d] rounded-b-2xl flex items-center justify-center font-black text-2xl text-[#db0007] shadow-sm border border-yellow-300">
            M
          </div>
          <div>
            <h2 className="font-black text-base text-gray-900 tracking-tight leading-none">
              McDonald's
            </h2>
            <p className="text-[10px] font-extrabold text-[#db0007] tracking-widest uppercase mt-1">
              Indonesia App
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-black text-gray-400 uppercase tracking-wider px-3 mb-2">
            Navigasi Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNav.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-black text-sm transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#db0007] text-white shadow-md shadow-red-200 hover:bg-[#b80006] hover:text-white"
                          : "text-gray-700 hover:bg-yellow-100/70 hover:text-[#db0007]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-[#db0007]"}`} />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="ml-3 shrink-0 bg-[#ffbc0d] text-[#7a0004] text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[11px] font-black text-gray-400 uppercase tracking-wider px-3 mb-2">
            Aktivitas Saya
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {userNav.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        isActive
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? "text-[#db0007]" : "text-gray-400"}`} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-gray-100">
        <div className="bg-gradient-to-br from-[#ffbc0d] to-amber-400 p-3.5 rounded-2xl text-center shadow-xs border border-yellow-300">
          <div className="flex items-center justify-center gap-1.5 text-[#7a0004] mb-0.5">
            <PhoneCall className="w-3.5 h-3.5" />
            <p className="text-[10px] font-black uppercase tracking-wider">
              Layanan McDelivery
            </p>
          </div>
          <p className="text-sm font-black text-gray-900">14045</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}