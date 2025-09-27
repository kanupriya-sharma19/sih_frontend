"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"

export function RailwayHeader() {
  return (
    <header className="w-full">
      {/* Top purple bar */}
      <div className="bg-[#6C4EFF] text-white text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 h-8">
          <div className="flex items-center space-x-2">
            <span>Government of Railways</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:underline">
              Skip to Main Content
            </a>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="px-2 h-6 text-xs">
                A-
              </Button>
              <Button variant="ghost" size="sm" className="px-2 h-6 text-xs">
                A
              </Button>
              <Button variant="ghost" size="sm" className="px-2 h-6 text-xs">
                A+
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="px-2 h-6 text-xs">
              ☾
            </Button>
            <Button variant="ghost" size="sm" className="px-2 h-6 text-xs">
              More
            </Button>
          </div>
        </div>
      </div>

      {/* White navigation bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
            src="/images/image.png"
               alt="Emblem"
              width={50}
              height={50}
            />
          </div>

          {/* Nav links */}
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Passenger Dashboard
            </Button>
            <Button variant="ghost" size="sm">
              Peak Hours
            </Button>
            <Button variant="ghost" size="sm">
              Station Performance
            </Button>
            {/* <Button variant="ghost" size="sm">
              Weather
            </Button> */}
            <Button variant="ghost" size="sm">
              Delays
            </Button>
                 <Button variant="ghost" size="sm">
              Charts
            </Button>
          </nav>

          {/* Search */}
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
