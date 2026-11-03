// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

/**
 * @param {import("@playwright/test").Locator} squares
 * @param {number[]} positions
 */
async function play(squares, positions) {
    for (const position of positions) {
        await squares.nth(position).click();
    }
}

test("the board has 9 squares", async ({ page }) => {
    await expect(page.locator(".square")).toHaveCount(9);
});

test("players alternate turns and occupied squares stay unchanged", async ({ page }) => {
    const squares = page.locator(".square");

    await squares.nth(0).click();
    await expect(squares.nth(0)).toBeDisabled();
    await squares.nth(1).click();

    await expect(squares.nth(0)).toHaveText("X");
    await expect(squares.nth(1)).toHaveText("O");
    await expect(page.locator(".game-status")).toHaveText("Next player: X");
});

test("the most recent square is highlighted", async ({ page }) => {
    const squares = page.locator(".square");

    await squares.nth(0).click();
    await expect(squares.nth(0)).toHaveClass(/lastcell/);

    await squares.nth(1).click();
    await expect(squares.nth(1)).toHaveClass(/lastcell/);
    await expect(squares.nth(0)).not.toHaveClass(/lastcell/);
});

test("a win is reported and the winning line is highlighted", async ({ page }) => {
    const squares = page.locator(".square");
    await play(squares, [0, 3, 1, 4, 2]);

    await expect(page.locator(".game-status")).toHaveText("Game over! X won");
    for (const index of [0, 1, 2]) {
        await expect(squares.nth(index)).toHaveClass(/winning-cell/);
    }
    await expect(squares.nth(5)).toBeDisabled();
});

test("a full board without a winner is reported as a draw", async ({ page }) => {
    const squares = page.locator(".square");
    await play(squares, [0, 1, 2, 4, 3, 5, 7, 6, 8]);

    await expect(page.locator(".game-status")).toHaveText("Draw! No winner");
});

test("reset is available during play", async ({ page }) => {
    const squares = page.locator(".square");
    await squares.nth(0).click();
    await page.getByRole("button", { name: "Reset" }).click();

    await expect(squares.nth(0)).toHaveText("");
    await expect(squares.nth(0)).toBeEnabled();
    await expect(page.locator(".game-status")).toHaveText("Next player: X");
});

test("reset clears the board and starts with X", async ({ page }) => {
    const squares = page.locator(".square");
    await play(squares, [0, 3, 1, 4, 2]);
    await page.getByRole("button", { name: "Reset" }).click();

    await expect(squares).toHaveCount(9);
    for (let index = 0; index < 9; index += 1) {
        await expect(squares.nth(index)).toHaveText("");
        await expect(squares.nth(index)).toBeEnabled();
    }
    await expect(page.locator(".game-status")).toHaveText("Next player: X");
    await expect(squares.nth(0)).not.toHaveClass(/winning-cell|lastcell/);
});
