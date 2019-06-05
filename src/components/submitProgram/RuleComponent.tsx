import React from "react";
import { Rule, Move, RuleState, RuleCell, RuleBerry } from "../../api/Contracts";
import './ruleComponent.css'
import { number } from "prop-types";
import { StateButton } from "./buttons/StateButton";

interface RuleComponentProps {
  rule: Rule,
  onChange: (rule: Rule) => void;
  onDelete: () => void;
}

interface RuleComponentState {
  rule: Rule;
}

export class RuleComponent extends React.Component<RuleComponentProps, RuleComponentState> {

    constructor(props: RuleComponentProps) {
        super(props);
        this.state = {
          rule: this.props.rule,
        };
        this.props.onChange(this.state.rule);
    }

    setCurrentRuleState(state: RuleState | null) {
      const rule = this.state.rule;
      rule.currentState = state;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setDown(ruleCell: RuleCell | null) {
      const rule = this.state.rule;
      rule.down = ruleCell;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setUp(ruleCell: RuleCell | null) {
      const rule = this.state.rule;
      rule.up = ruleCell;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setLeft(ruleCell: RuleCell | null) {
      const rule = this.state.rule;
      rule.left = ruleCell;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setRight(ruleCell: RuleCell | null) {
      const rule = this.state.rule;
      rule.right = ruleCell;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setBerry(berry: RuleBerry | null) {
      const rule = this.state.rule;
      rule.berry = berry;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setNextState(state: RuleState) {
      const rule = this.state.rule;
      rule.nextState = state;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    setNextMove(move: Move) {
      const rule = this.state.rule;
      rule.nextMove = move;
      this.setState({
        rule,
      });
      this.props.onChange(rule);
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-2">
            <div className="row high" />
            <div className="row">
              <div className="col-md-12">
                <StateButton
                  renders={Object.keys(RuleState)}
                  states={Object.values(RuleState)}
                  isNullable={true}
                  onChange={state => this.setCurrentRuleState(state)}
                />
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <StateButton
                renders={Object.keys(RuleCell)}
                states={Object.values(RuleCell)}
                isNullable={true}
                onChange={state => this.setUp(state)}
              />
            </div>
            <div className="col-md-4" />
            </div>

            <div className="row">
            <div className="col-md-4">
              <StateButton
                  renders={Object.keys(RuleCell)}
                  states={Object.values(RuleCell)}
                  isNullable={true}
                  onChange={state => this.setLeft(state)}
                />
            </div>
            <div className="col-md-4">
              <StateButton
                  renders={[(<div>PACMAN</div>)]}
                  states={[1]}
                  isNullable={false}
                  onChange={state => {}}
                />
            </div>
            <div className="col-md-4">
              <StateButton
                  renders={Object.keys(RuleCell)}
                  states={Object.values(RuleCell)}
                  isNullable={true}
                  onChange={state => this.setRight(state)}
                />
            </div>
            </div>

            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <StateButton
                  renders={Object.keys(RuleCell)}
                  states={Object.values(RuleCell)}
                  isNullable={true}
                  onChange={state => this.setDown(state)}
                />
              </div>
              <div className="col-md-4" />
            </div>
          </div>


          <div className="col-md-2">
            <StateButton
                    renders={[("Berry")]}
                    states={[1]}
                    isNullable={false}
                    onChange={state => {}}
              />
              <StateButton
                  renders={Object.keys(RuleBerry)}
                  states={Object.values(RuleBerry)}
                  isNullable={true}
                  onChange={state => this.setBerry(state)}
              />
          </div>
          <div className="col-md-2">
            <div className="row">
            <div className="col-md-12">
                <StateButton
                    renders={Object.keys(Move)}
                    states={Object.values(Move)}
                    isNullable={false}
                    onChange={state => this.setNextMove(state)}
                />
              </div>
              <div className="col-md-12">
                <StateButton
                    renders={Object.keys(RuleState)}
                    states={Object.values(RuleState)}
                    isNullable={false}
                    onChange={state => this.setNextState(state)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-1">
            <div className="row high" />
            <div className="row">
              <div className="col-md-12">
                <StateButton
                    renders={["X"]}
                    states={[1]}
                    isNullable={false}
                    onChange={state => this.props.onDelete()}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }