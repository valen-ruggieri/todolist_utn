"use client"

import * as React from "react"
import { getTodos } from "@/services/todos.services"
import type { Todo } from "@/lib/schemas/todo.schema"
import { TodoForm } from "../todoForm"
import { VoiceRecording } from "../voiceRecording"
import { TodoList } from "../todoList"
import { useVoiceRecognition } from "../voiceRecognition"

export function TodoContainer() {
    const [todos, setTodos] = React.useState<Todo[]>([])
    const [loading, setLoading] = React.useState(true)

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
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadTodos()
    }, [])

    const addTodo = (newTodo: Todo) => {
        setTodos((prevTodos) => [newTodo, ...prevTodos])
    }

    const saveVoiceTodo = () => {
        if (!transcript.trim()) return

        // Crear el objeto completo de la tarea y guardarlo solo en el array local
        const newTodo: Todo = {
            _id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
            text: transcript.trim(),
            userId: "", // Se llenará cuando se haga el POST
            done: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        // Agregar al array local
        addTodo(newTodo)
        clearTranscript()
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
            <TodoList todos={todos} loading={loading} />
        </>
    )
}
