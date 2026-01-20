"use client"

import * as React from "react"
import ThemeToggle from "./theme-toggle"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-50 p-4",
        "flex items-center justify-end"
      )}
    >
      <ThemeToggle />
    </aside>
  )
}
