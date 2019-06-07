import React from "react";
import { Outcome, Submission, SubmissionDetailsResponse } from "../api/Contracts";

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
    const text = `${item.submission.id}. ${item.submission.user}`;
    const classes = ["list-group-item"];
    if (item.details && item.state === QueueItemState.SIMULATING) {
        classes.push("list-group-item-primary");
    }
    if (item.details && item.state === QueueItemState.SHOW_OUTCOME) {
        if (item.details.outcome === Outcome.success) {
            classes.push("list-group-item-success");
        } else if(item.details.outcome === Outcome.fail) {
            classes.push("list-group-item-danger");
        } else {
            classes.push("list-group-item-warning");
        }
    }
    return <li className={classes.join(" ")} key={item.submission.id}>{text}</li>;
}

export const SubmissionQueue = ({ items }: SubmissionQueueProps) => (
    items.length === 0
        ? <p>Queue is empty :)</p>
        : (
            <ul className="list-group">
                {items.map(renderQueueItem)}
            </ul>
        )
);
