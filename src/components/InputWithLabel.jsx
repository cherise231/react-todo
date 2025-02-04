import React, { useEffect, useRef } from "react"; //imported useEffect and useRef from react

import PropTypes from "prop-types";

//Declare InputWithLabel component with props todoTitle and handleTitleChange; making it reusable
const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {

  // console.log("type of todoTitle", typeof todoTitle); //string
  // console.log("type of handleTitleChange", typeof handleTitleChange);  //function
  // console.log("type of children", typeof children); //undefined
  
  //created a useRef with value null
  const inputRef = useRef(null);
  //created a useEffect hook to focus on input element
  useEffect(() => {
    inputRef.current.focus(); // focuses on the input element
  });

  return (
    <>
      {/*added label prop to the InputWithLabel component*/}
      <label htmlFor="todoTitle">{children}</label>
      <input
        name="title"
        id="todoTitle"
        type="text"
        value={todoTitle} // controlled input of component set to todoTitle var
        onChange={handleTitleChange} // Initializes func handleTitleChange for handling changes
        ref={inputRef} //added ref prop with value inputRef to the input element
      />
    </>
  );
};

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
  children: PropTypes.node,
};


export default InputWithLabel;
