import { useState } from "react";
import Square from "./Square";

export default function Board() {
    const [squares, setSquares] = useState(["", "", ""]);

    function handleClick(idx, mouseButton) {
        if (mouseButton !== "left" && mouseButton !== "right") {
            return;
        }

        setSquares((currentSquares) => currentSquares.map((square, index) => {
            if (index === idx) {
                return mouseButton === "left" ? "x" : "o";
            }
            return square;
        }));
    }
    return (
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={(mouseButton) => handleClick(0, mouseButton)} />
            <Square value={squares[1]} onSquareClick={(mouseButton) => handleClick(1, mouseButton)} />
            <Square value={squares[2]} onSquareClick={(mouseButton) => handleClick(2, mouseButton)} />
        </div>
    );
}
