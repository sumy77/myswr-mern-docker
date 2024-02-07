import React, { useContext, useState } from 'react';
import useSWR from "swr";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Todo } from '../../models/Todos';
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../../api/todos-api';
import { addTodoOptions, deleteTodoOptions, updateTodoOptions } from '../../api/todosSWROptions';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme/theme';

function TodosList() {
  console.log('in to do: ', useContext(ThemeContext))
  const {data: todos, error, isLoading, mutate} = useSWR<Todo[]>("get-todos", getTodos);
  const [newTodo, setNewTodo] = useState('')

  const addTodoMutation = async (newTodo: Todo): Promise<void> => {
    try{
      await mutate(
        addTodo(newTodo),
        addTodoOptions(newTodo)
      );
      toast.success('Success! Added new item.', {
        position: "top-right",
        autoClose: 1000,
        });
    }catch(e) {
      toast.error('Failed to add the new item.', {
        position: "top-right",
        autoClose: 1000,
        });
    }
  }

  const updateTodoMutation = async (updatedTodo: Todo) => {
    try{
      await mutate(updateTodo(updatedTodo), updateTodoOptions(updatedTodo));
      toast.success("Success! Updated item.", {
        autoClose: 1000,
      })
    } catch (err) {
        toast.error("Failed to update the item.", {
            autoClose: 1000,
        })
    }
  }

  const deleteTodoMutation = async (id: string) => {
    try{
      await mutate(deleteTodo(id), deleteTodoOptions(id));
      toast.success("Success! Deleted item.", {
        autoClose: 1000,
      })
    } catch (err) {
        toast.error("Failed to delete the item.", {
            autoClose: 1000,
        })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodoMutation({ title: newTodo, description: newTodo, id: "9999", completed: false, createdAt: "", updatedAt: "" })
    setNewTodo('')
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
            <input
                type="text"
                id="new-todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new todo"
            />
        </div>
        <button className="submit">
            <FontAwesomeIcon icon={faUpload} />
        </button>
    </form>
)

  let content;
  if(isLoading) {
    content = <p>Loading...</p>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = todos?.map((todo: Todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
              <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() =>
                      updateTodoMutation({ ...todo, completed: !todo.completed })
                  }
              />
              <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodoMutation(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
          </button>
      </article>
      )
    })
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        />
        {/* Same as */}
      <ToastContainer />
      <h1>Todos</h1>
      <Link to="/notes">Notes</Link>
      {newItemSection}
      {content}
    </div>
  )
}

export default TodosList