"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth.schema"
import { LoginHeader } from "../loginHeader"
import { LoginForm } from "../loginForm"
import { LoginFooter } from "../loginFooter"
import { loginUser } from "@/services/auth.services"

export function LoginContainer() {
    const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (values: LoginFormValues) => {
    setError(null)
    try {
      setLoading(true)
      await loginUser(values)
      router.push("/todolist")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión"
      setError(message)
    } finally {
      setLoading(false)
    }
    }

    return (
        <div className="container mx-auto max-w-xl p-6 space-y-6">
            <LoginHeader />
      <LoginForm onSubmit={onSubmit} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Ingresando...</p>}
            <LoginFooter />
        </div>
    )
}
