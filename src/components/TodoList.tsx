import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import SingleList from './SingleTodo'
import './styles.css'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleList
                index={index}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                key={todo.id}
              />
            ))}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleList
                index={index}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                key={todo.id}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList
