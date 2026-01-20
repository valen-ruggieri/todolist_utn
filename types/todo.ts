export interface Todo {
  _id: string
  text: string
  userId: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateTodoRequest {
  text: string
}

export interface CreateTodoResponse {
  success: boolean
  data: Todo
}

export interface GetTodosResponse {
  success: boolean
  data: Todo[]
}
