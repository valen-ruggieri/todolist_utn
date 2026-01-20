"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema, type ChangePasswordInput } from "@/lib/schemas/profile.schema"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PasswordInput } from "@/components/auth/passwordInput"

interface ChangePasswordProps {
    onChangePassword: (values: ChangePasswordInput) => void
}

export function ChangePassword({ onChangePassword }: ChangePasswordProps) {
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
    const [showNewPassword, setShowNewPassword] = React.useState(false)

    const form = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    })

    const onSubmit = (values: ChangePasswordInput) => {
        onChangePassword(values)
        form.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>
                    Deja estos campos vacíos si no deseas cambiar tu contraseña
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña Actual</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Ingresa tu contraseña actual"
                                            showPassword={showCurrentPassword}
                                            onTogglePassword={() => setShowCurrentPassword((s) => !s)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nueva Contraseña</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Ingresa tu nueva contraseña"
                                            showPassword={showNewPassword}
                                            onTogglePassword={() => setShowNewPassword((s) => !s)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Mínimo 8 caracteres, debe contener mayúsculas, minúsculas y números
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Guardar Cambios</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
