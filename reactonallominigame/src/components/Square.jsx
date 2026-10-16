export default function Square({ value, onSquareClick }) {
    function handleContextMenu(event) {
        event.preventDefault();
        onSquareClick("right");
    }
    return (
        <button
            className="square"
            onClick={() => onSquareClick("left")}
            onContextMenu={handleContextMenu}
        >
            {value}
        </button>
    );
}
