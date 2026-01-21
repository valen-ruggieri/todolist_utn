"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth.schema"
import { RegisterHeader } from "../registerHeader"
import { RegisterForm } from "../registerForm"
import { RegisterFooter } from "../registerFooter"
import { registerUser } from "@/services/auth.services"

export function RegisterContainer() {
    const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null)
    try {
      setLoading(true)
      await registerUser(values)
      router.push("/todolist")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al registrarse"
      setError(message)
    } finally {
      setLoading(false)
    }
    }

    return (
        <div className="container mx-auto max-w-xl p-6 space-y-6">
            <RegisterHeader />
      <RegisterForm onSubmit={onSubmit} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Creando cuenta...</p>}
            <RegisterFooter />
        </div>
    )
}
