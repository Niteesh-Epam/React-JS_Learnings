import React, { useRef, useEffect } from "react";

const GoalsList = ({
  items,
  newstate,
  handleChange,
  handleClickAdd,
  handleDeleteClick,
}) => {
  const InputRef = useRef(null);

  useEffect(() => {
    InputRef.current.focus();
  }, [InputRef]);

  return (
    <div>
      <h1>Goals List</h1>
      <div>
        <input
          type='text'
          value={newstate}
          onChange={handleChange}
          ref={InputRef}
        />
        <button onClick={handleClickAdd}>Add</button>
      </div>
      <button onClick={() => handleDeleteClick(items[0].id)}>Delete</button>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.description}</li>;
        })}
      </ul>
    </div>
  );
};

export default GoalsList;
