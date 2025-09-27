"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { VideoLoader } from "@/components/loader"

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [nextPath, setNextPath] = useState(pathname)

  useEffect(() => {
    if (pathname !== nextPath) {
      setLoading(true)
      setNextPath(pathname)
    }
  }, [pathname, nextPath])

  const handleLoaderFinish = () => setLoading(false)

  return (
    <>
      <VideoLoader
        videoSrc="/images/loader.mp4"
        show={loading}
        onFinish={handleLoaderFinish}
      />
      <div className={`${loading ? "pointer-events-none opacity-50" : ""}`}>{children}</div>
    </>
  )
}
