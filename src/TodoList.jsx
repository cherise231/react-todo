import React from "react";
import TodoListItem from "./TodoListItem";

// const todoList = [
//     { id: 1, title: "Complete homework" },
//     { id: 2, title: "Finish project" },
//     { id: 3, title: "Go grocery shopping" },
//   ];

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
