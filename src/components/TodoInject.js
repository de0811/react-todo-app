import React from "react";

const TodoInject = ({ handleInjectTodoTxtClick }) => {
  const [injectTodoTxt, setInjectTodoTxt] = React.useState("");

  const handleInjectTodoTxtChange = (event) => {
    setInjectTodoTxt(event.target.value);
  };

  return (
    <form style={{ display: "flex" }}>
      <input
        type="text"
        name="value"
        style={{ flex: "10", padding: "5px" }}
        placeholder="해야 할 일을 입력하세요."
        value={injectTodoTxt}
        onChange={handleInjectTodoTxtChange}
      />
      <input
        type="submit"
        value="입력"
        className="btn"
        style={{ flex: "1" }}
        onClick={(event) => {
          handleInjectTodoTxtClick(event, injectTodoTxt);
          setInjectTodoTxt("");
        }}
      />
    </form>
  );
};

export default TodoInject;
