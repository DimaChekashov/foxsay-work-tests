import dayjs from 'dayjs';
import React from 'react';
import { Todo } from '../../types/types';
import './TodoItem.less';

interface Props {
    todo: Todo;
    onClick(): void;
}

const TodoItem: React.FC<Props> = ({todo, onClick}) => {
    const isFailed: boolean = dayjs(todo.endDate).format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD');

    /** @returns {string} classes of todo-item */
    const getTodoItemClasses = (): string => {
        return [
            "todo-item",
            !isFailed ? " failed" : "",
            todo.success ? " success" : ""
        ].join(" ")
    }

    return (
        <div className={getTodoItemClasses()} onClick={onClick}>
            <div className="todo-item__name">
                {todo.title}
            </div>
            <div className="todo-item__date">
                {dayjs(todo.endDate).format('YYYY-MM-DD')}
            </div>
        </div>
    )
}

export default TodoItem;