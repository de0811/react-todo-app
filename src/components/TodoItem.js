// Todo 리스트에 사용될 인자
const TodoItem = ({ todo, handleCompletedChange, handleDeleteClick }) => {
  //   const btnStyle = {
  //     color: "#fff",
  //     border: "none",
  //     padding: "5px 9px",
  //     borderRadius: "50%",
  //     cursor: "pointer",
  //     float: "right",
  //   };

  //   const getStyle = (completed) => {
  //     console.log("뭐야 시벙");
  //     return {
  //       padding: "10px",
  //       borderBottom: "1px #ccc dotted",
  //       textDecoration: completed ? "line-through" : "none",
  //     };
  //   };

  return (
    <div
      className="flex items-center p-2 justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"
      key={todo.id}
    >
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
      <div className="items-end">
        <button
          className="px-4 py-2 float-right"
          onClick={() => handleDeleteClick(todo.id)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
