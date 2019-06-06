import React from "react";
import { SubmitProgram } from "../submitProgram/SubmitProgram";

export class NewProgramView extends React.Component<{}, never> {
    render() {
        return (
            <div>
                <h1>Pateikti programą</h1>
                <SubmitProgram username="labas" password="rytas" />
            </div>
        );
    }
}