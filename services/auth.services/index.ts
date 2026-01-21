import type { LoginFormValues, RegisterFormValues } from "@/lib/schemas/auth.schema"
import { api } from "@/lib/api.client"

const TOKEN_KEY = "todolist_token"

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string) {
  if (typeof window === "undefined") return
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken() {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_KEY)
}

function authHeaders(token?: string) {
  const bearer = token || getStoredToken()
  return bearer ? { Authorization: `Bearer ${bearer}` } : {}
}

export async function registerUser(values: RegisterFormValues) {
  const payload = {
    name: values.username,
    email: values.email,
    password: values.password,
  }

  const data = await api.post<{ token: string; user: Record<string, unknown> }>("/auth/register", payload)

  if (!data || !(data as any).token) {
    throw new Error("Error al registrar")
  }

  setStoredToken((data as any).token)
  return data
}

export async function loginUser(values: LoginFormValues) {
  const payload = {
    email: values.email,
    password: values.password,
  }

  const data = await api.post<{ token: string; user: Record<string, unknown> }>("/auth/login", payload)

  if (!data || !(data as any).token) {
    throw new Error("Error al iniciar sesión")
  }

  setStoredToken((data as any).token)
  return data
}

export async function getProfile() {
  const data = await api.get<Record<string, unknown>>("/auth/profile", { requireAuth: true })
  return data
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const data = await api.put("/auth/change-password", { currentPassword, newPassword }, { requireAuth: true })
  return data
}

export { authHeaders }