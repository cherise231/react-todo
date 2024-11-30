import React, { useState } from "react";
// import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import './App.css'


// import todoListImage from "./assets/to-do-list.png"
import todoListImage1 from "./assets/todo-list1.png"



function App() {

  //creates a state var todoList to hold todo items and uses the function setTodoList to update todoList and sets todoList to an empty array
  const [todoList, setTodoList] = useState([]);

  //function to add a new todo
  function addTodo(newTodo) {
    //calls the setTodoList state setter
    setTodoList(prevList => [
      ...prevList,
      newTodo,
    ]);
  }

  return (
    <div>
   
       
        <img src={todoListImage1} className="todo-list-image1" alt="Todo List" />
      <h1>Todo List</h1> 
     
      {/*passes addTodo as a callback handler prop named onAddTodo. This allows AddTodoForm to call addTodo when a new todo is added*/}
      <AddTodoForm onAddTodo={addTodo} />


      {/*passes todoList state as a prop named todoList to the TodoList component */}
      <TodoList todoList={todoList} />

    </div>
  );
}

export default App;