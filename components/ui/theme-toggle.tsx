\"use client\"

import * as React from "react"
import { Button } from "./button"
import { MoonIcon, SunIcon } from "lucide-react"
import { getStoredTheme, setStoredTheme, initThemeFromStorage } from "@/lib/storage"

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light" | null>(null)

  React.useEffect(() => {
    try {
      initThemeFromStorage("system")
      const stored = getStoredTheme()
      if (stored === "dark" || stored === "light") {
        setTheme(stored)
        return
      }

      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      const initial = prefersDark ? "dark" : "light"
      setTheme(initial)
    } catch (e) {
      // ignore (eg. SSR safety)
    }
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    try {
      setStoredTheme(next)
    } catch (e) {
      /* ignore */
    }
  }

  if (theme === null) {
    return null
  }

  const label = theme === "dark" ? "Modo oscuro" : "Modo claro"

  return (
    <Button
      onClick={toggle}
      aria-pressed={theme === "dark"}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-none hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
    >
      <span aria-hidden>
        {theme === "dark" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
      </span>
      <span className="sr-only">{label}</span>
    </Button>
  )
}
