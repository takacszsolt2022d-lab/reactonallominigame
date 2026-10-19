import { useRef, useState } from "react";
import { PLAYER_O, PLAYER_X, Square } from "./Square";

export function Board() {
    const [status, setStatus] = useState(new Array(9).fill(undefined));
    const lastPlayer = useRef();

    function handleClick(idx, player) {
        if (player !== PLAYER_O && player !== PLAYER_X) return;
        if (lastPlayer.current === player) return;
        if (status[idx]) return;

        lastPlayer.current = player;
        setStatus((currentStatus) => currentStatus.map((value, index) => (index === idx ? player : value)));
    }

    return (
        <div className="board">
            <div className="board-row">
                <Square value={status[0]} onSquareClick={(player) => handleClick(0, player)} />
                <Square value={status[1]} onSquareClick={(player) => handleClick(1, player)} />
                <Square value={status[2]} onSquareClick={(player) => handleClick(2, player)} />
            </div>
            <div className="board-row">
                <Square value={status[3]} onSquareClick={(player) => handleClick(3, player)} />
                <Square value={status[4]} onSquareClick={(player) => handleClick(4, player)} />
                <Square value={status[5]} onSquareClick={(player) => handleClick(5, player)} />
            </div>
            <div className="board-row">
                <Square value={status[6]} onSquareClick={(player) => handleClick(6, player)} />
                <Square value={status[7]} onSquareClick={(player) => handleClick(7, player)} />
                <Square value={status[8]} onSquareClick={(player) => handleClick(8, player)} />
            </div>
        </div>
    );
}

export default Board;
