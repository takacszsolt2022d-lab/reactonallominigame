# Tic-Tac-Toe

A two-player Tic-Tac-Toe game built with React and Vite. Players alternate
between X and O on a 3x3 board. The game reports wins and draws, highlights
the latest move, and highlights the winning line as an extra feature. Use
**Reset** at any time to start a new game.

## Run locally

```sh
npm install
npm run dev
```

## Verify

```sh
npm run lint
npm run build
npm run test:unit
npm run test:headless
```

The Jest unit tests cover the eight winning lines and rule edge cases. The
Playwright tests launch the Vite server automatically and cover the board,
turns, win and draw states, move highlighting, reset, and winning-line
highlighting.
