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

export function win_check(newStatus, player, setWinner, setGameOver) {
    const winningLine = WIN_POSITIONS.find(([first, second, third]) => {
        const firstCell = newStatus[first];
        return firstCell && firstCell === newStatus[second] && firstCell === newStatus[third];
    });

    if (winningLine) {
        setWinner(player);
        setGameOver(true);
        return { isGameOver: true, winningLine };
    }

    const isDraw = newStatus.every(Boolean);
    if (isDraw) setGameOver(true);

    return { isGameOver: isDraw, winningLine: null };
}
