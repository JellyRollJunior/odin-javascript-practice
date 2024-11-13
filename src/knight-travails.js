// BFS to find shortest path
// DFS will infinite loop
// Chess board 8 x 8
const knightMoves = (start, destination) => {
    const validMoves = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
        [1, -2],
        [2, -1],
        [-1, -2],
        [-2, -1],
    ];
    const queue = [[start]];
    while (queue.length >= 1) {
        const moves = queue.shift();
        const lastMove = moves[moves.length - 1];
        // push valid moves onto the queue
        for (const validMove of validMoves) {
            const newMoveX = lastMove[0] + validMove[0];
            const newMoveY = lastMove[1] + validMove[1];
            const newMove = [newMoveX, newMoveY];
            // verify new move is in 8 x 8 grid
            if (
                newMoveX >= 0 &&
                newMoveX <= 7 &&
                newMoveY >= 0 &&
                newMoveY <= 7
            ) {
                const newMoveset = [...moves, newMove];
                queue.push(newMoveset);
                if (newMoveX == destination[0] && newMoveY == destination[1]) {
                    return newMoveset;
                }
            }
        }
    }
};
