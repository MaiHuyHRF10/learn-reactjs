import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null
};

function TodoList(props) {
    const { todoList, onTodoClick } = props;

    const handleOnClick = (index) => {
        if (!onTodoClick) return;
        onTodoClick(index);
    }

    return (
        <ul className="todo-list">
            {todoList.map((todo, index) =>
                <li key={todo.id} onClick={() => handleOnClick(index)}> {todo.title} </li>
            )}
        </ul>
    );
}

export default TodoList;