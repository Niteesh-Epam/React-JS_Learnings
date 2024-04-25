import React, { useEffect, useState } from "react";

const ChessBoard = () => {
  const [ChessBoard, setChessBoard] = useState([]);
  useEffect(() => {
    let m = 8;
    let n = 8;
    const result = [];
    for (let i = 0; i < n; i++) {
      let newArray = Array.from({ length: m });
      result.push(newArray);
    }
    setChessBoard(result);
  }, []);

  return (
    <div className='chess-container'>
      {ChessBoard.map((row, rowindex) => {
        return (
          <div className='row' key={rowindex}>
            {row.map((item, colIndex) => {
              return (
                <div
                  className={`box ${
                    (colIndex + rowindex) % 2 === 0 ? "black" : "white"
                  }`}></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
