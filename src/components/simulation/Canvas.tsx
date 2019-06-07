import React from "react";

interface CanvasProps {
    onContextLoaded: (context: CanvasRenderingContext2D) => void;
}

export class Canvas extends React.Component<CanvasProps, never> {
    canvas?: HTMLCanvasElement;

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        if (!this.canvas) { return; }
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error(`2d context not supported or canvas already initialized`);
        }
        this.props.onContextLoaded(ctx);
    }

    render() {
        return (
            <canvas
                height={600}
                width={800}
                // style={{ border: "1px dashed black" }}
                ref={r => {
                    if (!r) { return null; }
                    this.canvas = r;
                }}
            />
        );
    }
}
