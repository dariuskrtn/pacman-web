import React, { useState } from "react";
import * as Api from "./api/Api";
import * as submissions from "./api/Contracts";
import "./App.css";
import { Simulation } from "./components/simulation/Simulation";
import { submissionDetails, submissionDetails2 } from "./mocks/apiResponses";
import spritesheet from "./assets/spritesheet.png";

const sheet = new Image();

const App: React.FC = () => {
    const [outcome, setOutcome] = useState(submissions.Outcome.fail);
    const [isLoading, setIsLoading] = useState(true);
    const [sprites, setSprites] = useState(new Image());

    Api.GetScoreboards().then(response => {
        console.log(response);

        console.log(outcome === submissions.Outcome.success);
    });

    // Load resources
    sheet.onload = () => {
        setIsLoading(false);
        setSprites(sheet);
    }
    sheet.src = spritesheet;

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                {outcome}
            </header>
            <Simulation
                initialState={submissionDetails2.initialState}
                speed={2}
                steps={submissionDetails2.steps}
                onSimulationEnd={() => alert("DONE")}
                spritesheet={sprites}
            />
        </div>
    );
};

export default App;
