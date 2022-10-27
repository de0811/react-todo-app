import React from "react";

const TodoInject = ({ handleInjectTodoTxtClick }) => {
  const [injectTodoTxt, setInjectTodoTxt] = React.useState("");

  const handleInjectTodoTxtChange = (event) => {
    setInjectTodoTxt(event.target.value);
  };

  return (
    <form className="flex pt-2">
      <input
        type="text"
        name="value"
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        style={{ flex: "10", padding: "5px" }}
        placeholder="해야 할 일을 입력하세요."
        value={injectTodoTxt}
        onChange={handleInjectTodoTxtChange}
      />
      <input
        type="submit"
        value="입력"
        className="text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
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
