"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth.schema"
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

interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const [showPassword, setShowPassword] = React.useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Button type="submit">Entrar</Button>
                </div>
            </form>
        </Form>
    )
}
