import React from "react";
import { Entity, Level, Step } from "../../api/Contracts";
import { moveEntities } from "./logic";
import { Renderer } from "./Renderer";

interface SimulationProps {
    initialState: Level;
    steps: Step[];
    speed: number;
    onSimulationEnd: () => void;
    spritesheet: HTMLImageElement;
    startingStep?: number;
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
    currentStep: props.startingStep ? props.startingStep : 0,
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
        if (newProps.initialState !== this.props.initialState || newProps.steps !== this.props.steps || newProps.startingStep !== this.props.startingStep) {
            // Start new simulation
            console.log("Starting new animation");
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
        if (this.state.currentStep >= this.props.steps.length) {
            console.log(this.props.initialState.cells, this.state.entitiesState, this.state.currentFrame);
            return;
        }
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
            entitiesState: moveEntities(this.props.steps[this.state.currentStep].objects, newStepProgress),
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
                stepIndex={this.state.currentStep}
            />
        );
    }
}
