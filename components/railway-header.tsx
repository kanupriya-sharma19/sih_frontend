"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust import path as needed

export function RailwayHeader() {
  const router = useRouter();

  const onLogout = () => router.push("/");

  const fontSizeOptions = ["A-", "A", "A+"];
  const otherOptions = ["☾", "More"];
  const navLinks = [
    { label: "Passenger Dashboard" },
    { label: "Peak Hours" },
    { label: "Station Performance" },
    { label: "Delays" },
    { label: "Charts" },
  ];

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
              {fontSizeOptions.map((label) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs bg-transparent hover:bg-white/20 text-white"
                >
                  {label}
                </Button>
              ))}
            </div>

            {otherOptions.map((label) => (
              <Button
                key={label}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs bg-transparent hover:bg-white/20 text-white"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* White navigation bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image src="/images/image.png" alt="Emblem" width={50} height={50} />
          </div>

          {/* Nav links */}
          <nav className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                className="px-4 py-2 text-black font-medium hover:bg-purple-50"
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* Logout */}
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-2 border-purple-600 text-black hover:bg-purple-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}