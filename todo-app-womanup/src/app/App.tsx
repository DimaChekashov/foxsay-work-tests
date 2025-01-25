import React, { useContext, useState } from 'react';
import { Context } from '..';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AddTodo from '../components/AddTodo/AddTodo';
import TodoList from '../components/TodoList/TodoList';
import TodoPage from '../components/TodoPage/TodoPage';
import { Todo } from '../types/types';
import './App.less';

const App: React.FC = () => {
  const { firestore } = useContext(Context);
  const [todos] = useCollectionData(
    firestore.collection('todos').orderBy('createdAt')
  );
  const [currentTodo, setCurrentTodo] = useState<Todo>();
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div className="app">
      <div className="app__header">
        <button 
          type="button" 
          className="app__header-back"
          onClick={() => {
            setEditMode(false);
            setCurrentTodo(undefined);
          }}
        >
          &#8680;
        </button>
      </div>
      <div className="app__sidebar">
        <AddTodo />
        <TodoList todos={todos as Todo[]} setCurrentTodo={setCurrentTodo} />
      </div>
      <div className={`app__content${currentTodo ? " active" : ""}`}>
        <TodoPage 
          todo={currentTodo} 
          editMode={editMode}
          setEditMode={setEditMode} 
          setCurrentTodo={setCurrentTodo}
        />
      </div>
    </div>
  );
}

export default App;
