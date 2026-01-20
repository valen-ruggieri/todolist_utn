"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTodoSchema } from "@/lib/schemas/todo.schema"
import { getTodos, createTodo } from "@/services/todos.services"
import type { Todo } from "@/lib/schemas/todo.schema"
import type { CreateTodoInput } from "@/lib/schemas/todo.schema"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mic, MicOff, Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TodolistPage() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isRecording, setIsRecording] = React.useState(false)
  const [transcript, setTranscript] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const recognitionRef = React.useRef<SpeechRecognition | null>(null)

  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      text: "",
    },
  })

  // Cargar todos al montar el componente
  React.useEffect(() => {
    loadTodos()
  }, [])

  // Configurar reconocimiento de voz
  React.useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "es-ES"

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " "
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Error en reconocimiento de voz:", event.error)
        if (event.error === "no-speech") {
          // Ignorar errores de no-speech
          return
        }
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

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

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setTranscript("")
      setIsRecording(true)
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const saveVoiceTodo = () => {
    if (!transcript.trim()) return

    // Crear el objeto completo de la tarea y guardarlo solo en el array local
    const newTodo: Todo = {
      _id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: transcript.trim(),
      userId: "", // Se llenará cuando se haga el POST
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Agregar al array local
    setTodos((prevTodos) => [newTodo, ...prevTodos])
    
    setTranscript("")
    setIsRecording(false)
  }

  const cancelRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
    }
    setTranscript("")
    setIsRecording(false)
  }

  const onSubmit = (values: CreateTodoInput) => {
    // Crear el objeto completo de la tarea y guardarlo solo en el array local
    const newTodo: Todo = {
      _id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: values.text,
      userId: "", // Se llenará cuando se haga el POST
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Agregar al array local
    setTodos((prevTodos) => [newTodo, ...prevTodos])
    
    form.reset()
  }


  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Mi Lista de Tareas</h1>
        <p className="text-muted-foreground">
          Agrega tareas escribiendo o usando reconocimiento de voz
        </p>
      </div>

      {/* Interfaz de grabación */}
      {isRecording ? (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              Grabando...
            </CardTitle>
            <CardDescription>
              Di tu tarea en voz alta. El texto aparecerá aquí mientras hablas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="min-h-[120px] p-6 bg-muted rounded-lg border-2 border-dashed border-primary/30">
              <p className="text-lg font-medium text-center">
                {transcript || (
                  <span className="text-muted-foreground">
                    Esperando tu voz...
                  </span>
                )}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={cancelRecording}
                disabled={isSubmitting}
                size="lg"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={stopRecording}
                disabled={isSubmitting}
                size="lg"
              >
                <MicOff className="h-4 w-4 mr-2" />
                Parar
              </Button>
              <Button
                onClick={saveVoiceTodo}
                disabled={isSubmitting || !transcript.trim()}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Guardar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Formulario de creación normal */
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
                    onClick={startRecording}
                    variant="outline"
                    size="icon"
                    disabled={!recognitionRef.current}
                    className={cn(
                      !recognitionRef.current && "opacity-50 cursor-not-allowed"
                    )}
                    title="Grabar con voz"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Guardando...
                      </>
                    ) : (
                      "Agregar"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Lista de todos */}
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

    </div>
  )
}

