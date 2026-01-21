"use client"

import * as React from "react"
import { ProfileHeader } from "../profileHeader"
import { AccountInfo } from "../accountInfo"
import { ChangePassword } from "../changePassword"
import { Button } from "@/components/ui/button"
import type { UpdateProfileInput } from "@/lib/schemas/profile.schema"
import type { ChangePasswordInput } from "@/lib/schemas/profile.schema"
import { getProfile, changePassword } from "@/services/auth.services"

export function ProfileContainer() {
    const [email, setEmail] = React.useState<string>("")
    const [username, setUsername] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(true)
    const [message, setMessage] = React.useState<string | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                setLoading(true)
                const data = await getProfile()
                if (!mounted) return
                // Intentar mapear campos comunes
                setEmail((data as any).email ?? "")
                setUsername((data as any).username ?? (data as any).name ?? "")
            } catch (err) {
                console.error("Error al cargar perfil:", err)
                setError("No se pudo cargar el perfil")
            } finally {
                if (mounted) setLoading(false)
            }
        })()
        return () => {
            mounted = false
        }
    }, [])

    const handleUpdateProfile = (values: UpdateProfileInput) => {
        console.log("Actualizar perfil:", values)
        setUsername(values.username)
        // Aquí iría la llamada al servicio
    }

    const handleChangePassword = (values: ChangePasswordInput) => {
        setMessage(null)
        setError(null)
        ;(async () => {
            try {
                await changePassword(values.currentPassword, values.newPassword)
                setMessage("Contraseña actualizada correctamente")
            } catch (err) {
                console.error("Error al cambiar contraseña:", err)
                const msg = err instanceof Error ? err.message : "Error al cambiar contraseña"
                setError(msg)
            }
        })()
    }

    return (
        <div className="container mx-auto max-w-7xl p-6 space-y-6">
            <ProfileHeader />

            <AccountInfo
                email={email}
                username={username}
                onUpdate={handleUpdateProfile}
            />

            <ChangePassword onChangePassword={handleChangePassword} />
            {loading && <p className="text-sm text-muted-foreground">Cargando perfil...</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}
