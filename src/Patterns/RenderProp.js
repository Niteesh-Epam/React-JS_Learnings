import React, { useState, useRef } from "react";
import propType from "prop-types";

const ListManipulation = (props) => {
  const [state, setState] = React.useState([]);
  const [newstate, setNewState] = useState("");

  const handleChange = (e) => {
    setNewState(e.target.value);
  };

  const handleClickAdd = (e) => {
    if (newstate !== "") {
      setState((stat) => [
        ...stat,
        {
          id: stat.length,
          description: newstate,
          completed: false,
        },
      ]);
    }
    setNewState("");
  };

  const handleDeleteClick = (id) => {
    setState((stat) => stat.filter((item) => item.id !== id));
  };

  return props.render({
    items: state,
    newstate,
    handleChange,
    handleClickAdd,
    handleDeleteClick,
  });
};

ListManipulation.propType = {
  render: propType.func.isRequired,
};

export default ListManipulation;
