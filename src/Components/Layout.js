import React, { useMemo } from "react";
import PhoneBook from "./Accordian";

const Layout = () => {
  // conduct Virtulazation using react
  // first fetch some data and render the list
  return (
    <div>
      <h1>Phone-Book</h1>
      <PhoneBook />
    </div>
  );
};

export default Layout;
