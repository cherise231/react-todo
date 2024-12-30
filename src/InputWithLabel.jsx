import React, { useEffect, useRef } from "react"; //imported useEffect and useRef from react

//Declare InputWithLabel component with props todoTitle and handleTitleChange; making it reusable
const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
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

export default InputWithLabel;
