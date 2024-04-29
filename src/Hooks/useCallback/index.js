import React, { useState, useCallback } from "react";
import Search from "./Search";

const allUsers = ["john", "alex", "george", "simon", "james"];

const UseCallback = () => {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback(
    (text) => {
      const filteredUsers = allUsers.filter((user) => user.includes(text));
      setUsers(filteredUsers);
    },
    [users]
  );

  const handleShuffle = (arr) => {
    let temp;
    let randomIndex;
    let newarr = [...arr];
    for (let i = 0; i < newarr.length; i++) {
      randomIndex = Math.floor(Math.random() * newarr.length);
      temp = newarr[i];
      newarr[i] = newarr[randomIndex];
      newarr[randomIndex] = temp;
    }

    return newarr;
  };

  return (
    <>
      <button onClick={() => setUsers(handleShuffle(allUsers))}>Shuffle</button>
      <Search onChange={handleSearch} />
      <div>
        <ul>
          {users.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default UseCallback;
