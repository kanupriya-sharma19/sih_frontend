"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RailwayDashboard() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId) return alert("Enter User ID")

    const firstDigit = userId.trim()[0] // ensure no leading space
    let route = ""

    if (firstDigit === "1") route = "/reports/admin"
    else if (firstDigit === "2") route = "/reports/station_master"
    else if (firstDigit === "3") route = "/reports/section_controller"
    else return alert("Invalid User ID")

    router.push(route) 
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* ✅ Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image 1.png')" }}
      >
        <div className="absolute inset-0 z-0 bg-black/60" /> {/* overlay only on image */}
      </div>

      {/* 🚂 Login Section */}
      <div className="w-full max-w-3xl bg-black/70 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center p-6 relative z-10">
        <img
          src="/images/Rectangle 8.png"
          alt="Train"
          className="w-full h-50 object-cover rounded mb-4"
        />

        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            suppressHydrationWarning
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            suppressHydrationWarning
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Login
          </Button>
        </form>
      </div>

      {/* Quick Navigation */}
      <div className="text-center mt-10 z-10">
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
