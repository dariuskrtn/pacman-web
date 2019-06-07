import { faArrowDown, faArrowUp, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SubmissionQueueControlsProps {
    onPrevious: () => void;
    onNext: () => void;
    onFastForward: () => void;
}

export const SubmissionQueueControls = (props: SubmissionQueueControlsProps) => (
    <div className="btn-group submission-queue-controls" role="group">
        <button
            type="button"
            className="btn btn-light"
            onClick={props.onPrevious}
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
            type="button"
            className="btn btn-light"
            onClick={props.onNext}
        >
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <button
            type="button"
            className="btn btn-light"
            onClick={props.onFastForward}
        >
            <FontAwesomeIcon icon={faForward} />
        </button>
    </div>
);
