export default function Square({ value, onSquareClick }) {
    function handleContextMenu(event) {
        event.preventDefault();
        onSquareClick();
    }
    return (
        <button className="square" onClick={onSquareClick} onContextMenu={handleContextMenu}>
            {value}
        </button>
    );
}
