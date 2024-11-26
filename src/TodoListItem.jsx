import React from 'react';

// Add props as a parameter in the TodoListItem function
// I added ({ todo }) as a parameter in the TodoListItem function
const TodoListItem = ({ todo }) => {
    return (
        
        // Update the todo object reference to come from props
        // I updated the reference to use todo.title in TodoListItem.
        <li className="todo-list-item">{todo.title}</li>
        
    );

};

export default TodoListItem;