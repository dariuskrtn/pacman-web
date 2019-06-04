import React from "react";
import { Renderer } from "./Renderer";

interface SimulationProps {
    speed: number;
    radius: number;
    y: number;
}

interface SimulationState {
    x: number;
    frame: number;
    lastTime: number;
}

export class Simulation extends React.Component<SimulationProps, SimulationState> {

    rAF?: number;

    constructor(props: SimulationProps) {
        super(props);
        this.state = {
            frame: 0,
            lastTime: Date.now(),
            x: 100,
        };
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(() => this.update(0));
    }

    componentWillUnmount() {
        if (this.rAF) {
            cancelAnimationFrame(this.rAF);
        }
    }

    update(dt: number) {
        const now = Date.now();
        const nextDt = (now - this.state.lastTime) / 1000;
        const {radius, y, speed} = this.props;
        this.setState(prevState => {
            const dx = speed * dt;
            let nextX = prevState.x + dx;
            if (nextX >= 800 + radius) { nextX = -radius; }
            return {
                frame: prevState.frame + 1,
                lastTime: Date.now(),
                x: nextX,
            };
        });
        this.rAF = requestAnimationFrame(() => this.update(nextDt));
    }

    render() {
        const {x} = this.state;
        const {radius, y} = this.props;
        return <Renderer circleX={x} circleY={y} radius={radius} color="red" />;
    }
}
