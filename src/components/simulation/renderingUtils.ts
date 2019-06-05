import { Entity, EntityKind, Move } from "../../api/Contracts";
import {
    Berry,
    DeadGhostDown,
    DeadGhostLeft,
    DeadGhostRight,
    DeadGhostUp,
    DeadGhostWait,
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
        sprite: PacmanLeft,
        spriteIfBerryIsTaken: PacmanLeft
    },
    {
        kind: EntityKind.pacman,
        move: Move.right,
        sprite: PacmanRight,
        spriteIfBerryIsTaken: PacmanRight
    },
    {
        kind: EntityKind.pacman,
        move: Move.up,
        sprite: PacmanUp,
        spriteIfBerryIsTaken: PacmanUp
    },
    {
        kind: EntityKind.pacman,
        move: Move.down,
        sprite: PacmanDown,
        spriteIfBerryIsTaken: PacmanDown
    },
    {
        kind: EntityKind.pacman,
        move: Move.wait,
        sprite: PacmanWait,
        spriteIfBerryIsTaken: PacmanWait
    },
    {
        kind: EntityKind.ghost,
        move: Move.left,
        sprite: GhostLeft,
        spriteIfBerryIsTaken: DeadGhostLeft
    },
    {
        kind: EntityKind.ghost,
        move: Move.right,
        sprite: GhostRight,
        spriteIfBerryIsTaken: DeadGhostRight
    },
    {
        kind: EntityKind.ghost,
        move: Move.up,
        sprite: GhostUp,
        spriteIfBerryIsTaken: DeadGhostUp
    },
    {
        kind: EntityKind.ghost,
        move: Move.down,
        sprite: GhostDown,
        spriteIfBerryIsTaken: DeadGhostDown
    },
    {
        kind: EntityKind.ghost,
        move: Move.wait,
        sprite: GhostWait,
        spriteIfBerryIsTaken: DeadGhostWait
    },
    {
        kind: EntityKind.berry,
        move: Move.wait,
        sprite: Berry,
        spriteIfBerryIsTaken: Berry
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
        .filter(s => s.move === entity.intendedMove)
        .map(s => (berryTaken ? s.spriteIfBerryIsTaken : s.sprite))[0];
    sprite.render(ctx, spritesheet, frame, x, y, cellSize, cellSize);
};
