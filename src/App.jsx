import React, { useState } from "react";
// import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import './App.css'

// import reactLogo from './assets/react.svg'
// import todoListImage from "./assets/to-do-list.png"
import todoListImage1 from "./assets/todo-list1.png"


function App() {

//creates a new state variable newTodo, set as an empty string and w/ update to function setNewTodo that will update newTodo
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
       
        <img src={todoListImage1} className="todo-list-image1" alt="Todo List" />
      <h1>Todo List</h1> 
      <TodoList />

     { /*passes setNewTodo as a callback handler prop named onAddTodo. This allows AddTodoForm to call setNewTodo when a new todo is added*/}
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p> {/*adds p element to display newTodo var */}
    </div>
  );
}

export default App;