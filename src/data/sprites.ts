import { Sprite } from "../utils/Sprite";

export const PacmanLeft = new Sprite(
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
    [0, 1, 2, 3, 2, 1]
);

export const PacmanUp = new Sprite(
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    [0, 1, 2, 3, 2, 1]
);

export const PacmanDown = new Sprite(
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    [0, 1, 2, 3, 2, 1]
);

export const PacmanRight = new Sprite(
    [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
    [0, 1, 2, 3, 2, 1]
);

export const PacmanWait = new Sprite(
    [
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 6, y: 4 }
    ],
    [0, 1, 2, 3, 2, 1, 0, 4, 5, 6, 5, 4],
    0.3
);

export const GhostLeft = new Sprite(
    [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }],
    [0, 1, 0, 2]
);

export const GhostRight = new Sprite(
    [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }],
    [0, 1, 0, 2]
);

export const GhostUp = new Sprite(
    [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
    [0, 1, 0, 2]
);

export const GhostDown = new Sprite(
    [{ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
    [0, 1, 0, 2]
);

export const GhostWait = new Sprite(
    [{ x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }],
    [0, 1, 0, 2, 3, 2],
    0.1
);

export const Berry = new Sprite([{ x: 7, y: 0 }], [0]);
