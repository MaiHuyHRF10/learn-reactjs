import React, { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import queryString from "query-string";
import { useEffect } from "react";
import { useMemo } from "react";

function ListPage() {
  const initTodoList = [
    {
      id: 1,
      title: "eat",
      status: "new",
    },
    {
      id: 2,
      title: "sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "code",
      status: "new",
    },
  ];

  const [todoList, setTodoList] = useState(initTodoList);

  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status;
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || "all");
  }, [location.search]);

  // const handleOnClickToDelete = (index) => {
  //   const newTodolist = [...todoList];
  //   newTodolist.splice(index, 1);

  //   setTodoList(newTodolist);
  // };

  const handleTodoClickToChangeStatus = (index) => {
    const newTodoList = [...todoList];

    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === "new" ? "completed" : "new",
    };

    setTodoList(newTodoList);
  };

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: "new",
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    const queryParams = {
      status: "all",
    };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompletedClick = () => {
    const queryParams = {
      status: "completed",
    };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNewClick = () => {
    const queryParams = {
      status: "new",
    };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredStatus === "all" || filteredStatus === todo.status);
  }, [todoList, filteredStatus]);

  return (
    <div>
      <h3>My TodoList</h3>

      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClickToChangeStatus} />

      <div>
        <button onClick={handleShowAllClick}>Show all</button>
        <button onClick={handleShowCompletedClick}>Show completed</button>
        <button onClick={handleShowNewClick}>Show new</button>
      </div>

      <h3>What to do ???</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
    </div>
  );
}

export default ListPage;
