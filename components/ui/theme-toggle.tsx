"use client"

import * as React from "react"
import { Button } from "./button"
import { MoonIcon, SunIcon } from "lucide-react"

const THEME_KEY = "theme"

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light" | null>(null)

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved === "dark" || saved === "light") {
        setTheme(saved)
        document.documentElement.classList.toggle("dark", saved === "dark")
        return
      }

      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      const initial = prefersDark ? "dark" : "light"
      setTheme(initial)
      document.documentElement.classList.toggle("dark", initial === "dark")
    } catch (e) {
      // ignore (eg. SSR safety)
    }
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch (e) {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", next === "dark")
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
