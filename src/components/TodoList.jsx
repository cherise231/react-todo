import React from "react";

import TodoListItem from "../components/TodoListItem";
import PropTypes from "prop-types";
import { useRef } from "react";

//added props parameter to function
function TodoList({ todoList, onRemoveTodo }) {
  console.log(todoList);
  // console.log("type of todoList", typeof todoList);
  // console.log("type of todoList", Array.isArray(todoList));
  //todoList is an array of objects
  // console.log("type of onRemoveTodo", typeof onRemoveTodo);

  const buttonRefs = useRef([]);
  // const buttonRefs = useRef(todoList.map(() => React.createRef()));
  return (
    <div className="containerList">
      <ul className="containerUL">
        {/* changed todoList to reference props  */}

        {todoList.map((todo, index) => {
          if (!buttonRefs.current[index]) {
            buttonRefs.current[index] = React.createRef();
          }

          // Pass key as a prop equal to the id of the todo object
          // I passed key={todo.id} as a prop to TodoListItem
          // Pass todo as a prop
          // I passed todo={todo} as a prop to TodoListItem
          //passed onRemoveTodo prop as a callback handler named onRemoveTodo to the TodoListItem component
          //enables TodoListItem component to call onRemoveTodo when the user clicks the remove button
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              buttonRef={buttonRefs.current[index]} // Pass the ref to TodoListItem
            />
          );
        })}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
};

export default TodoList;
