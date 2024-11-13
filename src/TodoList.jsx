import React from "react";

const todoList = [
    { id: 1, title: "Complete homework" },
    { id: 2, title: "Finish project" },
    { id: 3, title: "Go grocery shopping" },
  ];

function TodoList() {
    console.log(todoList);

  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
