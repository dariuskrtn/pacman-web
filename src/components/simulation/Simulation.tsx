import React from "react";
import { Renderer } from "./Renderer";
import { Level, Step, Entity } from "../../api/Contracts";
import { moveEntities } from "./logic";

interface SimulationProps {
    initialState: Level;
    steps: Step[];
    speed: number;
    onSimulationEnd: () => void;
    spritesheet: HTMLImageElement;
}

interface SimulationState {
    currentStep: number;
    stepProgress: number;
    lastTime: number;
    currentFrame: number;
    entitiesState: Entity[];
}

const EMPTY_STATE = (props: SimulationProps) => ({
    lastTime: Date.now(),
    currentStep: 0,
    stepProgress: 0,
    currentFrame: 0,
    entitiesState: props.initialState.objects,
});

export class Simulation extends React.Component<SimulationProps, SimulationState> {

    rAF?: number;

    constructor(props: SimulationProps) {
        super(props);
        this.state = EMPTY_STATE(props);
    }

    componentWillReceiveProps(newProps: SimulationProps) {
        if (!newProps || !this.props) {
            return;
        }
        if (newProps.initialState !== this.props.initialState) {
            // Start new simulation
            if (this.rAF) {
                cancelAnimationFrame(this.rAF);
            }
            this.setState(EMPTY_STATE(newProps), () => this.rAF = requestAnimationFrame(() => this.update(0)));
        }
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
        if (this.state.stepProgress >= 1) {
            const newStep = this.state.currentStep + 1;
            if (newStep >= this.props.steps.length) {
                this.props.onSimulationEnd();
                return;
            }
            this.setState({
                currentStep: newStep,
                stepProgress: 0,
            });
        }
        const newStepProgress = Math.min(1, this.state.stepProgress + dt * this.props.speed);
        this.setState({
            lastTime: Date.now(),
            currentFrame: this.state.currentFrame + 1,
            stepProgress: newStepProgress,
            entitiesState: moveEntities(this.props.steps[this.state.currentStep].objects, newStepProgress)
        });
        // TODO: check for collisions (entity might die in the middle of the move)
        this.rAF = requestAnimationFrame(() => this.update(nextDt));
    }

    render() {
        return (
            <Renderer
                cells={this.props.initialState.cells}
                entities={this.state.entitiesState}
                frame={this.state.currentFrame}
                spritesheet={this.props.spritesheet}
            />
        );
    }
}
