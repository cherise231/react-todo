import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import './App.css'

import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


function App() {
  return (
    <div>
      <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      <h1>Todo List</h1> 
      <TodoList />
      <AddTodoForm />
    </div>
  );
}

export default App;