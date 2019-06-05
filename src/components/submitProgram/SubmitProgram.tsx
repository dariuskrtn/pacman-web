import React from "react";
import { RuleComponent } from "./RuleComponent";
import { Move, RuleState, Rule } from "../../api/Contracts";

interface SubmitProgramProps {
    username: string,
    password: string
}

interface SubmitProgramState {
  rules: Rule[]
}

export class SubmitProgram extends React.Component<SubmitProgramProps, SubmitProgramState> {

    constructor(props: SubmitProgramProps) {
        super(props);
        this.state = {
          rules: [],
        }
    }

    getEmptyRule() {
        return {
            currentState:  RuleState.b,
            down: null,
            up: null,
            left: null,
            right: null,
            nextMove: Move.wait,
            nextState: RuleState.a,
            berry: null,
        }
    }

    addRule() {
      const rules = this.state.rules;
      rules.push(this.getEmptyRule());
      this.setState({
        rules,
      });
    }

    removeRule(id: number) {
      //TODO: fix this
      const rules = this.state.rules;
      rules.splice(id, 1);
      this.setState({
        rules,
      });
    }

    updateRule(rule: Rule, id: number) {
      const rules = this.state.rules;
      rules[id] = rule;
      this.setState({
        rules,
      });
    }

    render() {
      return (
        <div>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              {this.state.rules.map((rule, i) => {
                return (
                <div key={i}>
                  <RuleComponent
                    key={i}
                    rule={this.getEmptyRule()}
                    onChange={rule => this.updateRule(rule, i)}
                    onDelete={() => this.removeRule(i)}
                  />
                  <br/>
                </div>
                )
              })}
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-5" />
            <div className="col-md-1">
              <button onClick={() => this.addRule()} type="button" className="btn btn-primary">Add Rule</button>
            </div>
          </div>
        </div>
      );
    }
  }