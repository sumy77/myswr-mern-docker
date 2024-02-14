import { Todo, todoOptions } from "../models/Todos"

export const addTodoOptions = (newTodo: Todo) => {
    return {
        optimisticData: (todos: Todo[] | undefined): Todo[] => {
            if(todos?.length) {
                return [...todos, newTodo]
            }else{
                return [];
            }
        },
        rollbackOnError: true,
        revalidate: false,
        populateCache: (added: Todo, todos: Todo[] | undefined): Todo[] => {
            if(todos?.length) {
                return [...todos, added]
            }else{
                return []
            }
        },
    }
}

export const updateTodoOptions = (updatedTodo: Todo) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (todos: Todo[] | undefined) => {
            if(todos?.length) {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updatedTodo];
            }else{
                return [];
            }
        },
        rollbackOnError: true,
        revalidate: false,
        // response from API request is 1st param
        // previous data is 2nd param
        populateCache: (updated: Todo, todos: Todo[] | undefined) => {
            if(todos?.length) {
                const prevTodos = todos.filter(todo => {
                    return todo.id !== updatedTodo.id
                })
                return [...prevTodos, updated];
            }else{
                return [];
            }
        },
    }
}

export const deleteTodoOptions = (id: string) => {
    return {
        optimisticData: (todos: Todo[] | undefined) => {
            if(todos?.length) {
                return todos.filter(todo => {
                    return todo.id !== id
                })
            }else{
                return [];
            }
        },
        rollbackOnError: true,
        revalidate: false,
        populateCache: (deletedTodo: Todo, todos: Todo[] | undefined) => {
            if(todos?.length) {
                return todos.filter(todo => {
                    return todo.id !== id
                })
            }else{
                return [];
            }
        },
    }
}