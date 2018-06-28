import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/hocs/Container";
import Row from "../components/hocs/Row";
import InputGroup from "../components/InputGroup";
import Btn from "../components/Btn";
import Style from "./reportTargets/ReportTargets.css";

class ReportTargets extends Component {
  state = {
    targets: { ...this.props.settings.targets }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { grabTargets, history } = this.props;
    grabTargets(this.state.targets);
    history.push("/selection");
  };

  handleChange = e => {
    const target = e.target,
      group = target.parentNode.parentNode.parentNode.dataset;
    this.setState((prevState, props) => {
      return {
        targets: {
          ...prevState.targets,
          [group.name]: {
            ...prevState.targets[group.name],
            [target.name]: parseInt(target.value, 10)
          }
        }
      };
    });
  };

  render() {
    const { settings, data } = this.props,
      { targets } = this.state,
      entries = Object.keys(targets),
      nameRef = settings.nameLabel || "Name",
      inputGroups = entries.map(entry => {
        if (data[entry]) {
          const label = data[entry].headers[nameRef];
          return (
            <InputGroup
              key={entry}
              type={"number"}
              groupLabel={label}
              groupName={entry}
              groupData={this.state.targets}
              grabChange={this.handleChange}
              inputLabels={true}
            />
          );
        } else {
          return null;
        }
      });
    return (
      <Container
        title="Targets"
        subtitle={`Set targets for each ${nameRef}'s ${
          settings.reportBasis
        }(s)`}
      >
        <form className={Style.root}>{inputGroups}</form>
        <Row
          modifiers={[
            "marginMedTop",
            "marginMedBtm",
            "flex",
            "justifySpaceBetween"
          ]}
        >
          <Btn back>Back</Btn>
          <Btn onClick={this.handleSubmit}>Set Targets</Btn>
        </Row>
      </Container>
    );
  }
}

ReportTargets.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
  grabTargets: PropTypes.func
};

export default ReportTargets;
