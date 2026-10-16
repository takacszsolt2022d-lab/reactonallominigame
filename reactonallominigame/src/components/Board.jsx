import { useState } from "react";
import Square from "./Square";

export default function Board() {
    const [squares] = useState([1, 2, 3]);

    return (
        <div className="board-row">
            <Square value={squares[0]} />
            <Square value={squares[1]} />
            <Square value={squares[2]} />
        </div>
    );
}
