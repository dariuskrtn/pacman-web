import axios from "axios";
import { AuthenticateRequest, ProgramRequest, ScoreboardResponse, SubmissionDetailsResponse, SubmissionsResponse, SubmitResponse } from "./Contracts";

const address = "";

export async function GetSubmissions(): Promise<SubmissionsResponse> {
    return (await axios.get(address + "/api/submissions")).data;
}

export async function GetSubmissionDetails(id: number): Promise<SubmissionDetailsResponse> {
    return (await axios.get(address + "/api/submissions/" + id)).data;
}

export async function GetScoreboards(): Promise<ScoreboardResponse> {
    return (await axios.get(address + "/api/scoreboard")).data;
}

export async function SubmitProgram(program: ProgramRequest): Promise<SubmitResponse> {
    return (await axios.post(address + "/api/submit", JSON.stringify(program), {
        headers: {
            'Content-Type': 'application/json',
        }
    })).data;
}

export async function Authenticate(auth: AuthenticateRequest): Promise<SubmitResponse> {
    return (await axios.post(address + "/api/authenticate", JSON.stringify(auth), {
        headers: {
            'Content-Type': 'application/json',
        }
    })).data;
}
