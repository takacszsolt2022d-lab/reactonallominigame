export const PLAYER_X = "X";
export const PLAYER_O = "O";

export function Square({ index, value, highlight, winning, onSquareClick, disabled }) {
    return (
        <button
            type="button"
            className={`square${highlight ? " lastcell" : ""}${winning ? " winning-cell" : ""}`}
            onClick={onSquareClick}
            disabled={disabled}
            aria-label={`Square ${index + 1}${value ? `: ${value}` : ""}${highlight ? ", last move" : ""}${winning ? ", part of winning line" : ""}`}
        >
            {value}
        </button>
    );
}

export default Square;
