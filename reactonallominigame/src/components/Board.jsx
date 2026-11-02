import { useState } from "react";
import { PLAYER_O, PLAYER_X, Square } from "./Square";

const BOARD_SIDES = 3;
const BOARD_INDICES = [...Array(BOARD_SIDES).keys()];
const CELL_COUNT = BOARD_SIDES * BOARD_SIDES;

const WIN_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function Board() {
    const [status, setStatus] = useState(Array(CELL_COUNT).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [lastCell, setLastCell] = useState(null);

    function handleClick(index) {
        if (status[index] || gameOver) return;

        const nextPlayer = currentPlayer;
        const newStatus = status.map((value, cellIndex) => (cellIndex === index ? nextPlayer : value));

        setStatus(newStatus);
        setLastCell(index);

        const hasWinner = WIN_POSITIONS.some(([first, second, third]) => {
            return newStatus[first] && newStatus[first] === newStatus[second] && newStatus[first] === newStatus[third];
        });

        if (hasWinner) {
            setWinner(nextPlayer);
            setGameOver(true);
            return;
        }

        if (newStatus.every((cell) => cell)) {
            setWinner(null);
            setGameOver(true);
            return;
        }

        setCurrentPlayer(nextPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
    }

    function handlePlayAgain() {
        setStatus(Array(CELL_COUNT).fill(null));
        setCurrentPlayer(PLAYER_X);
        setWinner(null);
        setGameOver(false);
        setLastCell(null);
    }

    const statusText = gameOver
        ? winner
            ? `Game over! ${winner} won`
            : "Draw! No winner"
        : `Next player: ${currentPlayer}`;

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <div className="game-status">{statusText}</div>
            <div className="board">
                {BOARD_INDICES.map((rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {BOARD_INDICES.map((columnIndex) => {
                            const index = rowIndex * BOARD_SIDES + columnIndex;
                            return (
                                <Square
                                    key={index}
                                    value={status[index]}
                                    highlight={index === lastCell}
                                    disabled={Boolean(status[index]) || gameOver}
                                    onSquareClick={() => handleClick(index)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            {gameOver && <button className="reset-button" onClick={handlePlayAgain}>Reset</button>}
        </div>
    );
}

export default Board;
