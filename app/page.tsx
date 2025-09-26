"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RailwayDashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: "url('/images/image 1.png')" }} // Full background image
    >
      {/* 🚂 Centered Login/Signup Section */}
      <div className="w-full max-w-md bg-black/70 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center">
        <img
          src="/images/Rectangle 8.png" // Center image inside login div
          alt="Train"
          className="w-full h-40 object-cover rounded mb-4"
        />

        <form className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="User ID"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
        </form>
      </div>

      {/* 📊 Dashboard Navigation Section - outside login div */}
      <div className="text-center mt-10">
        <p className="text-white/70 mb-4">Quick Navigation</p>

        <div className="flex gap-4 justify-center">
          <Link href="/reports/section_controller">
            <Button>Section Controller</Button>
          </Link>
          <Link href="/reports/admin">
            <Button variant="outline">Admin</Button>
          </Link>
          <Link href="/reports/station_master">
            <Button variant="outline">Station Master</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
