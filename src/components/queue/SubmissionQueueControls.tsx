import { faArrowDown, faArrowUp, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SubmissionQueueControlsProps {
    onPrevious: () => void;
    onNext: () => void;
    onFastForward: () => void;
    speed: number;
    onSpeedChange: (newSpeed: number) => void;
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
        <input
            type="range"
            className="custom-range speed-input"
            min={1}
            max={99}
            step={1}
            value={props.speed}
            onChange={e => props.onSpeedChange(+e.target.value)}
        />
        <button disabled type="button" className="btn btn-light">speed: {props.speed.toString().padStart(2, "0")}</button>
    </div>
);
