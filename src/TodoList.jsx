import React from "react";
import TodoListItem from "./TodoListItem";

//added props parameter to function
function TodoList({ todoList, onRemoveTodo }) {
  console.log(todoList);

  return (
    <div className="containerList">
      <ul className="containerUL">
        {/* changed todoList to reference props  */}

        {todoList.map((todo) => (
          // Pass key as a prop equal to the id of the todo object
          // I passed key={todo.id} as a prop to TodoListItem
          // Pass todo as a prop
          // I passed todo={todo} as a prop to TodoListItem
          //passed onRemoveTodo prop as a callback handler named onRemoveTodo to the TodoListItem component
          //enables TodoListItem component to call onRemoveTodo when the user clicks the remove button

          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
