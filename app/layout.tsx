import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "200",
  subsets: ["latin"],
})

import "./globals.css"
import { PageTransitionWrapper } from "@/components/page_wrapper"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* ✅ Apply Kanit globally */}
      <body className={kanit.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
