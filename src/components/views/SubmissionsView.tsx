import React from "react";
import * as api from "../../api/Api";
import { Level } from "../../api/Contracts";
import spritesheet from "../../assets/spritesheet.png";
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

    render() {
        if (!this.state.spritesheet) {
            return <p>Loading resources...</p>;
        }
        if (!this.state.level) {
            return <p>Loading submissions...</p>;
        }
        if (this.state.simulatingItemIndex >= this.state.queueItems.length) {
            if(this.state.levelClosed) {
                return <ScoreboardView />;
            }
            return <Simulation
                        initialState={this.state.level}
                        onSimulationEnd={()=>{}}
                        speed={0}
                        spritesheet={this.state.spritesheet}
                        steps={[{objects: this.state.level.objects}]}
                    />;
        }
        const currentQueueItem =
            this.state.simulatingItemIndex < this.state.queueItems.length
                ? this.state.queueItems[this.state.simulatingItemIndex]
                : undefined;
        return (
            <div className="container-fluid" style={{border: "1px solid red"}}>
                <div className="row">
                    <div className="col-3">
                        <div>
                            <button onClick={() => this.setSimulationIndex(this.state.simulatingItemIndex - 1)}>Previous</button>
                            <button onClick={() => this.setSimulationIndex(this.state.simulatingItemIndex + 1)}>Next</button>
                            <button onClick={() => this.simulateNext()}> Skip to end</button>
                        </div>
                        <SubmissionQueue items={this.state.queueItems.slice(this.state.simulatingItemIndex)} />
                    </div>
                    <div className="col-9">
                        {
                            currentQueueItem && currentQueueItem.details
                                ?
                                <Simulation
                                    initialState={currentQueueItem.details.initialState}
                                    onSimulationEnd={() => this.simulateNext()}
                                    speed={10}
                                    spritesheet={this.state.spritesheet}
                                    steps={currentQueueItem.details.steps}
                                />
                                : <p>Loading simulation...</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
