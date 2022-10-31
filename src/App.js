import React, { useCallback, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";
import TodoInject from "./components/TodoInject";
import TodoItem from "./components/TodoItem";
import { jsonLocalStorage } from "./util";

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
  console.log("App Run");
  const [todos, setTodos] = React.useState(
    jsonLocalStorage.getItem("todos", [])
  );

  useEffect(() => {
    jsonLocalStorage.setItem("todos", todos);
  }, [todos]);

  const handleInjectTodoTxtClick = useCallback((event, txt) => {
    event.preventDefault();
    // todos.push(new Todo(Date.now(), false, injectTodo));
    setTodos((prev) => {
      return [...prev, new Todo(Date.now(), false, txt)];
    });
  }, []);

  const handleDeleteClick = useCallback((id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  }, []);

  const handleCompletedChange = (event, id) => {
    // setTodos 를 하지 않으면 re-rendering이 되지 않는걸 확인
    // 즉 list 인스턴스들을 수정을 하고 set을 해줘야만 re-rendering이 되는 것
    setTodos((prev) => {
      const newDatas = [...prev];
      newDatas.map((todo) => {
        if (todo.id === id) todo.completed = event.target.checked;
        return todo;
      });
      return newDatas;
    });
  };

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    setTodos((prev) => {
      const newList = [...prev];
      const [dragItem] = newList.splice(result.source.index, 1);
      newList.splice(result.destination.index, 0, dragItem);

      return newList;
    });
  };

  const modifyTodo = (todo) => {
    setTodos((prev) => {
      const newDatas = [...prev];
      newDatas.map((otodo) => {
        if (otodo.id === todo.id) {
          otodo.completed = todo.completed;
          otodo.name = todo.name;
        }
        return otodo;
      });
      return newDatas;
    });
  };

  const handleDeleteAllClick = () => {
    setTodos([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-5 m-4 bg-white rounded shadow lg:w-3/4">
        <div className="flex justify-between mb-1">
          <h1>할 일 목록</h1>
          <button onClick={handleDeleteAllClick}>del all</button>
        </div>
        <div className="todoInput">
          <TodoInject handleInjectTodoTxtClick={handleInjectTodoTxtClick} />
        </div>

        {/* onDragEnd 함수에서 Drag가 끝났을때 행동을 정의  */}
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* drop 할 공간의 id를 입력 */}
          <Droppable droppableId="todos">
            {/* provided 에는 스타일 지정 및 조회를 위한 속성이 포함 */}
            {(provided) => (
              <div
                className="todos"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos.map((todo, index) => {
                  return (
                    // DraggableId 와 아이템의 key는 같아야한다
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          key={todo.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            snapshot.isDragging ? "selected" : "not-selected"
                            // snapshot.isDragging ? "bg-gray-100" : "bg-gray-400"
                          }
                        >
                          <TodoItem
                            key={todo.id}
                            todo={todo}
                            className={
                              snapshot.isDragging
                                ? "bg-gray-200"
                                : "bg-gray-100"
                            }
                            handleModifyClick={modifyTodo}
                            handleCompletedChange={handleCompletedChange}
                            handleDeleteClick={handleDeleteClick}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {/* 원하는 자리에 올바르게 위치하게 만들기 위해서 사용(drag 하는 위치에 빈 공간을 만듬) */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
