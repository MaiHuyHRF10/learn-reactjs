import React, { useState } from "react";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

function ListPage() {
  const initTodoList = [
    {
      id: 1,
      title: "eat",
    },
    {
      id: 2,
      title: "sleep",
    },
    {
      id: 3,
      title: "code",
    },
  ];

  const [todoList, setTodoList] = useState(initTodoList);
  const handleOnClick = (index) => {
    const newTodolist = [...todoList];
    newTodolist.splice(index, 1);

    setTodoList(newTodolist);
  };

  const handleTodoFormSubmit = (formValue) => {
    console.log(formValue);
    const newTodo = {
      ...formValue,
      id: todoList.length + 1,
    };
    const newTodoList = [...todoList];

    newTodoList.push(newTodo);

    setTodoList(newTodoList);
  };
  return (
    <div>
      <h3>My TodoList</h3>

      <TodoList todoList={todoList} onTodoClick={handleOnClick} />

      <TodoForm onSubmit={handleTodoFormSubmit} />
    </div>
  );
}

export default ListPage;
