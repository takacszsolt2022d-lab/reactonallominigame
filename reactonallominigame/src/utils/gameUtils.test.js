import { describe, expect, it, jest } from "@jest/globals";
import { win_check } from "./gameUtils.js";

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

function checkStatus(status, player = "X") {
    const setWinner = jest.fn();
    const setGameOver = jest.fn();
    const result = win_check(status, player, setWinner, setGameOver);

    return { result, setWinner, setGameOver };
}

describe("win_check", () => {
    it.each(WIN_POSITIONS.map((positions) => [positions]))("detects a win in positions %j", (positions) => {
        const status = Array(9).fill(null);
        positions.forEach((position) => {
            status[position] = "X";
        });

        const { result, setWinner, setGameOver } = checkStatus(status);

        expect(result).toEqual({ isGameOver: true, winningLine: positions });
        expect(setWinner).toHaveBeenCalledTimes(1);
        expect(setWinner).toHaveBeenCalledWith("X");
        expect(setGameOver).toHaveBeenCalledTimes(1);
        expect(setGameOver).toHaveBeenCalledWith(true);
    });

    it("does not treat three empty cells as a winning line", () => {
        const { result, setWinner, setGameOver } = checkStatus(Array(9).fill(null));

        expect(result).toEqual({ isGameOver: false, winningLine: null });
        expect(setWinner).not.toHaveBeenCalled();
        expect(setGameOver).not.toHaveBeenCalled();
    });

    it("does not report a line containing different marks", () => {
        const status = ["X", "O", "X", null, null, null, null, null, null];
        const { result, setWinner, setGameOver } = checkStatus(status);

        expect(result).toEqual({ isGameOver: false, winningLine: null });
        expect(setWinner).not.toHaveBeenCalled();
        expect(setGameOver).not.toHaveBeenCalled();
    });

    it("reports a draw when the board is full without a winner", () => {
        const status = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
        const { result, setWinner, setGameOver } = checkStatus(status);

        expect(result).toEqual({ isGameOver: true, winningLine: null });
        expect(setWinner).not.toHaveBeenCalled();
        expect(setGameOver).toHaveBeenCalledTimes(1);
        expect(setGameOver).toHaveBeenCalledWith(true);
    });

    it("reports the supplied player when O completes a winning line", () => {
        const status = ["X", "X", null, "O", "O", "O", null, null, "X"];
        const { result, setWinner, setGameOver } = checkStatus(status, "O");

        expect(result).toEqual({ isGameOver: true, winningLine: [3, 4, 5] });
        expect(setWinner).toHaveBeenCalledTimes(1);
        expect(setWinner).toHaveBeenCalledWith("O");
        expect(setGameOver).toHaveBeenCalledTimes(1);
        expect(setGameOver).toHaveBeenCalledWith(true);
    });

    it("prioritizes a win over a full-board draw", () => {
        const status = ["X", "X", "X", "O", "O", "X", "O", "X", "O"];
        const { result, setWinner, setGameOver } = checkStatus(status);

        expect(result).toEqual({ isGameOver: true, winningLine: [0, 1, 2] });
        expect(setWinner).toHaveBeenCalledTimes(1);
        expect(setWinner).toHaveBeenCalledWith("X");
        expect(setGameOver).toHaveBeenCalledTimes(1);
        expect(setGameOver).toHaveBeenCalledWith(true);
    });
});