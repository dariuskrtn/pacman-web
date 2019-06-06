import React from "react";
import { RuleComponent } from "./RuleComponent";
import { Move, RuleState, Rule } from "../../api/Contracts";
import * as Api from "./../../api/Api";

interface SubmitProgramProps {
    username: string,
    password: string
}

interface SubmitProgramState {
  rules: KeyedRule[]
}

interface KeyedRule {
  key: number;
  rule: Rule;
}

let counter = 0;

export class SubmitProgram extends React.Component<SubmitProgramProps, SubmitProgramState> {

    constructor(props: SubmitProgramProps) {
        super(props);
        this.state = {
          rules: [],
        }
    }

    getEmptyRule() {
      return {
        key: counter++,
        rule: {
          currentState:  null,
          down: null,
          up: null,
          left: null,
          right: null,
          nextMove: Move.wait,
          nextState: RuleState.a,
          berry: null,
        }
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
      console.log(id);
      const rules = [...this.state.rules];
      
      rules.splice(rules.findIndex(r => r.key === id), 1);

      this.setState({
        rules,
      });
    }

    updateRule(rule: Rule, id: number) {
      const rules = this.state.rules;
      const idd = rules.findIndex(r => r.key === id);
      rules[idd] = {
        key: rules[idd].key,
        rule: rule,
      }
      this.setState({
        rules,
      });
      console.log(rules);
    }

    submitProgram() {
      Api.SubmitProgram({
        user: this.props.username,
        password: this.props.password,
        program: {
          rules: this.state.rules.map(ruleKey => ruleKey.rule)
        }
      }).then((response: any) => {
        console.log(response);
      })
    }

    render() {
      return (
        <div>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              {this.state.rules.map(rulee => {
                return (
                <div key={rulee.key}>
                  <RuleComponent
                    key={rulee.key}
                    rule={rulee.rule}
                    onChange={rule => this.updateRule(rule, rulee.key)}
                    onDelete={() => this.removeRule(rulee.key)}
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
              <button onClick={() => this.addRule()} type="button" className="btn btn-primary">Add Rule</button><br/>
              <button onClick={() => this.submitProgram()} type="button" className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
      );
    }
  }