import { Sprite } from "../utils/Sprite";

export const PacmanLeft = new Sprite(
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
    [0, 1, 2, 3, 2, 1],
    0.3
);

export const PacmanUp = new Sprite(
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    [0, 1, 2, 3, 2, 1],
    0.3
);

export const PacmanDown = new Sprite(
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    [0, 1, 2, 3, 2, 1],
    0.3
);

export const PacmanRight = new Sprite(
    [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
    [0, 1, 2, 3, 2, 1],
    0.3
);

export const PacmanWait = new Sprite(
    [
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 }
        // { x: 5, y: 4 }, // use these for the white-eye spritesheet
        // { x: 6, y: 4 }
    ],
    // [0, 1, 2, 3, 2, 1, 0, 4, 5, 6, 5, 4],
    [0, 1, 2, 1, 0, 3, 4, 3],
    0.1
);

export const GhostLeft = new Sprite(
    [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }],
    [0, 1, 0, 2],
    0.2
);

export const GhostRight = new Sprite(
    [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }],
    [0, 1, 0, 2],
    0.2
);

export const GhostUp = new Sprite(
    [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
    [0, 1, 0, 2],
    0.2
);

export const GhostDown = new Sprite(
    [{ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
    [0, 1, 0, 2],
    0.2
);

export const GhostWait = new Sprite(
    [
        { x: 7, y: 0 },
        { x: 7, y: 1 },
        { x: 7, y: 2 },
        { x: 7, y: 3 },
        { x: 7, y: 4 }
    ],
    [0, 1, 2, 1, 0, 3, 4, 3],
    0.1
);

export const Berry = new Sprite([{ x: 8, y: 4 }], [0]);

export const DeadGhostLeft = new Sprite(
    [{ x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }],
    [0, 1, 0, 2],
    0.2
);

export const DeadGhostRight = new Sprite(
    [{ x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 }],
    [0, 1, 0, 2],
    0.2
);

export const DeadGhostUp = new Sprite(
    [{ x: 8, y: 2 }, { x: 9, y: 2 }, { x: 10, y: 2 }],
    [0, 1, 0, 2],
    0.2
);

export const DeadGhostDown = new Sprite(
    [{ x: 8, y: 3 }, { x: 9, y: 3 }, { x: 10, y: 3 }],
    [0, 1, 0, 2],
    0.2
);

export const DeadGhostWait = new Sprite(
    [
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 11, y: 2 },
        { x: 11, y: 3 },
        { x: 11, y: 4 }
    ],
    [0, 1, 2, 1, 0, 3, 4, 3],
    0.1
);

export const CellEmpty = new Sprite([{ x: 9, y: 4 }], [0]);

export const CellWall = new Sprite([{ x: 10, y: 4 }], [0]);
