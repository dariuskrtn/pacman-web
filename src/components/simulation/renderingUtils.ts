import { Entity, EntityKind, Move } from "../../api/Contracts";
import {
    Berry,
    GhostDown,
    GhostLeft,
    GhostRight,
    GhostUp,
    GhostWait,
    PacmanDown,
    PacmanLeft,
    PacmanRight,
    PacmanUp,
    PacmanWait
} from "../../data/sprites";

const ENTITY_SPRITES = [
    {
        kind: EntityKind.pacman,
        move: Move.left,
        sprite: PacmanLeft
    },
    {
        kind: EntityKind.pacman,
        move: Move.right,
        sprite: PacmanRight
    },
    {
        kind: EntityKind.pacman,
        move: Move.up,
        sprite: PacmanUp
    },
    {
        kind: EntityKind.pacman,
        move: Move.down,
        sprite: PacmanDown
    },
    {
        kind: EntityKind.pacman,
        move: Move.wait,
        sprite: PacmanWait
    },
    {
        kind: EntityKind.ghost,
        move: Move.left,
        sprite: GhostLeft
    },
    {
        kind: EntityKind.ghost,
        move: Move.right,
        sprite: GhostRight
    },
    {
        kind: EntityKind.ghost,
        move: Move.up,
        sprite: GhostUp
    },
    {
        kind: EntityKind.ghost,
        move: Move.down,
        sprite: GhostDown
    },
    {
        kind: EntityKind.ghost,
        move: Move.wait,
        sprite: GhostWait
    },
    {
        kind: EntityKind.berry,
        move: Move.wait,
        sprite: Berry
    }
];

export const renderEntity = (
    ctx: CanvasRenderingContext2D,
    spritesheet: HTMLImageElement,
    cellSize: number,
    entity: Entity,
    berryTaken: boolean,
    frame: number
) => {
    const x = cellSize * entity.col;
    const y = cellSize * entity.row;
    const sprite = ENTITY_SPRITES.filter(s => s.kind === entity.kind)
        .filter(s => s.move === entity.currentMove)
        .map(s => s.sprite)[0];
    sprite.render(ctx, spritesheet, frame, x, y, cellSize, cellSize);
};
