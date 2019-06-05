import React, { useState, useEffect } from "react";
import * as Api from "./api/Api";
import * as submissions from "./api/Contracts";
import "./App.css";
import { Simulation } from "./components/simulation/Simulation";
import spritesheet from "./assets/spritesheet.png";

const sheet = new Image();

var currSubmission = 0;
var submissionCount = 0;
var submissionsRequested = false;

const App: React.FC = () => {
    const [outcome, setOutcome] = useState(submissions.Outcome.fail);
    const [isLoading, setIsLoading] = useState(true);
    const [sprites, setSprites] = useState(new Image());

    const [simulation, setSimulation] = useState((<div></div>));

    function simulateNextSubmission() {
        if (currSubmission === submissionCount) {
            return;
        }
        Api.GetSubmissionDetails(currSubmission).then(submissionDetails => {
            setSimulation(<div></div>);
            setSimulation(
                <div>
                    <div>{currSubmission}</div>
                    <Simulation
                        initialState={submissionDetails.initialState}
                        speed={2}
                        steps={submissionDetails.steps}
                        onSimulationEnd={() => simulateNextSubmission()}
                        spritesheet={sprites}
                    />
                </div>
            );

        });
        currSubmission++;
    }

    // Load resources
    sheet.onload = () => {
        setIsLoading(false);
        setSprites(sheet);

        if (!isLoading && !submissionsRequested) {
            submissionsRequested = true;
            Api.GetSubmissions().then(submissions => {
                submissionCount = submissions.submissions.length;
                simulateNextSubmission();
            });

        }
    }
    sheet.src = spritesheet;

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="App">
            {simulation}
        </div>
    );
};

export default App;
