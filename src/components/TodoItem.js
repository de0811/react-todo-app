import React, { useState } from "react";

// Todo 리스트에 사용될 인자
const TodoItem = ({
  todo,
  className,
  handleModifyClick,
  handleCompletedChange,
  handleDeleteClick,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.name);
  console.log("TodoItem Run");

  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleOkClick = () => {
    todo.name = title;
    handleModifyClick(todo);
    setIsEdit(false);
  };
  const handleEditCloseClick = () => {
    setTitle(todo.name);
    setIsEdit(false);
  };

  return (
    <div
      className={`${className} flex items-center p-2 justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
    >
      {!isEdit ? (
        <>
          <div>
            <input
              className="mx-2 "
              type="checkbox"
              defaultChecked={todo.completed}
              onChange={(event) => handleCompletedChange(event, todo.id)}
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.name}
            </span>
          </div>
          <div className="items-center">
            <button className="px-4 py-2" onClick={handleEditClick}>
              Edit
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleDeleteClick(todo.id)}
            >
              x
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            className="w-full px-3 py-2 mr-4 rounded"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <div>
            <button onClick={handleOkClick}>ok</button>
            <button onClick={handleEditCloseClick}>X</button>
          </div>
        </>
      )}
    </div>
  );
};

// export default TodoItem;
export default React.memo(TodoItem);
