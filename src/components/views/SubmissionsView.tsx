import { faArrowDown, faArrowUp, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import * as api from "../../api/Api";
import { Level, Outcome } from "../../api/Contracts";
import spritesheet from "../../assets/spritesheet.png";
import "../../styles/submissions-view.css";
import { Loader } from "../Loader";
import { Simulation } from "../simulation/Simulation";
import { QueueItem, QueueItemState, SubmissionQueue } from "../SubmissionQueue";
import { ScoreboardView } from "./ScoreboardView";

interface SubmissionsViewState {
    spritesheet?: HTMLImageElement;
    queueItems: QueueItem[];
    level?: Level;
    levelClosed: boolean;
    simulatingItemIndex: number;
    activeTimeout?: NodeJS.Timeout;
}

const POLL_PERIOD = 2000;
const SHOW_OUTCOME_DURATION = 3000;

export class SubmissionsView extends React.Component<{}, SubmissionsViewState> {
    state: SubmissionsViewState = {
        queueItems: [],
        simulatingItemIndex: 0,
        levelClosed: false
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
        if (!existingSubmissionIds.every(id => submissions.submissions.map(s => s.id).includes(id))) {
            // Not all saved IDs are contained in this response -- this is a new level
            console.log("New level detected");
            // TODO: switch levels
            return;
        }
        const newSubmissions = submissions.submissions.filter(s => !existingSubmissionIds.includes(s.id));
        if (newSubmissions.length > 0) {
            console.log(`Found ${newSubmissions.length} new submissions. Updating...`)
            const newItems = newSubmissions.map(s => ({
                submission: s,
                state: QueueItemState.WAITING
            }));
            this.setState({
                queueItems: this.state.queueItems.concat(newItems)
            }, () => {
                this.setSimulationIndex(this.state.simulatingItemIndex);
                this.loadSubmissionDetails();
            });
        }
        console.log("Poll finished");
    }

    setItemSimulationState(items: QueueItem[], simulationIndex: number) {
        if (simulationIndex >= items.length) {
            return items.map(item => ({
                ...item,
                state: QueueItemState.DONE
            }));
        }
        const before = items.slice(0, simulationIndex).map(item => ({
            ...item,
            state: QueueItemState.DONE
        }));
        const simulating = { ...items[simulationIndex], state: QueueItemState.SIMULATING };
        const after = items.slice(simulationIndex + 1).map(item => ({
            ...item,
            state: QueueItemState.WAITING
        }));
        return before.concat([simulating]).concat(after);
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
        }
        let newItems = this.state.queueItems.slice(0);
        newItems[this.state.simulatingItemIndex].state = QueueItemState.SHOW_OUTCOME;
        this.setState({
            queueItems: newItems,
            activeTimeout: setTimeout(() => {
                newItems = newItems.slice(0);
                newItems[this.state.simulatingItemIndex].state = QueueItemState.DONE;
                this.setState({ queueItems: newItems, simulatingItemIndex: this.state.simulatingItemIndex + 1 }, () => this.setSimulationIndex(this.state.simulatingItemIndex));
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
            queueItems: this.setItemSimulationState(this.state.queueItems, i)
        });
    }

    renderSimulation(spritesheet: HTMLImageElement, onSimulationEnd: () => void, speed: number, currentQueueItem?: QueueItem) {
        return (
            <div className="container-fluid" id="submissions-view-container">
                <div className="row">
                    <div className="col-3" id="submissions-queue-container">
                        <div className="btn-group submission-queue-controls" role="group">
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => this.setSimulationIndex(this.state.simulatingItemIndex - 1)}
                            >
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => this.setSimulationIndex(this.state.simulatingItemIndex + 1)}
                            >
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => this.simulateNext()}
                            >
                            <FontAwesomeIcon icon={faForward} />
                            </button>
                        </div>
                        <SubmissionQueue items={this.state.queueItems.slice(this.state.simulatingItemIndex)} />
                    </div>
                    <div className="col-9" id="simulation-container">
                        {
                            currentQueueItem && currentQueueItem.details
                                ?
                                <Simulation
                                    initialState={currentQueueItem.details.initialState}
                                    onSimulationEnd={onSimulationEnd}
                                    speed={speed}
                                    spritesheet={spritesheet}
                                    steps={currentQueueItem.details.steps}
                                />
                                : <Loader />
                        }
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
            if(this.state.levelClosed) {
                return <ScoreboardView />;
            }
            const staticItem: QueueItem = {
                details: {
                    initialState: this.state.level,
                    steps: [{objects: this.state.level.objects}],
                    outcome: Outcome.success
                },
                state: QueueItemState.SIMULATING,
                submission: {id: -1, user: "none"}
            }
            return this.renderSimulation(this.state.spritesheet, ()=>{}, 0, staticItem);
        }
        const currentQueueItem =
            this.state.simulatingItemIndex < this.state.queueItems.length
                ? this.state.queueItems[this.state.simulatingItemIndex]
                : undefined;
        return this.renderSimulation(this.state.spritesheet, ()=>this.simulateNext(), 10, currentQueueItem);
    }
}
