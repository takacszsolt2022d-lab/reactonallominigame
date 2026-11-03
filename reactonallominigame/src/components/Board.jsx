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
    const [winningLine, setWinningLine] = useState([]);

    function handleClick(index) {
        if (status[index] || gameOver) return;

        const playedPlayer = currentPlayer;
        const newStatus = status.map((value, cellIndex) => (cellIndex === index ? playedPlayer : value));

        setStatus(newStatus);
        setLastCell(index);

        const completedLine = WIN_POSITIONS.find(([first, second, third]) => {
            return newStatus[first] && newStatus[first] === newStatus[second] && newStatus[first] === newStatus[third];
        });

        if (completedLine) {
            setWinner(playedPlayer);
            setWinningLine(completedLine);
            setGameOver(true);
            return;
        }

        if (newStatus.every(Boolean)) {
            setGameOver(true);
            return;
        }

        setCurrentPlayer(playedPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
    }

    function handlePlayAgain() {
        setStatus(Array(CELL_COUNT).fill(null));
        setCurrentPlayer(PLAYER_X);
        setWinner(null);
        setGameOver(false);
        setLastCell(null);
        setWinningLine([]);
    }

    const statusText = gameOver
        ? winner
            ? `Game over! ${winner} won`
            : "Draw! No winner"
        : `Next player: ${currentPlayer}`;

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <div className="game-status" aria-live="polite" aria-atomic="true">{statusText}</div>
            <div className="board" role="group" aria-label="Tic-tac-toe board">
                {BOARD_INDICES.map((rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {BOARD_INDICES.map((columnIndex) => {
                            const index = rowIndex * BOARD_SIDES + columnIndex;
                            return (
                                <Square
                                    key={index}
                                    index={index}
                                    value={status[index]}
                                    highlight={index === lastCell}
                                    winning={winningLine.includes(index)}
                                    disabled={Boolean(status[index]) || gameOver}
                                    onSquareClick={() => handleClick(index)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <button type="button" className="reset-button" onClick={handlePlayAgain}>Reset</button>
        </div>
    );
}

export default Board;
