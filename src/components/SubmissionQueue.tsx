import React from "react";
import { Submission, SubmissionDetailsResponse } from "../api/Contracts";

export enum QueueItemState {
    WAITING = "WAITING",
    SIMULATING = "SIMULATING",
    SHOW_OUTCOME = "SHOW_OUTCOME",
    DONE = "DONE",
}

export interface QueueItem {
    submission: Submission;
    details?: SubmissionDetailsResponse;
    state: QueueItemState;
}

interface SubmissionQueueProps {
    items: QueueItem[];
}

// TODO: uzdet atitinkamas klases, kad paspalvintu or sth
const renderQueueItem = (item: QueueItem) => {
    let text = `${item.submission.id}. ${item.submission.user}`;
    if (item.details && (item.state === QueueItemState.SHOW_OUTCOME || item.state === QueueItemState.DONE)) {
        text += ` ${item.details.outcome}`;
    }
    if (item.details && item.state === QueueItemState.SIMULATING) {
        text += " vertinama...";
    }
    return <li key={item.submission.id}>{text}</li>;
}

export const SubmissionQueue = ({ items }: SubmissionQueueProps) => (
    items.length === 0
        ? <p>Queue is empty :)</p>
        : (
            <ul>
                {items.map(renderQueueItem)}
            </ul>
        )
);
