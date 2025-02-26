import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoList from "../src/components/TodoList";
import AddTodoForm from "../src/components/AddTodoForm";
import "./App.css";
import Confetti from "react-confetti";
// import { useRef } from "react";

// import todoListImage from "./assets/to-do-list.png"
import todoListImage1 from "./assets/todo-list1.png";

function App() {
  //Initializes the todoList state to an empty array
  const [todoList, setTodoList] = useState([]);
  // const [todoList, setTodoList] = useState(() => {
  //   const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList"));
  //   return savedTodoList || []; // Return saved todos or an empty array
  // });
  //state to track loading status
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });

  //function to sort todos by title
  const sortTodosByTitle = (todos) => {
    return todos.sort((objectA, objectB) => {
      if (objectA.title.toLowerCase() < objectB.title.toLowerCase()) {
        return -1;
      }
      if (objectA.title.toLowerCase() === objectB.title.toLowerCase()) {
        return 0;
      }

      return 1;
    });
  };

  //function to fetch data from backend
  const fetchData = async () => {
    //declaring options object with method and headers properties; Authorization header is set with the value of the Airtable API token; the options object is passed to the fetch function
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    // const url = `https://api.airtable.com/v0/${
    //   import.meta.env.VITE_AIRTABLE_BASE_ID
    // }/${import.meta.env.VITE_TABLE_NAME}`;

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

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

      //orders the todos array in ascending order by tittle a-z
      data.records.sort((objectA, objectB) => {
        if (objectA.fields.title < objectB.fields.title) {
          return -1;
        }
        if (objectA.fields.title === objectB.fields.title) {
          return 0;
        }
        if (objectA.fields.title > objectB.fields.title) {
          return 1;
        }
      });

      // reverses the order of the todos array from z-a
      // data.records.sort((objectA, objectB) => {
      //   if (objectA.fields.title < objectB.fields.title) {
      //     return 1;
      //   }
      //   if (objectA.fields.title === objectB.fields.title) {
      //     return 0;
      //   }
      //   if (objectA.fields.title > objectB.fields.title) {
      //     return -1;
      //   }
      // });

      //maps over the records array and extracts the id and title fields from each record; the extracted data is stored in the todos variable;
      const todos = sortTodosByTitle(
        data.records.map((todo) => ({
          id: todo.id,
          title: todo.fields.title,
        }))
      );

      // console.log(todos);
      //updates the todoList state with the fetched data; the todos array is passed to the setTodoList state setter to update the todoList state;
      setTodoList(todos);
      // setTodoList((prevList) => {
      //   const existingIds = new Set(prevList.map((todo) => todo.id));
      //   const newTodos = todos.filter((todo) => !existingIds.has(todo.id));
      //   return [...prevList, ...newTodos]; // Combine existing and new todos
      // });

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
    // setTodoList((prevList) => [...prevList, newTodo]);

    if (!newTodo.title) {
      alert("Please enter text.");
      console.error("New todo must have a title");
      return;
    }

    setTodoList((prevList) => {
      const updatedList = [...prevList, newTodo];
      return sortTodosByTitle(updatedList);
    });
  }

  // setTodoList((prevList) => {
  //   const updatedList = [...prevList, newTodo];

  //   updatedList.sort((objectA, objectB) => {
  //     if (objectA.title.toLowerCase() < objectB.title.toLowerCase()) {
  //       return -1;
  //     }
  //     if (objectA.title.toLowerCase() === objectB.title.toLowerCase()) {
  //       return 0;
  //     }

  //     return 1;
  //   });
  //   return updatedList;
  // });

  //new handler function to remove todos by id
  const removeTodo = (id, buttonRef) => {
    if (buttonRef && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setConfettiPosition({
        x: rect.x + rect.width / 2,
        y: rect.y - 60,
      });
      setShowConfetti(true);
    }

    //calls the setTodoList state setter and passes the new array
    setTodoList((previousTodoList) =>
      //creates a new array and removes the item with the given id from todoList
      previousTodoList.filter((todo) => todo.id !== id)
    );

    // Show confetti when a todo is deleted
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false); // Hide confetti after a short duration
    }, 3500); // Adjust duration
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
                {showConfetti && (
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    x={confettiPosition.x}
                    y={confettiPosition.y}
                    numberOfPieces={200} // Increase the number of pieces
                    gravity={0.2} // make confetti fall faster
                    // wind={0.1} // Add some horizontal movement
                    recycle={false}
                  />
                )}
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
        />
        {/*closing Route tag*/}
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
