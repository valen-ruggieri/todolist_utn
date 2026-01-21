"use client"

import * as React from "react"
import type { Todo } from "@/lib/schemas/todo.schema"
import { Check, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TodoItemProps {
    todo: Todo
    onToggle?: (id: string) => void
    onDelete?: (id: string) => void
    isLoading?: boolean
    isAnimated?: boolean
}

export function TodoItem({ todo, onToggle, onDelete, isLoading = false, isAnimated = false }: TodoItemProps) {
    return (
        <div
            className={cn(
                "group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200",
                "hover:shadow-md hover:border-primary/50",
                todo.done 
                    ? "bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800" 
                    : "bg-card border-border",
                isAnimated && "animate-in fade-in slide-in-from-right-4"
            )}
        >
          
            <button
                onClick={() => onToggle?.(todo._id)}
                disabled={isLoading}
                className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ",
                    "hover:scale-110 active:scale-95",
                    todo.done
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 dark:border-gray-600 hover:border-primary"
                )}
                aria-label={todo.done ? "Marcar como pendiente" : "Marcar como completada"}
            >
                {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                ) : todo.done ? (
                    <Check className="h-4 w-4" />
                ) : null}
            </button>

            {/* Texto */}
            <div className="flex-1 min-w-0">
                <p
                    className={cn(
                        "text-base font-medium transition-all",
                        todo.done 
                            ? "line-through text-muted-foreground" 
                            : "text-foreground"
                    )}
                >
                    {todo.text}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(todo.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            </div>


          


            <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete?.(todo._id)}
                disabled={isLoading}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer  "
                aria-label="Eliminar tarea"
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Trash2 className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}
