import React from "react";
import { Scoreboard } from "../api/Contracts";

interface ScoreboardProps {
    scoreboard: Scoreboard;
}

// TODO: styling
export const ScoreboardTable = (props: ScoreboardProps) => (
    <div>
        <h2>{props.scoreboard.title}</h2>
        <table style={{ border: "1px solid black" }}>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Solved</th>
                    <th>Penalty</th>
                </tr>
            </thead>
            <tbody>
                {props.scoreboard.entries.map((row, i) => (
                    <tr key={i}>
                        <td>{row.user}</td>
                        <td>{row.solved}</td>
                        <td>{row.tieBreaker}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
