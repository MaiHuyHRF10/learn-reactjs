import React, { useState } from 'react';
import TodoList from '../components/TodoList';



TodoFeature.propTypes = {

};

function TodoFeature(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'code',
            status: 'new'
        },
        {
            id: 2,
            title: 'eat',
            status: 'completed'
        },
        {
            id: 3,
            title: 'sleep',
            status: 'new'
        }
    ]

    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilterdStatus] = useState('all');

    const handleTodoClick = (todo, idx) => {
        const newTodoList = [...todoList];
        newTodoList[idx].status = newTodoList[idx].status === 'new' ? 'completed' : 'new';

        setTodoList(newTodoList);
    }

    const handleShowAll = () => {
        setFilterdStatus('all');
    }

    const handleShowNew = () => {
        setFilterdStatus('new');
    }

    const handleShowCompleted = () => {
        setFilterdStatus('completed');
    }

    const renderTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status)

    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />

            <div>
                <button onClick={handleShowAll}>Show All</button>
                <button onClick={handleShowNew}>Show New</button>
                <button onClick={handleShowCompleted}>Show Completed</button>
            </div>
        </div>
    );
}

export default TodoFeature;