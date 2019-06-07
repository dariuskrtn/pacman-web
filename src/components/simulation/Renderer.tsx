import React from "react";
import { Cell, Entity, EntityKind } from "../../api/Contracts";
import { CellEmpty, CellWall } from "../../data/sprites";
import { Canvas } from "./Canvas";
import { renderEntity } from "./renderingUtils";

interface RendererProps {
    cells: Cell[][];
    entities: Entity[];
    frame: number;
    spritesheet: HTMLImageElement;
}

interface GridInfo {
    sideLength: number;
    offsetX: number;
    offsetY: number;
}

interface RendererState {
    canvasHack: number;
}

export class Renderer extends React.Component<RendererProps, RendererState> {
    ctx?: CanvasRenderingContext2D;
    gridInfo?: GridInfo; // TODO: need to update this on new level
    resizeFunction: any = () => this.onResize();

    state: RendererState = {
        canvasHack: 0,
    };

    componentDidMount() {
        window.addEventListener("resize", this.resizeFunction);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    onResize() {
        if (this.ctx) {
            this.setState({ canvasHack: this.state.canvasHack + 1 });
        }
    }

    componentDidUpdate() {
        if (!this.ctx || !this.gridInfo) { return; }
        this.loadCanvasContext(this.ctx);
        this.draw(this.ctx, this.gridInfo);
    }

    loadCanvasContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.gridInfo = this.calculateGridInfo(ctx, this.props.cells);
    }

    draw(ctx: CanvasRenderingContext2D, gridInfo: GridInfo) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.imageSmoothingEnabled = false;
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
                /*ctx.strokeStyle = "gray";
                if (cell === Cell.empty) {
                    ctx.fillStyle = "black";
                } else {
                    ctx.fillStyle = "blue";
                }
                ctx.fillRect(x, y, cellSize, cellSize);
                // ctx.strokeRect(x, y, cellSize, cellSize);*/
                if (cell === Cell.empty) {
                    CellEmpty.render(ctx, this.props.spritesheet, 0, x, y, cellSize, cellSize);
                } else {
                    CellWall.render(ctx, this.props.spritesheet, 0, x, y, cellSize, cellSize);
                }
            }
        }
        ctx.restore();
    }

    drawObjects(ctx: CanvasRenderingContext2D, cellSize: number, objects: Entity[]) {
        const berryTaken = objects.every(e => e.kind !== EntityKind.berry);
        for (const object of objects) {
            renderEntity(ctx, this.props.spritesheet, cellSize, object, berryTaken, this.props.frame);
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
        return <Canvas key={this.state.canvasHack} onContextLoaded={ctx => this.loadCanvasContext(ctx)} />;
    }
}
