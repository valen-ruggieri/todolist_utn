"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTodoSchema } from "@/lib/schemas/todo.schema"
import type { CreateTodoInput } from "@/lib/schemas/todo.schema"
import type { Todo } from "@/lib/schemas/todo.schema"

import {
    Form,
    FormField,
    FormItem,
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
import { Mic } from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoFormProps {
    onAddTodo: (text: string) => Promise<void>
    onStartRecording: () => void
    recognitionAvailable: boolean
}

export function TodoForm({ onAddTodo, onStartRecording, recognitionAvailable }: TodoFormProps) {
    const form = useForm<CreateTodoInput>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            text: "",
        },
    })

    const onSubmit = async (values: CreateTodoInput) => {
        await onAddTodo(values.text)
        form.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nueva Tarea</CardTitle>
                <CardDescription>
                    Escribe tu tarea o usa el botón de micrófono para grabarla
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Escribe tu tarea aquí..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                onClick={onStartRecording}
                                variant="outline"
                                size="icon"
                                disabled={!recognitionAvailable}
                                className={cn(
                                    !recognitionAvailable && "opacity-50 cursor-not-allowed"
                                )}
                                title="Grabar con voz"
                            >
                                <Mic className="h-4 w-4" />
                            </Button>
                            <Button type="submit">
                                Agregar
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
