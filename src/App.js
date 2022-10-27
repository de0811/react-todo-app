import React from "react";
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
    console.log(todos);
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
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
        <div className="todoInput">
          <TodoInject handleInjectTodoTxtClick={handleInjectTodoTxtClick} />
        </div>

        <div className="todos">
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleCompletedChange={handleCompletedChange}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
