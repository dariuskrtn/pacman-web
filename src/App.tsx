import React, { useState } from 'react';
import * as Api from './api/Api';
import * as submissions from './api/Contracts';
import './App.css';
import { Simulation } from './components/simulation/Simulation';
import logo from './logo.svg';

const App: React.FC = () => {
  const [outcome, setOutcome] = useState(submissions.Outcome.fail);

  Api.GetScoreboards().then(response => {
      console.log(response);

      console.log(outcome == submissions.Outcome.success);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          { outcome }
        </a>
      </header>
      <Simulation />
    </div>
  );
}

export default App;
