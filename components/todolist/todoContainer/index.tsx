"use client"

import * as React from "react"
import { getTodos } from "@/services/todos.services"
import { createTodo } from "@/services/todos.services"
import type { Todo } from "@/lib/schemas/todo.schema"
import { TodoForm } from "../todoForm"
import { VoiceRecording } from "../voiceRecording"
import { TodoList } from "../todoList"
import { updateTodo, deleteTodo } from "@/services/todos.services"
import { useVoiceRecognition } from "../voiceRecognition"

export function TodoContainer() {
    const [todos, setTodos] = React.useState<Todo[]>([])
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const {
        isRecording,
        transcript,
        recognitionAvailable,
        startRecording,
        stopRecording,
        cancelRecording,
        clearTranscript,
    } = useVoiceRecognition()

    const loadTodos = async () => {
        try {
            setLoading(true)
            const response = await getTodos()
            setTodos(response.data)
        } catch (error) {
            console.error("Error al cargar todos:", error)
            setError("No se pudieron cargar las tareas.")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadTodos()
    }, [])

    const addTodo = async (text: string) => {
        try {
            setSaving(true)
            setError(null)
            const response = await createTodo({ text })
            setTodos((prevTodos) => [response.data, ...prevTodos])
        } catch (error) {
            console.error("Error al crear todo:", error)
            setError("No se pudo crear la tarea.")
        } finally {
            setSaving(false)
        }
    }

    const saveVoiceTodo = () => {
        if (!transcript.trim()) return

        addTodo(transcript.trim())
        clearTranscript()
    }

    const toggleTodo = async (id: string) => {
        const prev = todos
        const idx = todos.findIndex((t) => t._id === id)
        if (idx === -1) return
        const todo = todos[idx]
        // optimistic update
        const updated = { ...todo, done: !todo.done }
        setTodos((s) => s.map((t) => (t._id === id ? updated : t)))
        try {
            await updateTodo(id, { completed: updated.done })
        } catch (err) {
            console.error("Error al actualizar tarea:", err)
            setTodos(prev)
            setError("No se pudo actualizar la tarea.")
        }
    }

    const removeTodo = async (id: string) => {
        const prev = todos
        setTodos((s) => s.filter((t) => t._id !== id))
        try {
            await deleteTodo(id)
        } catch (err) {
            console.error("Error al eliminar tarea:", err)
            setTodos(prev)
            setError("No se pudo eliminar la tarea.")
        }
    }

    return (
        <>
            {isRecording ? (
                <VoiceRecording
                    isRecording={isRecording}
                    transcript={transcript}
                    onCancel={cancelRecording}
                    onStop={stopRecording}
                    onSave={saveVoiceTodo}
                    canSave={!!transcript.trim()}
                />
            ) : (
                <TodoForm
                    onAddTodo={addTodo}
                    onStartRecording={startRecording}
                    recognitionAvailable={recognitionAvailable}
                />
            )}
            {saving && <p className="text-sm text-muted-foreground mt-2">Guardando tarea...</p>}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            <TodoList todos={todos} loading={loading} onToggle={toggleTodo} onDelete={removeTodo} />
        </>
    )
}
