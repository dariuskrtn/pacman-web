import { faBan, faClock } from "@fortawesome/free-solid-svg-icons";
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
    submissionsBlocked?: boolean;
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
            <h3 className="display-4">
                <small className="text-muted" style={{ marginRight: "10px" }}>#{item.submission.id}</small>
                {item.submission.user}
            </h3>
            <h3><small className="text-muted">{status}</small></h3>
        </li>
    );
};

const emptyQueueMessage = (
    <ul className="list-group">
        <li className="list-group-item list-group-item-light">
            <h3 className="display-5">
                <FontAwesomeIcon icon={faClock} style={{ marginRight: "10px" }} />
                Waiting for submissions
            </h3>
        </li>
    </ul>
);

const submissionsBlockedMessage = (
    <li className="list-group-item list-group-item-danger">
        <h3 className="display-5">
            <FontAwesomeIcon icon={faBan} style={{ marginRight: "10px" }} />
            No more submissions allowed
        </h3>
    </li>
);

export const SubmissionQueue = ({ items, submissionsBlocked }: SubmissionQueueProps) => (
    items.length === 0
        ? emptyQueueMessage
        : (
            <ul className="list-group">
                {submissionsBlocked
                    ? submissionsBlockedMessage
                    : null
                }
                {items.map(renderQueueItem)}
            </ul>
        )
);
