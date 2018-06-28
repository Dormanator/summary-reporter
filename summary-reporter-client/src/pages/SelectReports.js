import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/hocs/Container";
import Row from "../components/hocs/Row";
import SelectInput from "../components/SelectInput";
import Btn from "../components/Btn";
import Style from "./selectReports/SelectReports.css";

class SelectReports extends Component {
  state = {
    selectedReports: this.props.reports ? [...this.props.reports] : []
  };

  handleSubmit = e => {
    const { settings, grabReports, grabErrors, history } = this.props;
    e.preventDefault();
    const valid = this.state.selectedReports.length > 0;
    if (valid) {
      grabReports(this.state.selectedReports);
      history.push("/reports");
    } else {
      grabErrors(
        `Make sure you select the ${settings.nameLabel ||
          "Name"}(s) you would like to generate reports for.`
      );
    }
  };

  handleChange = e => {
    const target = e.target.value,
      selected = this.state.selectedReports.includes(target);
    if (selected) {
      this.setState((prevState, props) => {
        return {
          selectedReports: [...prevState.selectedReports].filter(
            x => x !== target
          )
        };
      });
    } else {
      this.setState((prevState, props) => {
        return { selectedReports: [...prevState.selectedReports, target] };
      });
    }
  };

  handleSelectAll = e => {
    e.preventDefault();
    const allEntries = Object.keys(this.props.data);
    this.setState({ selectedReports: allEntries });
  };

  render() {
    const { data, settings } = this.props,
      entryList = Object.keys(data),
      nameRef = settings.nameLabel || "Name",
      optionsLabels = entryList.map(entry => data[entry].headers[nameRef]);

    return (
      <Container
        title="Selection"
        subtitle={`Select the ${nameRef}(s) you would like reports for:`}
      >
        <form className={Style.root}>
          <SelectInput
            multi={true}
            name={"selectReports"}
            value={this.state.selectedReports}
            grabChange={this.handleChange}
            options={data}
            optionsLabels={optionsLabels}
            all={this.handleSelectAll}
          />
        </form>
        <Row modifiers={["marginMedTop", "flex", "justifySpaceBetween"]}>
          <Btn back>Back</Btn>
          <Btn onClick={this.handleSubmit}>Create Reports</Btn>
        </Row>
      </Container>
    );
  }
}

SelectReports.propTypes = {
  data: PropTypes.object,
  reports: PropTypes.array,
  settings: PropTypes.object,
  grabReports: PropTypes.func,
  grabErrors: PropTypes.func
};

export default SelectReports;
