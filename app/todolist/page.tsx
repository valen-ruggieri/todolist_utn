import { HeaderTodos } from "@/components/todolist/headerTodos"
import { TodoContainer } from "@/components/todolist/todoContainer"

export default function TodolistPage() {
    return (
        <div className="container mx-auto max-w-6xl p-6 space-y-6">
            <HeaderTodos />
            <TodoContainer />
        </div>
    )
}
