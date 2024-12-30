import React, { useEffect, useState } from "react";
// import React from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

// import todoListImage from "./assets/to-do-list.png"
import todoListImage1 from "./assets/todo-list1.png";

function App() {
  //Initializes the todoList state to an empty array
  const [todoList, setTodoList] = useState([]);

  // const [todoList, setTodoList] = useState(()=> {
  //   const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList"));
  //   return savedTodoList || [];
  // });

  //state to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //new Promise to simulate fetching data from an API
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedTodoList =
          JSON.parse(localStorage.getItem("savedTodoList")) || [];
        resolve({ data: { todoList: savedTodoList } });
      }, 2000); //Delay 2 seconds
    }).then((result) => {
      //Updates the todoList state with the fetched data
      setTodoList(result.data.todoList);
      //Sets the loading status to false after the data is fetched
      setIsLoading(false);
    });
  }, []); //Empty dependency array to run only once on mount

  // Defines a useEffect React hook with todoList as a dependency. The useEffect hook performs side effects in function components. It is being used to synchronize the "todoList" state with "localStorage".
  useEffect(() => {
    //checks if the data is not loading
    if (isLoading === false) {
      //will only update localStorage if the data is not loading
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

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
      {/* Adding a ternary operator to render loading message only if isLoading is true, otherwise it renders the TodoList component */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img
            src={todoListImage1}
            className="todo-list-image1"
            alt="Todo List"
          />
          <h1>Todo List</h1>

          {/*passes addTodo as a callback handler prop named onAddTodo. This allows AddTodoForm to call addTodo when a new todo is added*/}
          <AddTodoForm onAddTodo={addTodo} />

          {/*passes todoList state as a prop named todoList to the TodoList component */}
          {/* passes removeTodo prop as a callback handler prop called onRemoveTodo to the TodoList component */}
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
