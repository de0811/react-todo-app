import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import "./App.css";
import TodoInject from "./components/TodoInject";
import TodoItem from "./components/TodoItem";

// Todo main model
class Todo {
  id = 0;
  completed = false;
  name = "";
  constructor(id, completed, name) {
    this.id = id;
    this.completed = completed;
    this.name = name;
  }
}

// Todo 전체 화면
const App = () => {
  const [todos, setTodos] = React.useState([]);

  const handleInjectTodoTxtClick = (event, txt) => {
    event.preventDefault();
    // todos.push(new Todo(Date.now(), false, injectTodo));
    setTodos((prev) => {
      return [...prev, new Todo(Date.now(), false, txt)];
    });
  };

  const handleDeleteClick = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const handleCompletedChange = (event, id) => {
    // setTodos 를 하지 않으면 re-rendering이 되지 않는걸 확인
    // 즉 list 인스턴스들을 수정을 하고 set을 해줘야만 re-rendering이 되는 것
    setTodos((prev) => {
      prev.map((todo) => {
        if (todo.id === id) todo.completed = event.target.checked;
        return todo;
      });
      return [...prev];
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-5 m-4 bg-white rounded shadow lg:w-3/4">
        <div className="flex justify-between mb-1">
          <h1>할 일 목록</h1>
        </div>
        <div className="todoInput">
          <TodoInject handleInjectTodoTxtClick={handleInjectTodoTxtClick} />
        </div>

        <div className="todos">
          <DragDropContext>
            {todos.map((todo, index) => {
              return (
                <Draggable>
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleCompletedChange={handleCompletedChange}
                    handleDeleteClick={handleDeleteClick}
                  />
                </Draggable>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default App;
