import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import HomeFooter from "../home/HomeFooter"

export default function MainLayout() {
  return (
    <div className="home-dark flex min-h-screen flex-col overflow-x-hidden bg-[#0B0D10] text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <HomeFooter />
    </div>
  )
}
