"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/schemas/profile.schema"
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface AccountInfoProps {
    email: string
    username: string
    onUpdate: (values: UpdateProfileInput) => void
}

export function AccountInfo({ email, username, onUpdate }: AccountInfoProps) {
    const form = useForm<UpdateProfileInput>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            username: username,
        },
    })

    const onSubmit = (values: UpdateProfileInput) => {
        onUpdate(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                disabled
                                className="bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">
                                El email no se puede modificar
                            </p>
                        </div>

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de Usuario</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Usuario" />
                                    </FormControl>
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
