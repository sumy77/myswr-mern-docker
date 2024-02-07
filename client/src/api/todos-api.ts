import { Todo, NewTodo } from "../models/Todos";
import api from "./localInstance";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 1000))

export async function getTodos(): Promise<Todo[]> {
    await delay()
    const todos = await api.get<Todo[]>("/get-todos");
    return todos.data;
}

export async function getTodo(id: string) {
    const todo = await api.get<Todo>(`/todo/${id}`);
    return todo.data;
}

export async function addTodo<Todo>(newTodo: NewTodo) {
    await delay()
    if (Math.random() < 0.5) throw new Error("Failed to add new item!")
    const response = await api.post<Todo>('/create-todo', newTodo)
    return response.data
}

export async function updateTodo<Todo>(todo: NewTodo) {
    await delay()
    const response = await api.patch<Todo>(`/update-todo/${todo.id}`, todo)
    return response.data
}

export async function deleteTodo<Todo>(id: string) {
    await delay()
    const response = await api.delete<Todo>(`/delete-todo/${id}`)
    return response.data
}