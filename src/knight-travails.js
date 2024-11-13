const isMoveValid = (move) => {
    const x = move[0];
    const y = move[1];
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        return true;
    }
    return false;
};

const knightMoves = (start, destination) => {
    // verify start and destination are valid
    for (const move of [start, destination]) {
        if (!isMoveValid(move)) {
            throw new Error(
                'Start and destination must fit on an 8 x 8 chess board!'
            );
        }
    }
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
        const currentMoveset = queue.shift();
        const lastMove = currentMoveset[currentMoveset.length - 1];
        // push valid moves onto the queue
        for (const validMove of validMoves) {
            const newMoveX = lastMove[0] + validMove[0];
            const newMoveY = lastMove[1] + validMove[1];
            const newMove = [newMoveX, newMoveY];
            // verify new move is in 8 x 8 grid
            if (isMoveValid(newMove)) {
                const newMoveset = [...currentMoveset, newMove];
                queue.push(newMoveset);
                if (newMoveX == destination[0] && newMoveY == destination[1]) {
                    return newMoveset;
                }
            }
        }
    }
};
