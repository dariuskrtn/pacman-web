import React from "react";
import { Canvas } from "./Canvas";
import { Level, Cell, Entity, EntityKind } from "../../api/Contracts";

interface RendererProps {
    cells: Cell[][];
    entities: Entity[];
    frame: number;
}

interface GridInfo {
    sideLength: number;
    offsetX: number;
    offsetY: number;
}

export class Renderer extends React.Component<RendererProps, never> {
    ctx?: CanvasRenderingContext2D;
    gridInfo?: GridInfo;

    componentDidUpdate() {
        if (!this.ctx || !this.gridInfo) { return; }
        this.draw(this.ctx, this.gridInfo);
    }

    loadCanvasContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.gridInfo = this.calculateGridInfo(ctx, this.props.cells);
    }

    draw(ctx: CanvasRenderingContext2D, gridInfo: GridInfo) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        ctx.translate(gridInfo.offsetX, gridInfo.offsetY);
        this.drawGrid(ctx, gridInfo.sideLength, this.props.cells);
        this.drawObjects(ctx, gridInfo.sideLength, this.props.entities);
        ctx.restore();
        this.showFrameCount(ctx);
    }

    showFrameCount(ctx: CanvasRenderingContext2D) {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "red";
        ctx.fillText(this.props.frame.toString(), ctx.canvas.width - 50, 20);
    }

    drawGrid(ctx: CanvasRenderingContext2D, cellSize: number, cells: Cell[][]) {
        ctx.save();
        for (let r = 0; r < cells.length; r++) {
            for (let c = 0; c < cells[r].length; c++) {
                const cell = cells[r][c];
                const y = r * cellSize;
                const x = c * cellSize;
                ctx.strokeStyle = "gray";
                if (cell === Cell.empty) {
                    ctx.fillStyle = "white";
                } else {
                    ctx.fillStyle = "black";
                }
                ctx.fillRect(x, y, cellSize, cellSize);
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }
        ctx.restore();
    }

    drawObjects(ctx: CanvasRenderingContext2D, cellSize: number, objects: Entity[]) {
        for (const object of objects) {
            if (object.kind === EntityKind.pacman) {
                ctx.fillStyle = "yellow";
            } else if (object.kind === EntityKind.berry) {
                ctx.fillStyle = "red";
            } else if (object.kind === EntityKind.ghost) {
                ctx.fillStyle = "blue";
            } else {
                console.error(`Unknown entity kind ${object.kind}`);
            }
            ctx.strokeStyle = "black";
            const x = cellSize * object.col + cellSize / 2;
            const y = cellSize * object.row + cellSize / 2;
            const r = 0.8 * cellSize / 2;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    calculateGridInfo(ctx: CanvasRenderingContext2D, cells: Cell[][]): GridInfo {
        const canvasHeight = ctx.canvas.height;
        const canvasWidth = ctx.canvas.width;
        const rowCount = cells.length;
        const columnCount = cells[0].length;
        const sideLength = Math.min(canvasHeight / rowCount, canvasWidth / columnCount);
        const gridHeight = sideLength * rowCount;
        const gridWidth = sideLength * columnCount;
        const leftoverHeight = canvasHeight - gridHeight;
        const leftoverWidth = canvasWidth - gridWidth;
        const offsetX = leftoverWidth / 2;
        const offsetY = leftoverHeight / 2;
        return {
            sideLength,
            offsetX,
            offsetY,
        };
    }

    render() {
        return <Canvas onContextLoaded={ctx => this.loadCanvasContext(ctx)} />;
    }
}
