import { useState, useMemo } from "react";
import { getItems } from "./util";
import Menu from "../components/Menu";

function ExpensiveFunction() {
  const [inputValue, setInputValue] = useState("");
  const allItems = useMemo(() => getItems(inputValue), [inputValue]);
  const items = allItems.slice(0, 100);

  return (
    <div className='city-app'>
      <div>
        <label>Find a city</label>
        <div>
          <input type='text' />
          <button onClick={() => selectItem(null)} aria-label='toggle menu'>
            &#10005;
          </button>
        </div>
        <Menu items={items} />
      </div>
    </div>
  );
}

export { ExpensiveFunction };
