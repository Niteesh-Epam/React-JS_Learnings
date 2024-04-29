import React from "react";

const Search = ({ onChange }) => {
  console.log("re-render");
  return <input type='text' onChange={(e) => onChange(e.target.value)} />;
};

export default React.memo(Search);
