import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "El correo es requerido")
        .email("Introduce un correo válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const registerSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es requerido"),
    email: z.string().min(1, "El correo es requerido").email("Introduce un correo válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
