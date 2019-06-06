import React from "react";
import { RuleState } from "../../../api/Contracts";

interface StateButtonProps {
  onChange: (ruleState: any | null) => void;
  states: any[];
  renders: any[];
  isNullable: boolean;
}

interface StateButtonState {
  currentState: any | null;
  currentRender: any;
}

export class StateButton extends React.Component<StateButtonProps, StateButtonState> {

    constructor(props: StateButtonProps) {
        super(props);
        this.state = {
            currentState: props.isNullable ? null : this.props.states[0],
            currentRender: props.isNullable ? null : this.props.renders[0],
        };
    }

    changeRuleCurrentState() {
      const currState = this.state.currentState;
      let nextState = null;
      let id = 0;

      if (this.props.isNullable) {
        if (currState === this.props.states[this.props.states.length - 1]) {
            nextState = null;
        } else if (currState === null) {
            nextState = this.props.states[0];
            id = 0;
        } else {
            nextState = this.props.states[this.props.states.lastIndexOf(currState) + 1];
            id = this.props.states.lastIndexOf(currState) + 1;
        }
      } else {
        if (currState === this.props.states[this.props.states.length - 1]) {
            nextState = this.props.states[0];
            id = 0;
        } else if (currState !== null) {
            nextState = this.props.states[this.props.states.lastIndexOf(currState) + 1];
            id = this.props.states.lastIndexOf(currState) + 1;
        }
      }

      this.setState({
        currentState: nextState,
        currentRender: this.props.renders[id]
      });
      this.props.onChange(nextState);
    }

    render() {
      return (
        <a className="btn btn-sq btn-success" onClick={this.changeRuleCurrentState.bind(this)}>
            {this.state.currentState === null ? "?" : this.state.currentRender}
        </a>
      );
    }
  }