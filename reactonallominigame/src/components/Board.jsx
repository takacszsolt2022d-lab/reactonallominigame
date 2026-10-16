import { useState } from "react";
import Square from "./Square";

export default function Board() {
    const [squares, setSquares] = useState([1, 2, 3]);

    function handleClick(idx) {
        const nextSquares = squares.map((square, index) => {
            if (index === idx) {
                return square + 1;
            }
            return square;
        });
        setSquares(nextSquares);
    }
    return (
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
    );
}
