import React from "react";

interface CanvasProps {
    onContextLoaded: (context: CanvasRenderingContext2D) => void;
}

export class Canvas extends React.Component<CanvasProps, never> {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <canvas
                height={600}
                width={800}
                ref={r => {
                    if (!r) { return null; }
                    const ctx = r.getContext("2d");
                    if (!ctx) {
                        throw new Error(`2d context not supported or canvas already initialized`);
                    }
                    this.props.onContextLoaded(ctx);
                }}
            />
        );
    }
}
