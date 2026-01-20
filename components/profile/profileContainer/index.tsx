"use client"

import * as React from "react"
import { ProfileHeader } from "../profileHeader"
import { AccountInfo } from "../accountInfo"
import { ChangePassword } from "../changePassword"
import { Button } from "@/components/ui/button"
import type { UpdateProfileInput } from "@/lib/schemas/profile.schema"
import type { ChangePasswordInput } from "@/lib/schemas/profile.schema"

export function ProfileContainer() {
    // Datos hardcodeados
    const [email] = React.useState("pepe@gmail.com")
    const [username, setUsername] = React.useState("pepe")

    const handleUpdateProfile = (values: UpdateProfileInput) => {
        console.log("Actualizar perfil:", values)
        setUsername(values.username)
        // Aquí iría la llamada al servicio
    }

    const handleChangePassword = (values: ChangePasswordInput) => {
        console.log("Cambiar contraseña:", values)
        // Aquí iría la llamada al servicio
    }

    return (
        <div className="container mx-auto max-w-4xl p-6 space-y-6">
            <ProfileHeader />
            
            <AccountInfo
                email={email}
                username={username}
                onUpdate={handleUpdateProfile}
            />

            <ChangePassword onChangePassword={handleChangePassword} />
        </div>
    )
}
