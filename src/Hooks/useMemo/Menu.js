import React from "react";

function Menu({ items }) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default React.memo(Menu);
