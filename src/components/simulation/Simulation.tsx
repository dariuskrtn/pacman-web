import React from "react";
import { Renderer } from "./Renderer";
import { Level, Step } from "../../api/Contracts";
import { moveEntities } from "./logic";

interface SimulationProps {
    initialState: Level;
    steps: Step[];
    speed: number;
    onSimulationEnd: () => void;
}

interface SimulationState {
    currentStep: number;
    stepProgress: number;
    lastTime: number;
    currentFrame: number;
}

export class Simulation extends React.Component<SimulationProps, SimulationState> {

    rAF?: number;

    constructor(props: SimulationProps) {
        super(props);
        this.state = {
            lastTime: Date.now(),
            currentStep: 0,
            stepProgress: 0,
            currentFrame: 0,
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
        /*const now = Date.now();
        const nextDt = (now - this.state.lastTime) / 1000;
        const { radius, y, speed } = this.props;
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
        this.rAF = requestAnimationFrame(() => this.update(nextDt));*/
        // const newState = moveEntities(null, dt);
        const now = Date.now();
        const nextDt = (now - this.state.lastTime) / 1000;
        this.setState({
            lastTime: Date.now(),
            currentFrame: this.state.currentFrame + 1,
        });
        this.rAF = requestAnimationFrame(() => this.update(nextDt));
    }

    render() {
        return <Renderer level={this.props.initialState} />;
    }
}
