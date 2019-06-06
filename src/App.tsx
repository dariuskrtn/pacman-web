import React, { useState, useEffect } from "react";
import * as Api from "./api/Api";
import * as submissions from "./api/Contracts";
import "./App.css";
import { Simulation } from "./components/simulation/Simulation";
import spritesheet from "./assets/spritesheet.png";
import logo from "./logo.svg";
import { submissionDetails, submissionDetails2 } from "./mocks/apiResponses";
import { SubmitProgram } from "./components/submitProgram/SubmitProgram";
import { SubmissionsView } from "./components/views/SubmissionsView";


const sheet = new Image();

var currSubmission = 0;
var submissionCount = 0;
var submissionsRequested = false;



const App: React.FC = () => {
    return <SubmissionsView />;
    // const [outcome, setOutcome] = useState(submissions.Outcome.fail);
    // const [isLoading, setIsLoading] = useState(true);
    // const [sprites, setSprites] = useState(new Image());

    // const [simulation, setSimulation] = useState((<div></div>));

    // function simulateNextSubmission() {
    //     if (currSubmission === submissionCount) {
    //         return;
    //     }
    //     Api.GetSubmissionDetails(currSubmission).then(submissionDetails => {
    //         setSimulation(<div></div>);
    //         setSimulation(
    //             <div>
    //                 <div>{currSubmission}</div>
    //                 <Simulation
    //                     initialState={submissionDetails.initialState}
    //                     speed={10}
    //                     steps={submissionDetails.steps}
    //                     onSimulationEnd={() => simulateNextSubmission()}
    //                     spritesheet={sprites}
    //                 />
    //             </div>
    //         );

    //     });
    //     currSubmission++;
    // }

    // // Load resources
    // sheet.onload = () => {
    //     setIsLoading(false);
    //     setSprites(sheet);

    //     if (!isLoading && !submissionsRequested) {
    //         submissionsRequested = true;
    //         Api.GetSubmissions().then(submissions => {
    //             submissionCount = submissions.submissions.length;
    //             simulateNextSubmission();
    //         });

    //     }
    // }
    // sheet.src = spritesheet;

    // if (isLoading) {
    //     return <div>Loading</div>;
    // }

    // return (
    //     <div className="App">
    //         {simulation}
    //         <SubmitProgram username="labas" password="rytas" />
    //     </div>
    // );
};

export default App;
