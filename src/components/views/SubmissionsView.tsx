import React from "react";
import { Submission, SubmissionDetailsResponse, Level } from "../../api/Contracts";
import spritesheet from "../../assets/spritesheet.png";
import * as api from "../../api/Api";
import { SubmissionQueue, QueueItem, QueueItemState } from "../SubmissionQueue";
import { Simulation } from "../simulation/Simulation";

interface SubmissionsViewState {
    spritesheet?: HTMLImageElement;
    queueItems: QueueItem[];
    level?: Level;
}

const POLL_PERIOD = 2000;
const SHOW_OUTCOME_DURATION = 1000;

export class SubmissionsView extends React.Component<{}, SubmissionsViewState> {
    state: SubmissionsViewState = {
        queueItems: []
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
            level: submissionsResponse.level
        }, this.loadSubmissionDetails.bind(this));

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
            }, this.loadSubmissionDetails.bind(this));
        }
        console.log("Poll finished");
    }

    loadSubmissionDetails() {
        this.state
            .queueItems
            .filter(item => item.state === QueueItemState.WAITING)
            .filter(item => item.details === undefined)
            .forEach(async (item) => {
                const details = await api.GetSubmissionDetails(item.submission.id);
                const newItems = this.state.queueItems.map(i => {
                    if (i.submission.id !== item.submission.id) {
                        return i;
                    }
                    return { ...i, details };
                });
                this.setSubmissionToSimulate(newItems);
                this.setState({ queueItems: newItems });
            });
    }

    setSubmissionToSimulate(items: QueueItem[]) {
        const anySimulating = items.some(i => i.state === QueueItemState.SIMULATING);
        if (!anySimulating) {
            const item = items.filter(i => i.state === QueueItemState.WAITING)[0];
            if (item) {
                item.state = QueueItemState.SIMULATING;
            }
        }
    }

    simulateNext() {
        let newItems = this.state.queueItems.map(item =>
            item.state === QueueItemState.SIMULATING
                ? { ...item, state: QueueItemState.SHOW_OUTCOME }
                : item
        );
        this.setState({ queueItems: newItems });
        setTimeout(() => {
            newItems = this.state.queueItems.map(item =>
                item.state === QueueItemState.SHOW_OUTCOME
                    ? { ...item, state: QueueItemState.DONE }
                    : item
            );
            this.setSubmissionToSimulate(newItems);
            this.setState({ queueItems: newItems });
        }, SHOW_OUTCOME_DURATION);
    }

    render() {
        if (!this.state.spritesheet) {
            return <p>Loading resources...</p>;
        }
        if (!this.state.level) {
            return <p>Loading submissions...</p>;
        }
        const currentQueueItem =
            this.state
                .queueItems
                .filter(item => item.details !== undefined)
                .filter(item => item.state === QueueItemState.SIMULATING || item.state === QueueItemState.SHOW_OUTCOME)[0];
        return (
            <div>
                <SubmissionQueue items={this.state.queueItems} />
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
        );
    }
}
