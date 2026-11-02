export const PLAYER_X = "X";
export const PLAYER_O = "O";

export function Square({ value, highlight, onSquareClick, disabled }) {
    return (
        <button
            className={"square" + (highlight ? " lastcell" : "")}
            onClick={onSquareClick}
            disabled={disabled}
        >
            {value}
        </button>
    );
}

export default Square;
