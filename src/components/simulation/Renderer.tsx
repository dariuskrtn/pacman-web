import React from "react";
import { Canvas } from "./Canvas";

interface RendererProps {
    circleX: number;
    circleY: number;
    radius: number;
    color: string;
}

export class Renderer extends React.Component<RendererProps, never> {
    ctx?: CanvasRenderingContext2D;

    componentDidUpdate() {
        if (!this.ctx) { return; }
        // w = this.ctx.canvas.width
        // h = this.ctx.canvas.height
        // draw stuff through this.ctx, get info from props
        const {circleX, circleY, radius, color} = this.props;
        const ctx = this.ctx;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();

        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    render() {
        return <Canvas onContextLoaded={ctx => this.ctx = ctx} />;
    }
}
