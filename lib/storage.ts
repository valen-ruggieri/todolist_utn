export type ClientInfo = {
  id?: string
  name?: string
  email?: string
  [key: string]: any
}

const CLIENT_INFO_KEY = "todolist_client"
const THEME_KEY = "todolist_theme"

function isClient() {
  return typeof window !== "undefined"
}

export function getStoredClient(): ClientInfo | null {
  if (!isClient()) return null
  try {
    const v = localStorage.getItem(CLIENT_INFO_KEY)
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}

export function setStoredClient(info: ClientInfo) {
  if (!isClient()) return
  try {
    localStorage.setItem(CLIENT_INFO_KEY, JSON.stringify(info))
  } catch {
    // ignore
  }
}

export function clearStoredClient() {
  if (!isClient()) return
  localStorage.removeItem(CLIENT_INFO_KEY)
}

export type Theme = "light" | "dark" | "system"

export function getStoredTheme(): Theme | null {
  if (!isClient()) return null
  const v = localStorage.getItem(THEME_KEY)
  return (v as Theme) || null
}

export function setStoredTheme(theme: Theme) {
  if (!isClient()) return
  try {
    localStorage.setItem(THEME_KEY, theme)
    applyTheme(theme)
  } catch {
    // ignore
  }
}

export function clearStoredTheme() {
  if (!isClient()) return
  localStorage.removeItem(THEME_KEY)
}

export function applyTheme(theme: Theme) {
  if (!isClient()) return
  const root = document.documentElement
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

  const useDark = theme === "dark" || (theme === "system" && prefersDark)

  if (useDark) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function initThemeFromStorage(defaultTheme: Theme = "system") {
  if (!isClient()) return
  const stored = getStoredTheme()
  const themeToApply = stored || defaultTheme
  applyTheme(themeToApply)
}

