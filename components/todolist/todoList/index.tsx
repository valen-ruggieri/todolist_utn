"use client"

import * as React from "react"
import type { Todo } from "@/lib/schemas/todo.schema"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoListProps {
    todos: Todo[]
    loading: boolean
}

export function TodoList({ todos, loading }: TodoListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tareas</CardTitle>
                <CardDescription>
                    {todos.length === 0
                        ? "No hay tareas aún"
                        : `${todos.length} tarea${todos.length !== 1 ? "s" : ""}`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : todos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No hay tareas. ¡Agrega una para comenzar!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todos.map((todo) => (
                            <Card key={todo._id} className="border-l-4 border-l-primary">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p
                                                className={cn(
                                                    "text-base",
                                                    todo.done && "line-through text-muted-foreground"
                                                )}
                                            >
                                                {todo.text}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {new Date(todo.createdAt).toLocaleDateString("es-ES", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {todo.done ? (
                                                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                                    Completada
                                                </span>
                                            ) : (
                                                <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                                                    Pendiente
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
