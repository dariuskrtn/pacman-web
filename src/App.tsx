import React, { } from "react";
import "./App.css";
import { SubmissionsView } from "./components/views/SubmissionsView";
import { HashRouter as Router, Route } from "react-router-dom";
import { NewProgramView } from "./components/views/NewProgramView";
import { Header } from "./components/Header";

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={SubmissionsView} />
                <Route path="/submit" component={NewProgramView} />
            </div>
        </Router>
    )
};

export default App;
