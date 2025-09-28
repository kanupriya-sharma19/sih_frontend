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
                  suppressHydrationWarning
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
                suppressHydrationWarning
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
        <div className="container mx-auto flex items-center px-4 h-14">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/image.png"
              alt="Emblem"
              width={50}
              height={50}
            />
          </div>

          {/* Nav links centered */}
          <div className="flex-1 flex justify-center">
            <nav className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  suppressHydrationWarning
                  className="text-black hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-bold"
                >
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Logout aligned right */}
          <div>
            <button
              onClick={onLogout}
              suppressHydrationWarning
              className="bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold px-4 py-2 rounded shadow-md cursor-pointer transition flex items-center justify-center"
              type="button"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
