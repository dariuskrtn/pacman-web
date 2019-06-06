import React from "react";
import { Scoreboard } from "../../api/Contracts";
import * as api from "../../api/Api";
import { ScoreboardTable } from "../ScoreboardTable";

interface ScoreboardViewState {
    scoreboards: Scoreboard[];
    isLoading: boolean;
}

export class ScoreboardView extends React.Component<{}, ScoreboardViewState> {
    state: ScoreboardViewState = {
        scoreboards: [],
        isLoading: true
    };

    async componentDidMount() {
        const scoreboardsResponse = await api.GetScoreboards();
        const scoreboards = scoreboardsResponse.scoreboards;
        this.setState({ scoreboards, isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        if (this.state.scoreboards.length === 0) {
            return <p>No scoreboards available</p>;
        }
        return this.state.scoreboards.map((s, i) => <ScoreboardTable key={i} scoreboard={s} />);
    }
}