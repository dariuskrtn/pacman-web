import React from "react";
import { Scoreboard } from "../api/Contracts";

interface ScoreboardProps {
    scoreboard: Scoreboard;
}

// TODO: styling
export const ScoreboardTable = (props: ScoreboardProps) => (
    <div>
        <h2>{props.scoreboard.title}</h2>
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Solved</th>
                    <th scope="col">Penalty</th>
                </tr>
            </thead>
            <tbody>
                {props.scoreboard.entries.map((row, i) => (
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{row.user}</td>
                        <td>{row.solved}</td>
                        <td>{row.tieBreaker}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
