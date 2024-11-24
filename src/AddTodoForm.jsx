import React from "react";

//added props as a parameter in the AddTodoForm function
const AddTodoForm = (props) => {

  function handleAddTodo(event) {

    event.preventDefault(); //added prevent default to prevent default behavior of the form
    let todoTitle = event.target.title.value; //retrieves the value of the title input in form
    console.log("todoTitle:", todoTitle);  //logs value in console

    //calls onAddTodo callback prop and passes todoTitle as the argument;
    //checks if onAddTodo is provided then calls it with todoTitle
    if (props.onAddTodo) {
      props.onAddTodo(todoTitle);

    }
    
    //resets the form and clears input;
    event.target.reset(); 

  }


  return (
    <form onSubmit={handleAddTodo}> {/*added onSubmit prop to the form element*/}
      <label htmlFor="todoTitle">Title</label>
      <input name="title" id="todoTitle" type="text" />
      <button type="submit">Add</button>
    </form>
    
  );
};

export default AddTodoForm;
