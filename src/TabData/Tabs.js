import React, { useContext, useState } from "react";
import { Button } from "./TabStyles";
import { createContext } from "react";

const TabContext = createContext();

const Tabs = (props) => {
  const [isActive, setIsActive] = useState("html");

  const handleChange = (value) => {
    setIsActive(value);
  };
  return (
    <div>
      <TabContext.Provider value={{ isActive, handleChange }}>
        {props.children}
      </TabContext.Provider>
    </div>
  );
};

const TabButton = (props) => {
  const { isActive, handleChange } = useContext(TabContext);
  return (
    <Button
      className={isActive === props.value ? "isActive" : ""}
      onClick={() => handleChange(props.value)}>
      {props.children}
    </Button>
  );
};

const TabPanel = (props) => {
  const { isActive } = useContext(TabContext);
  return (
    <div style={{ display: props.value !== isActive ? "none" : "block" }}>
      {props.children}
    </div>
  );
};
Tabs.Tab = TabButton;
Tabs.panel = TabPanel;

export default Tabs;
