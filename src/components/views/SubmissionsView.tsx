import React from "react";
import * as api from "../../api/Api";
import { Level, Outcome, SubmissionDetailsResponse } from "../../api/Contracts";
import spritesheet from "../../assets/spritesheet.png";
import "../../styles/submissions-view.css";
import { Loader } from "../Loader";
import { QueueItem, QueueItemState, SubmissionQueue } from "../queue/SubmissionQueue";
import { SubmissionQueueControls } from "../queue/SubmissionQueueControls";
import { Simulation } from "../simulation/Simulation";
import { ScoreboardView } from "./ScoreboardView";

interface SubmissionsViewState {
    spritesheet?: HTMLImageElement;
    queueItems: QueueItem[];
    level?: Level;
    levelClosed: boolean;
    simulatingItemIndex: number;
    activeTimeout?: NodeJS.Timeout;
    startingStepIndex: number;
    simulationSpeed: number;
}

const POLL_PERIOD = 2000;
const SHOW_OUTCOME_DURATION = 1000;

export class SubmissionsView extends React.Component<{}, SubmissionsViewState> {
    state: SubmissionsViewState = {
        queueItems: [],
        simulatingItemIndex: 0,
        levelClosed: false,
        startingStepIndex: 0,
        simulationSpeed: 4,
    };

    async componentDidMount() {
        const sheet = new Image();
        sheet.onload = () => this.setState({ spritesheet: sheet });
        sheet.src = spritesheet;

        const submissionsResponse = await api.GetSubmissions();
        const queueItems = submissionsResponse.submissions.map(s => ({
            submission: s,
            state: QueueItemState.WAITING
        }));
        this.setState({
            queueItems,
            level: submissionsResponse.level,
            levelClosed: submissionsResponse.levelClosed
        }, () => {
            this.setSimulationIndex(0);
            this.loadSubmissionDetails();
        });

        setInterval(() => this.pollSubmissions(), POLL_PERIOD);
    }

    async pollSubmissions() {
        console.log("Polling for new submissions...");
        const existingSubmissionIds = this.state.queueItems.map(item => item.submission.id);
        const submissions = await api.GetSubmissions();

        this.setState({
            levelClosed: submissions.levelClosed,
            level: submissions.level,
        });

        if (!existingSubmissionIds.every(id => submissions.submissions.map(s => s.id).includes(id))) {
            // Not all saved IDs are contained in this response -- this is a new level
            console.log("New level detected");
            this.setState({
                queueItems: submissions.submissions.map(s => ({
                    submission: s,
                    state: QueueItemState.WAITING,
                })),
                simulatingItemIndex: 0,
            }, () => {
                this.loadSubmissionDetails();
            });
            return;
        }
        const newSubmissions = submissions.submissions.filter(s => !existingSubmissionIds.includes(s.id));
        if (newSubmissions.length > 0) {
            console.log(`Found ${newSubmissions.length} new submissions. Updating...`)
            const newItems = newSubmissions.map(s => ({
                submission: s,
                state: QueueItemState.WAITING,
            }));
            this.setState({
                queueItems: this.state.queueItems.concat(newItems)
            }, () => {
                if (!this.isSimulating()) {
                    this.setSimulationIndex(this.state.simulatingItemIndex);
                }
                this.loadSubmissionDetails();
            });
        }
        console.log("Poll finished");
    }

    isSimulating() {
        return this.state.simulatingItemIndex < this.state.queueItems.length;
    }

    setItemSimulationState(items: QueueItem[], simulationIndex: number) {
        if (simulationIndex >= items.length) {
            return items.map(item => ({
                ...item,
                state: QueueItemState.DONE
            }));
        }
        const before = items.slice(0, simulationIndex).map(item => ({
            ...this.deepCopy(item),
            state: QueueItemState.DONE,
        }));
        const simulating = { ...this.deepCopy(items[simulationIndex]), state: QueueItemState.SIMULATING };
        const after = items.slice(simulationIndex + 1).map(item => ({
            ...this.deepCopy(item),
            state: QueueItemState.WAITING
        }));
        return before.concat([simulating]).concat(after);
    }

    deepCopy(item: QueueItem) {
        let details: SubmissionDetailsResponse | undefined = undefined;
        if (item.details) {
            details = {
                initialState: { ...item.details.initialState },
                outcome: item.details.outcome,
                steps: item.details.steps.map(x => ({ ...x }))
            }
        }
        const newItem: QueueItem = {
            state: item.state,
            submission: { ...item.submission },
            details: details
        };
        return newItem;
    }

    loadSubmissionDetails() {
        this.state
            .queueItems
            .filter(item => item.details === undefined)
            .forEach(async (item) => {
                const details = await api.GetSubmissionDetails(item.submission.id);
                const newItems = this.state.queueItems.map(i => {
                    if (i.submission.id !== item.submission.id) {
                        return i;
                    }
                    return { ...i, details };
                });
                this.setState({ queueItems: newItems });
            });
    }

    simulateNext() {
        if (this.state.activeTimeout) {
            clearTimeout(this.state.activeTimeout);
            this.setState({ activeTimeout: undefined });
        }
        let newItems = this.state.queueItems.slice(0);
        newItems[this.state.simulatingItemIndex].state = QueueItemState.SHOW_OUTCOME;
        this.setState({
            queueItems: newItems,
            activeTimeout: setTimeout(() => {
                newItems = newItems.slice(0);
                newItems[this.state.simulatingItemIndex].state = QueueItemState.DONE;
                this.setState({
                    queueItems: newItems,
                    simulatingItemIndex: this.state.simulatingItemIndex + 1,
                    startingStepIndex: 0,
                }, () => this.setSimulationIndex(this.state.simulatingItemIndex));
            }, SHOW_OUTCOME_DURATION)
        });

    }

    setSimulationIndex(i: number) {
        if (i >= this.state.queueItems.length) {
            i = this.state.queueItems.length;
        }
        if (i < 0) {
            i = 0;
        }
        if (this.state.activeTimeout) {
            clearTimeout(this.state.activeTimeout);
            this.setState({ activeTimeout: undefined });
        }
        this.setState({
            simulatingItemIndex: i,
            queueItems: this.setItemSimulationState(this.state.queueItems, i),
            startingStepIndex: 0,
        });
    }

    fastForward() {
        if (this.state.simulatingItemIndex >= this.state.queueItems.length) {
            return;
        }
        /*const before = this.state.queueItems.slice(0, this.state.simulatingItemIndex);
        const simulating = {...this.state.queueItems[this.state.simulatingItemIndex]};
        const after = this.state.queueItems.slice(this.state.simulatingItemIndex+1);
        if (simulating.details) {
            simulating.details = {
                ...simulating.details,
                steps: [simulating.details.steps[simulating.details.steps.length-1]]
                // ^ This is bad - it deletes steps, so it becomes impossible to come back to the simulation from the beginning
            }
        }
        this.setState({queueItems: before.concat([simulating]).concat(after)});*/
        const simulating = this.state.queueItems[this.state.simulatingItemIndex];
        if (simulating.details) {
            this.setState({ startingStepIndex: simulating.details.steps.length - 1 });
        }
    }

    setSimulationSpeed(speed: number) {
        this.setState({ simulationSpeed: speed });
    }

    renderSimulation(spritesheet: HTMLImageElement, onSimulationEnd: () => void, speed: number, onSpeedChange: (s: number) => void, submissionsBlocked: boolean, currentQueueItem?: QueueItem) {
        return (
            <div className="container-fluid" id="submissions-view-container">
                <div className="row">
                    <div className="col-3" id="submissions-queue-container">
                        <SubmissionQueueControls
                            onPrevious={() => this.setSimulationIndex(this.state.simulatingItemIndex - 1)}
                            onNext={() => this.setSimulationIndex(this.state.simulatingItemIndex + 1)}
                            onFastForward={() => this.fastForward()}
                            speed={speed}
                            onSpeedChange={onSpeedChange}
                        />
                        <SubmissionQueue
                            items={this.state.queueItems.slice(this.state.simulatingItemIndex)}
                            submissionsBlocked={submissionsBlocked}
                        />
                    </div>
                    <div className="col-9" id="simulation-container">
                        {currentQueueItem && currentQueueItem.details
                            ?
                            <Simulation
                                initialState={currentQueueItem.details.initialState}
                                onSimulationEnd={onSimulationEnd}
                                speed={speed}
                                spritesheet={spritesheet}
                                steps={currentQueueItem.details.steps}
                                startingStep={this.state.startingStepIndex}
                            />
                            : <Loader />
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderScoreboard() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3" id="submissions-queue-container">
                        <SubmissionQueueControls
                            onPrevious={() => this.setSimulationIndex(this.state.simulatingItemIndex - 1)}
                            onNext={() => this.setSimulationIndex(this.state.simulatingItemIndex + 1)}
                            onFastForward={() => this.fastForward()}
                            speed={this.state.simulationSpeed}
                            onSpeedChange={speed => this.setSimulationSpeed(speed)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" id="simulation-container">
                        <ScoreboardView />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (!this.state.spritesheet) {
            return <Loader />;
        }
        if (!this.state.level) {
            return <Loader />;
        }
        if (this.state.simulatingItemIndex >= this.state.queueItems.length) {
            if (this.state.levelClosed) {
                return this.renderScoreboard();
            }
            const staticItem: QueueItem = {
                details: {
                    initialState: this.state.level,
                    steps: [{ objects: this.state.level.objects }],
                    outcome: Outcome.success
                },
                state: QueueItemState.SIMULATING,
                submission: { id: -1, user: "none" }
            }
            return this.renderSimulation(
                this.state.spritesheet,
                () => { },
                this.state.simulationSpeed,
                speed => this.setSimulationSpeed(speed),
                false,
                staticItem
            );
        }
        const currentQueueItem =
            this.state.simulatingItemIndex < this.state.queueItems.length
                ? this.state.queueItems[this.state.simulatingItemIndex]
                : undefined;
        if (this.state.levelClosed && this.state.simulatingItemIndex < this.state.queueItems.length) {
            // Level is closed and queue is not empty
            return this.renderSimulation(
                this.state.spritesheet,
                () => this.simulateNext(),
                this.state.simulationSpeed,
                speed => this.setSimulationSpeed(speed),
                true,
                currentQueueItem
            );
        }
        return this.renderSimulation(
            this.state.spritesheet,
            () => this.simulateNext(),
            this.state.simulationSpeed,
            speed => this.setSimulationSpeed(speed),
            false,
            currentQueueItem
        );
    }
}
