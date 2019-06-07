import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Outcome, Submission, SubmissionDetailsResponse } from "../../api/Contracts";

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

const outcomeToString = (outcome: Outcome) => {
    switch (outcome) {
        case Outcome.success:
            return "OK";
        case Outcome.fail:
            return "Failed";
        case Outcome.outOfMoves:
            return "Out of moves";
    }
};

// TODO: uzdet atitinkamas klases, kad paspalvintu or sth
const renderQueueItem = (item: QueueItem) => {
    const text = `${item.submission.id}. ${item.submission.user}`;
    const classes = ["list-group-item"];
    let status = "Judging";
    if (item.details && item.state === QueueItemState.SIMULATING) {
        classes.push("list-group-item-primary");
    }
    if (item.details && item.state === QueueItemState.SHOW_OUTCOME) {
        status = outcomeToString(item.details.outcome);
        if (item.details.outcome === Outcome.success) {
            classes.push("list-group-item-success");
        } else if (item.details.outcome === Outcome.fail) {
            classes.push("list-group-item-danger");
        } else {
            classes.push("list-group-item-warning");
        }
    }
    return (
        <li className={classes.join(" ")} key={item.submission.id}>
            <h3 className="display-4">{text}</h3>
            <h3><small className="text-muted">{status}</small></h3>
        </li>
    );
};

const emptyQueueMessage = (
    <ul className="list-group">
        <li className="list-group-item list-group-item-light">
            <h3 className="display-5">
                <FontAwesomeIcon icon={faClock} style={{marginRight: "10px"}} />
                Waiting for submissions
            </h3>
        </li>
    </ul>
);

export const SubmissionQueue = ({ items }: SubmissionQueueProps) => (
    items.length === 0
        ? emptyQueueMessage
        : (
            <ul className="list-group">
                {items.map(renderQueueItem)}
            </ul>
        )
);
