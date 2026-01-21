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
import { TodoItem } from "../todoItem"

interface TodoListProps {
    todos: Todo[]
    loading: boolean
    onToggle?: (id: string) => void
    onDelete?: (id: string) => void
    actionLoadingIds?: string[]
    animatedIds?: string[]
}

export function TodoList({ todos, loading, onToggle, onDelete, actionLoadingIds = [], animatedIds = [] }: TodoListProps) {
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
                    <div className="space-y-3">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                                    <div className="w-6 h-6 rounded-md bg-muted" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-muted rounded w-3/4" />
                                        <div className="h-3 bg-muted rounded w-1/2" />
                                    </div>
                                    <div className="w-16 h-6 rounded-full bg-muted" />
                                    <div className="w-8 h-8 rounded-md bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : todos.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No hay tareas aún</p>
                        <p className="text-muted-foreground text-sm mt-2">¡Agrega una para comenzar!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                isLoading={actionLoadingIds.includes(todo._id)}
                                isAnimated={animatedIds.includes(todo._id)}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
