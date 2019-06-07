import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { SubmissionsView } from "./components/views/SubmissionsView";

const App = () => {
    return (
        <Router>
            <div>
                {/* <Header /> */}
                <Route exact={true} path="/" component={SubmissionsView} />
                {/* <Route path="/submit" component={NewProgramView} /> */}
                {/* <Route path="/scoreboard" component={ScoreboardView} /> */}
            </div>
        </Router>
    );
};

export default App;
