import React from "react";
import { Renderer } from "./Renderer";

interface SimulationProps {

}

interface SimulationState {
    x: number;
    y: number;
    r: number;
    frame: number;
}

export class Simulation extends React.Component<SimulationProps, SimulationState> {

    rAF?: number;

    constructor(props: SimulationProps) {
        super(props);
        this.state = {
            frame: 0,
            r: 10,
            x: 100,
            y: 100,
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.update);
    }

    componentWillUnmount() {
        if (this.rAF) {
            cancelAnimationFrame(this.rAF);
        }
    }

    update() {
        this.setState(prevState => ({
            frame: prevState.frame + 1,
            r: 10 * Math.abs(Math.sin(prevState.frame*0.1)+5),
        }));
        this.rAF = requestAnimationFrame(this.update);
    }

    render() {
        const {x, y, r} = this.state;
        return <Renderer circleX={x} circleY={y} radius={r} color="red" />;
    }
}
