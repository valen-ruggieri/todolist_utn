import { getTodosResponseSchema, createTodoResponseSchema, createTodoSchema } from "@/lib/schemas/todo.schema"
import type { GetTodosResponse, CreateTodoResponse, CreateTodoInput } from "@/lib/schemas/todo.schema"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export async function getTodos(): Promise<GetTodosResponse> {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Error al obtener los todos")
    }

    const data = await response.json()
    return getTodosResponseSchema.parse(data)
  } catch (error) {
    console.error("Error en getTodos:", error)
    throw error
  }
}

export async function createTodo(todo: CreateTodoInput): Promise<CreateTodoResponse> {
  try {
    // Validar el input
    const validatedData = createTodoSchema.parse(todo)

    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      throw new Error("Error al crear el todo")
    }

    const data = await response.json()
    return createTodoResponseSchema.parse(data)
  } catch (error) {
    console.error("Error en createTodo:", error)
    throw error
  }
}
