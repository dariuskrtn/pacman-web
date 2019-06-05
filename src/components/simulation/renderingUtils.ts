import { Entity, EntityKind } from "../../api/Contracts";

export const renderEntity = (
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    entity: Entity,
    berryTaken: boolean,
    frame: number
) =>
    entity.kind === EntityKind.pacman
        ? renderPacman(ctx, cellSize, entity, berryTaken, frame)
        : entity.kind === EntityKind.berry
        ? renderBerry(ctx, cellSize, entity, frame)
        : entity.kind === EntityKind.ghost
        ? renderGhost(ctx, cellSize, entity, berryTaken, frame)
        : undefined;

const renderPacman = (
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    pacman: Entity,
    berryTaken: boolean,
    frame: number
) => {
    if (berryTaken) {
        ctx.fillStyle = "orange";
    } else {
        ctx.fillStyle = "yellow";
    }
    ctx.strokeStyle = "black";
    const x = cellSize * pacman.col + cellSize / 2;
    const y = cellSize * pacman.row + cellSize / 2;
    const r = (0.8 * cellSize) / 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};

const renderBerry = (
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    berry: Entity,
    frame: number
) => {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    const x = cellSize * berry.col + cellSize / 2;
    const y = cellSize * berry.row + cellSize / 2;
    const r = (0.8 * cellSize) / 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};

const renderGhost = (
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    ghost: Entity,
    berryTaken: boolean,
    frame: number
) => {
    if (berryTaken) {
        ctx.fillStyle = "gray";
    } else {
        ctx.fillStyle = "blue";
    }
    ctx.strokeStyle = "black";
    const x = cellSize * ghost.col + cellSize / 2;
    const y = cellSize * ghost.row + cellSize / 2;
    const r = (0.8 * cellSize) / 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};
