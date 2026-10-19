import { useRef, useState } from "react";
import { PLAYER_O, PLAYER_X, Square } from "./Square";

export function Board() {
    const [status, setStatus] = useState(new Array(3).fill(undefined));
    const lastPlayer = useRef();

    function handleClick(idx, player) {
        if (player !== PLAYER_O && player !== PLAYER_X) return;
        if (lastPlayer.current === player) return;

        lastPlayer.current = player;
        setStatus((currentStatus) => currentStatus.map((value, index) => (index === idx ? player : value)));
    }

    return (
        <div className="board-row">
            <Square value={status[0]} onSquareClick={(player) => handleClick(0, player)} />
            <Square value={status[1]} onSquareClick={(player) => handleClick(1, player)} />
            <Square value={status[2]} onSquareClick={(player) => handleClick(2, player)} />
        </div>
    );
}

export default Board;
