import React from "react";
import { useState } from "react";
// Import InputWithLabel component
import InputWithLabel from "./InputWithLabel";

//added props as a parameter in the AddTodoForm function
//took out prop and added onAddTodo as a destructured parameter in the AddTodoForm function
const AddTodoForm = ({ onAddTodo }) => {
  //Create new state variable named todoTitle with setter setTodoTitle and sets todoTitle to an empty string
  const [todoTitle, setTodoTitle] = useState("");

  //function retrieves the input value from the event and updated the state using setTodoTitle
  function handleTitleChange(event) {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault(); //added prevent default to prevent default behavior of the form
    //let todoTitle = event.target.title.value; retrieves the value of the title input in form
    //console.log("todoTitle:", todoTitle); logs value in console

    const newTodo = {
      title: todoTitle,
      id: Date.now(),
    };

    console.log("newTodo", newTodo);

    //Calls the onAddTodo callback prop and pass the newTodo object
    //checks if onAddTodo is provided then calls it with newTodo object

    if (onAddTodo) {
      onAddTodo(newTodo);
    }

    //resets the form and clears input;
    // event.target.reset();

    //clears the input field by resetting the state
    setTodoTitle("");
  }

  return (
    //added onSubmit prop to the form element
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle} // Pass the current value of todoTitle to the InputWithLabel component
        handleTitleChange={handleTitleChange} // Pass the change handler
        label="Title" //Passing a label prop to the InputWithLabel component
        autoFocus={true} //added autoFocus prop to the InputWithLabel component
      />

      {/* delete later from this line */}
      {/* <label htmlFor="todoTitle">Title</label>
      <input
        name="title"
        id="todoTitle"
        type="text"
        value={todoTitle} // controlled input of component set to todoTitle var
        onChange={handleTitleChange} // Initializes func handleTitleChange for handling changes
      /> */}

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
