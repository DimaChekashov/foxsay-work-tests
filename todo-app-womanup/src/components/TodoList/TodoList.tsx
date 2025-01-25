import React from 'react';
import { Todo } from '../../types/types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.less';

interface Props {
    todos?: Todo[];
    setCurrentTodo(todo: Todo): void;
}

const TodoList: React.FC<Props> = ({todos, setCurrentTodo}) => {
    return (
        <div className="todo-list">
            {todos?.map((todo: Todo, index) => <TodoItem 
                key={index} 
                todo={todo} 
                onClick={() => setCurrentTodo(todo)}
            />)}
        </div>
    )
}

export default TodoList;