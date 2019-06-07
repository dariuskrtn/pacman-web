import React from "react";
import * as api from "../../api/Api";
import { Scoreboard } from "../../api/Contracts";
import { ScoreboardTable } from "../ScoreboardTable";
import { Loader } from "../Loader";

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
            return <Loader />;
        }
        if (this.state.scoreboards.length === 0) {
            return <p>No scoreboards available</p>;
        }
        return <div className="row">
                    {this.state.scoreboards.map((s, i) => (
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-1" />
                                <div className="col-md-10">
                                    <ScoreboardTable key={i} scoreboard={s} />
                                </div>
                                <div className="col-md-1" />
                            </div>
                        </div>
                    ))}
                </div>;
    }
}