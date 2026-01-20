"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth.schema"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "../passwordInput"

interface RegisterFormProps {
    onSubmit: (values: RegisterFormValues) => void
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
    const [showPassword, setShowPassword] = React.useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" placeholder="Usuario" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" placeholder="tu@ejemplo.com" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    showPassword={showPassword}
                                    onTogglePassword={() => setShowPassword((s) => !s)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-between">
                    <Button type="submit">Crear cuenta</Button>
                </div>
            </form>
        </Form>
    )
}
