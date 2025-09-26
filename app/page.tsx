"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RailwayDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Passenger Impact Dashboard</h1>
      <p className="text-muted-foreground">Quick Navigation</p>

      {/* 🔗 Navigation Buttons */}
      <div className="flex gap-4">
        <Link href="/reports/section_controller">
          <Button>section_controller</Button>
        </Link>
        <Link href="/reports/admin">
          <Button variant="outline">Admin</Button>
        </Link>
        <Link href="/reports/station_master">
          <Button variant="outline">station_master</Button>
        </Link>
 
      </div>
    </div>
  )
}
