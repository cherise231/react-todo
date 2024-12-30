import React from "react";

// Add props as a parameter in the TodoListItem function
// I added ({ todo }) as a parameter in the TodoListItem function
const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    // Update the todo object reference to come from props
    // I updated the reference to use todo.title in TodoListItem.

    <li className="todo-list-item">
      {todo.title}
      {/*created button element */}
      <button
        type="button"
        //added an onClick prop to the button element and passes function onRemoveTodo from props with the current id as the argument
        className="remove-button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
