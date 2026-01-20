"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface PasswordInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    showPassword: boolean
    onTogglePassword: () => void
}

export function PasswordInput({
    value,
    onChange,
    placeholder = "Tu contraseña",
    showPassword,
    onTogglePassword,
}: PasswordInputProps) {
    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
                {showPassword ? "Ocultar" : "Mostrar"}
            </button>
        </div>
    )
}
