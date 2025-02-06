import React from "react";
import styles from "./TodoListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// Add props as a parameter in the TodoListItem function
// I added ({ todo }) as a parameter in the TodoListItem function
const TodoListItem = ({ todo, onRemoveTodo }) => {
  // console.log("type of todo", typeof todo);
  // console.log("type of onRemoveTodo", typeof onRemoveTodo);
  // console.log("todo", todo);
  return (
    // Update the todo object reference to come from props
    // I updated the reference to use todo.title in TodoListItem.

    <li className={styles.ListItem}>
      {/* <div className="todo-item-container"> */}
      <div className={styles.todoItemContainer}>
        <input type="checkbox" className={styles.customCheckbox} />

        <p>{todo.title}</p>

        {/*created button element */}
        <button
          type="button"
          //added an onClick prop to the button element and passes function onRemoveTodo from props with the current id as the argument
          className={styles.removeButton}
          onClick={() => onRemoveTodo(todo.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
