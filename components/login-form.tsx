"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId) return alert("Enter User ID")

    const firstDigit = userId.trim()[0] // ensure no leading space
    let route = ""

    if (firstDigit === "1") route = "/reports/admin"
    else if (firstDigit === "3") route = "/reports/station_master"
    else if (firstDigit === "2") route = "/reports/section_controller"
    else return alert("Invalid User ID")

    router.push(route) 
  }

  if (!mounted) {
    return null // Prevent hydration errors by not rendering until mounted
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Employee ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white"
      />
      <Button 
      suppressHydrationWarning
      type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Login
      </Button>
    </form>
  )
}
