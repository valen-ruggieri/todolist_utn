import { z } from "zod"

export const updateProfileSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es requerido"),
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
