import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function RailwayDashboard() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
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

      <LoginForm />
      </div>

      {/* Quick Navigation
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
      </div> */}
    </div>
  )
}
