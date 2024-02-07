export type Todo = {
    title: string,
    description: string,
    id: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string | null
}

export type NewTodo = {
    title: string,
    description: string,
    id: string,
}

export type todoOptions = {
    optimisticData: (todos: Todo[]) => Todo[],
    rollbackOnError: boolean,
    revalidate: boolean,
    // populateCache: (added: Todo, todos: Todo[]) => Todo[],
}