import { z } from "zod"

// Schema para crear un todo
export const createTodoSchema = z.object({
  text: z.string().min(1, "El texto no puede estar vacío"),
})

// Schema para un todo individual
export const todoSchema = z.object({
  _id: z.string(),
  text: z.string(),
  userId: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Schema para la respuesta de crear un todo
export const createTodoResponseSchema = z.object({
  success: z.boolean(),
  data: todoSchema,
})

// Schema para la respuesta de obtener todos
export const getTodosResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(todoSchema),
})

// Types inferidos de los schemas
export type CreateTodoInput = z.infer<typeof createTodoSchema>
export type Todo = z.infer<typeof todoSchema>
export type CreateTodoResponse = z.infer<typeof createTodoResponseSchema>
export type GetTodosResponse = z.infer<typeof getTodosResponseSchema>
