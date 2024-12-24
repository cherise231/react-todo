import React from "react";
import TodoListItem from "./TodoListItem";

//added props parameter to function
function TodoList({ todoList }) {
  console.log(todoList);

  return (
    <div>
      <ul>
        {/* changed todoList to reference props  */}

        {todoList.map((todo) => (
          // Pass key as a prop equal to the id of the todo object
          // I passed key={todo.id} as a prop to TodoListItem
          // Pass todo as a prop
          // I passed todo={todo} as a prop to TodoListItem
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
