import { useState } from "react";
import Square from "./Square";

export default function Board() {
    const [squares, setSquares] = useState([1, 2, 3]);

    function handleClick(idx, mouseButton) {
        if (mouseButton !== "left" && mouseButton !== "right") {
            return;
        }

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
            <Square value={squares[0]} onSquareClick={(mouseButton) => handleClick(0, mouseButton)} />
            <Square value={squares[1]} onSquareClick={(mouseButton) => handleClick(1, mouseButton)} />
            <Square value={squares[2]} onSquareClick={(mouseButton) => handleClick(2, mouseButton)} />
        </div>
    );
}
