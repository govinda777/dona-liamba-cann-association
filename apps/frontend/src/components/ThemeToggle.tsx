"use client"

import * as React from "react"
import { MonitorPlay, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for component to mount
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`relative overflow-hidden transition-all duration-500 ease-in-out border-2 ${
        isDark
          ? "border-sombra-matrix bg-sombra-background text-sombra-matrix hover:bg-sombra-surface hover:text-sombra-electric"
          : "border-luz-primary bg-luz-surface text-luz-primary hover:bg-luz-primary hover:text-white"
      }`}
    >
      <div className="flex items-center gap-2 font-inter">
        {isDark ? (
          <>
            <MonitorPlay className="w-4 h-4 animate-pulse-subtle text-sombra-blockchain" />
            <span className="font-mono text-xs tracking-wider">MODO_DESENVOLVEDOR</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold text-sm">Ver Bastidores</span>
          </>
        )}
      </div>
    </Button>
  )
}
