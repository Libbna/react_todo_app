import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

const SingleTodo: React.FC<{
  index: number
  todo: Todo
  todos: Array<Todo>
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo,
      ),
    )
    setEdit(false)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    )
  }
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          action=""
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__singe_text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__singe_text">{todo.todo}</s>
          ) : (
            <span className="todos__singe_text">{todo.todo}</span>
          )}
          <div className="todo_icons">
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <IoCheckmarkDoneSharp />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
