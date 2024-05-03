import React from "react";
import HigherorderComp from "../Components/Patterns/HOC";

const Dropdown = ({ items, showdropDown, onToggle, onSelect }) => {
  return (
    <div>
      <button onClick={onToggle}>Click</button>
      {showdropDown ? (
        <>
          <select
            onChange={(e) => {
              onSelect(e.target.value);
            }}>
            <option>Select One</option>
            {items?.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <div onClick={(e) => onSelect(e.target)}>DropDownComponent</div>
        </>
      ) : null}
    </div>
  );
};

const NewDropdown = HigherorderComp(Dropdown);

export default NewDropdown;
