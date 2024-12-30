import React, { useEffect, useState } from "react";
// import React from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

// import todoListImage from "./assets/to-do-list.png"
import todoListImage1 from "./assets/todo-list1.png";

// creates custom hook to manage the state of the todo list, and retrieving todo list from local storage and for reusability
const useSemiPersistentState = () => {
  //creates a state var todoList to hold todo items and uses the function setTodoList to update todoList
  //updates the default state to parse the value of the "savedTodoList" item
  const [todoList, setTodoList] = useState(() => {
    //this retrieves the value of "savedTodoList" from storage. JSON.parse takes the string and converts it to a javaScript obj or arr.
    const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList"));
    //returns an empty array if savedTodoList is null
    return savedTodoList || [];
  });

  // Defines a useEffect React hook with todoList as a dependency. The useEffect hook performs side effects in function components. It is being used to synchronize the "todoList" state with "localStorage".
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  //returns the state var "todoList" and setter function "setTodoList" as an array
  return [todoList, setTodoList];
};

function App() {
  //Updates App function to use the useSemiPersistentState hook
  const [todoList, setTodoList] = useSemiPersistentState();

  //function to add a new todo
  function addTodo(newTodo) {
    //calls the setTodoList state setter
    setTodoList((prevList) => [...prevList, newTodo]);
  }

  //new handler function to remove todos by id
  const removeTodo = (id) => {
    //calls the setTodoList state setter and passes the new array
    setTodoList((previousTodoList) =>
      //creates a new array and removes the item with the given id from todoList
      previousTodoList.filter((todo) => todo.id !== id)
    );
  };

  return (
    <>
      <img src={todoListImage1} className="todo-list-image1" alt="Todo List" />
      <h1>Todo List</h1>

      {/*passes addTodo as a callback handler prop named onAddTodo. This allows AddTodoForm to call addTodo when a new todo is added*/}
      <AddTodoForm onAddTodo={addTodo} />

      {/*passes todoList state as a prop named todoList to the TodoList component */}
      {/* passes removeTodo prop as a callback handler prop called onRemoveTodo to the TodoList component */}
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
