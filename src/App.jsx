import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

// import todoListImage from "./assets/to-do-list.png"
import todoListImage1 from "./assets/todo-list1.png";

function App() {
  //Initializes the todoList state to an empty array
  const [todoList, setTodoList] = useState([]);

  //state to track loading status
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    //declaring options object with method and headers properties; Authorization header is set with the value of the Airtable API token; the options object is passed to the fetch function
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        //throws an error with the message if the response is not ok; the error is caught in the catch block; the error message is logged to the console;
        throw new Error(message);
      }

      //waits for the response to be converted to JSON format; the parsed JSON data is stored in the data variable;
      const data = await response.json();
      // console.log(data);

      //maps over the records array and extracts the id and title fields from each record; the extracted data is stored in the todos variable;
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));

      // const todos = data.records.map((todo) => {
      //   const newTodo = {
      //     id: todo.id,
      //     title: todo.fields.title,
      //   };
      //   return newTodo;
      // })

      // console.log(todos);
      //updates the todoList state with the fetched data; the todos array is passed to the setTodoList state setter to update the todoList state;
      setTodoList(todos);
      //Sets the loading status to false after the data is fetched;
      setIsLoading(false);

      //the catch block logs the error message to the console if an error occurs during the fetch request;
    } catch (error) {
      //logs the error message to the console;
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData(); //Calls the fetchData function
  }, []); //Empty dependency array to run only once on mount

  // useEffect(() => {
  //   //new Promise to simulate fetching data from an API
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const savedTodoList =
  //         JSON.parse(localStorage.getItem("savedTodoList")) || [];
  //       //calls resolve with an object containing the savedTodoList as the value for the todoList property
  //       resolve({ data: { todoList: savedTodoList } });
  //     }, 2000); //Delay 2 seconds
  //   }).then((result) => {
  //     //Updates the todoList state with the fetched data
  //     setTodoList(result.data.todoList);
  //     //Sets the loading status to false after the data is fetched
  //     setIsLoading(false);
  //   });
  // }, []); //Empty dependency array to run only once on mount

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
    // wrapping jsx with BrowserRouter component
    <BrowserRouter>
      {/* Adding a ternary operator to render loading message only if isLoading is true, otherwise it renders the TodoList component */}
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/new" className="nav-link">
          New
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
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
            )
          }
        />{" "}
        {/*closing Route tag*/}
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
