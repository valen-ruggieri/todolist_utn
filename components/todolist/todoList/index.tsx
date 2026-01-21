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
import { Loader2, Check, Trash2, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

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
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="border-l-4 border-l-primary rounded-lg bg-transparent p-4 shadow-sm">
                                <div className="animate-pulse flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mt-2" />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="h-8 w-8 rounded bg-slate-200 dark:bg-slate-700" />
                                        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : todos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No hay tareas. ¡Agrega una para comenzar!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todos.map((todo) => (
                            <Card
                                key={todo._id}
                                className={cn(
                                    "border-l-4 rounded-lg transition-shadow transform hover:scale-[1.01] hover:shadow-lg animate-slide-in",
                                    todo.done ? "border-l-green-500" : "border-l-primary"
                                )}
                            >
                                <CardContent className="pt-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div
                                                className={cn(
                                                    "flex items-center justify-center h-10 w-10 rounded-lg shrink-0",
                                                    todo.done
                                                        ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md"
                                                        : "bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow"
                                                )}
                                            >
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div className={cn("min-w-0", animatedIds.includes(todo._id ?? "") && "animate-pop")}>
                                                <p
                                                    className={cn(
                                                        "text-base font-medium leading-tight",
                                                        todo.done && "line-through text-muted-foreground opacity-80"
                                                    )}
                                                >
                                                    {todo.text}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {new Date(todo.createdAt).toLocaleDateString("es-ES", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}{" "}
                                                    <span className="text-muted-foreground">·</span>{" "}
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(todo.createdAt).toLocaleTimeString("es-ES", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                aria-label={todo.done ? "Marcar como pendiente" : "Marcar como completada"}
                                                title={todo.done ? "Marcar como pendiente" : "Marcar como completada"}
                                                className={cn(
                                                    "p-2 rounded-lg flex items-center justify-center border shadow-sm cursor-pointer transition-transform",
                                                    todo.done
                                                        ? "bg-white/10 border-green-200 hover:bg-green-50 dark:border-green-700 hover:scale-105"
                                                        : "bg-white/10 border-slate-200 hover:bg-slate-50 dark:border-slate-800 hover:scale-105"
                                                )}
                                                onClick={() => onToggle?.(todo._id)}
                                                disabled={actionLoadingIds.includes(todo._id)}
                                            >
                                                {actionLoadingIds.includes(todo._id) ? (
                                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                ) : (
                                                    <Check className={cn("h-4 w-4", todo.done ? "text-green-600" : "text-muted-foreground")} />
                                                )}
                                            </button>
                                            <button
                                                aria-label="Eliminar tarea"
                                                title="Eliminar tarea"
                                                className={cn(
                                                    "p-2 rounded-lg flex items-center justify-center border text-red-600 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer transition-transform",
                                                    "focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700"
                                                )}
                                                onClick={() => onDelete?.(todo._id)}
                                                disabled={actionLoadingIds.includes(todo._id)}
                                            >
                                                {actionLoadingIds.includes(todo._id) ? (
                                                    <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </button>
                                            <span className={cn("text-xs px-2 py-1 rounded-full text-center ml-2", todo.done ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200")}>
                                                {todo.done ? "Completada" : "Pendiente"}
                                            </span>
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
