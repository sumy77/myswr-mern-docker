import { Todo, todoOptions } from "../models/Todos"

export const addTodoOptions = (newTodo: Todo) => {
    return {
        optimisticData: (todos: any) => {
            console.log('todos: ', todos)
            return [...todos, newTodo]
        },
        rollbackOnError: true,
        revalidate: false,
        populateCache: (added: Todo, todos: any) => [...todos, added],
    }
}

export const updateTodoOptions = (updatedTodo: Todo): any => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (todos: Todo[]) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updatedTodo];
        },
        rollbackOnError: true,
        revalidate: false,
        // response from API request is 1st param
        // previous data is 2nd param
        populateCache: (updated: Todo, todos: Todo[]) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updated];
        },
    }
}

export const deleteTodoOptions = (id: string): any => {
    return {
        optimisticData: (todos: Todo[]) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        rollbackOnError: true,
        revalidate: false,
        populateCache: (deletedTodo: Todo, todos: Todo[]) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
    }
}