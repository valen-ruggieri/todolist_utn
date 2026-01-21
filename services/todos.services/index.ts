import { createTodoSchema } from "@/lib/schemas/todo.schema"
import type { Todo, CreateTodoInput } from "@/lib/schemas/todo.schema"
import { api } from "@/lib/api.client"

const API_PATH = "/todos"

type ApiTodo = {
  _id?: string
  id?: string
  title?: string
  completed?: boolean
  done?: boolean
  text?: string
  createdAt?: string
  updatedAt?: string
}

function mapApiTodo(apiTodo: ApiTodo): Todo {
  const baseDate = apiTodo.createdAt || new Date().toISOString()
  return {
    _id: apiTodo._id || apiTodo.id || crypto.randomUUID(),
    text: apiTodo.text || apiTodo.title || "",
    userId: "",
    done: apiTodo.done ?? apiTodo.completed ?? false,
    createdAt: apiTodo.createdAt || baseDate,
    updatedAt: apiTodo.updatedAt || baseDate,
  }
}

export async function getTodos(): Promise<{ success: boolean; data: Todo[] }> {
  const data = await api.get<ApiTodo[]>(API_PATH, { requireAuth: true, retries: 1 })
  const mapped = Array.isArray(data) ? data.map(mapApiTodo) : []
  return { success: true, data: mapped }
}

export async function createTodo(todo: CreateTodoInput): Promise<{ success: boolean; data: Todo }> {
  const validatedData = createTodoSchema.parse(todo)

  const payload = {
    title: validatedData.text,
    completed: false,
  }

  const data = await api.post<ApiTodo>(API_PATH, payload, { requireAuth: true })
  return { success: true, data: mapApiTodo(data) }
}

export async function updateTodo(id: string, patch: Partial<{ title: string; completed: boolean }>): Promise<{ success: boolean; data: Todo }> {
  const payload: Record<string, unknown> = {}
  if (typeof patch.title === "string") payload.title = patch.title
  if (typeof patch.completed === "boolean") payload.completed = patch.completed

  const data = await api.put<ApiTodo>(`${API_PATH}/${id}`, payload, { requireAuth: true })
  return { success: true, data: mapApiTodo(data) }
}

export async function deleteTodo(id: string): Promise<{ success: boolean; data: Todo }> {
  const data = await api.del<ApiTodo>(`${API_PATH}/${id}`, { requireAuth: true })
  return { success: true, data: mapApiTodo(data) }
}
