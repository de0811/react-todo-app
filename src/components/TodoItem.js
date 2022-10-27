// Todo 리스트에 사용될 인자
const TodoItem = ({ todo, handleCompletedChange, handleDeleteClick }) => {
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (completed) => {
    console.log("뭐야 시벙");
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  return (
    <div style={getStyle(todo.completed)} key={todo.id}>
      <input
        // style={{
        //   textDecoration: todo.completed ? "line-through" : "none",
        // }}
        type="checkbox"
        defaultChecked={todo.completed}
        onChange={(event) => handleCompletedChange(event, todo.id)}
      />
      {todo.name}
      <button style={btnStyle} onClick={() => handleDeleteClick(todo.id)}>
        x
      </button>
    </div>
  );
};

export default TodoItem;
