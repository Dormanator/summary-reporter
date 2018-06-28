import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/hocs/Container";
import Row from "../components/hocs/Row";
import Info from "./reportSettings/Info";
import Settings from "./reportSettings/Settings";
import Btn from "../components/Btn";
import settingsDescriptions from "../modules/app/settingsDescriptions.json";

class ReportSettings extends Component {
  state = {
    allColumns: [],
    quantitativeCols: [],
    dataPoints: [],
    settings: { ...this.props.settings }
  };

  componentDidMount() {
    const { allColumns, quantitativeCols } = this.identifyData(this.props.data),
      dataPoints = this.checkExistingSettings(allColumns);
    this.setState({ allColumns, dataPoints, quantitativeCols });
  }

  identifyData(data) {
    const allColumns = [],
      quantitativeCols = [];
    data.forEach(entry => {
      for (let data in entry) {
        // make sure we don't get duplicates since we can allow multiple file uploads
        if (!allColumns.includes(data)) {
          allColumns.push(data);
        }
        // we also want a list of all the data points with numeric values that could be used for quantitative calulations
        if (!isNaN(entry[data]) && !quantitativeCols.includes(data)) {
          quantitativeCols.push(data);
        }
      }
    });
    return { allColumns, quantitativeCols };
  }

  checkExistingSettings(data) {
    const { settings } = this.props;
    let dataPoints = [];
    for (let prop in settings) {
      if (Array.isArray(settings[prop])) {
        settings[prop].forEach(
          // eslint-disable-next-line
          value => (dataPoints = validateDataPoint(data, value, dataPoints))
        );
      } else {
        dataPoints = validateDataPoint(data, settings[prop], dataPoints);
      }
    }
    return dataPoints;

    function validateDataPoint(data, value, dataPoints) {
      if (data.includes(value) && !dataPoints.includes(value)) {
        dataPoints.push(value);
      }
      return dataPoints;
    }
  }

  handleDataPointChange = newDataPoints => {
    this.setState({ dataPoints: newDataPoints });
  };

  handleSettingsChange = newSettings => {
    this.setState({ settings: newSettings });
  };

  handleSubmit = e => {
    e.preventDefault();
    // validate and throw errors with grabErrors
    const valid = this.validateSubmitted();
    if (valid) {
      const { grabSettings, history } = this.props;
      grabSettings(this.state.settings);
      history.push("/targets");
    }
  };

  validateSubmitted() {
    const { settings } = this.state,
      descriptions = { ...settingsDescriptions };
    for (let setting in settings) {
      if (
        descriptions[setting] &&
        descriptions[setting].required &&
        (settings[setting] === "" ||
          (Array.isArray(settings[setting]) &&
            (settings[setting].length === 0 ||
              settings[setting].some(value => value === ""))))
      ) {
        this.props.grabErrors(
          `Opps. Looks like you forgot to include a the proper values for "${setting
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, str =>
              str.toUpperCase()
            )}", a required input setting.`
        );
        return false;
      }
    }
    return true;
  }

  render() {
    const { settings, dataPoints, allColumns, quantitativeCols } = this.state,
      { data } = this.props,
      // bsed on which datapoints were selected and which of that data can be used in calculations, we establish teh report item options
      numericData = dataPoints.filter(x => quantitativeCols.includes(x)),
      numEntries = data.length,
      numPoints = allColumns.length;

    return (
      <Container
        title="Settings"
        subtitle="Prepare your settings for data summarization. This will tell us what to look for in your data, and how to use it when creating your summary reports."
      >
        <Info
          stats={{ numEntries, numPoints }}
          data={{ all: allColumns, selected: dataPoints }}
          grabChange={this.handleDataPointChange}
        />
        <div>
          {dataPoints.length > 3 ? (
            <Settings
              settings={settings}
              data={{ all: dataPoints, numeric: numericData }}
              grabChange={this.handleSettingsChange}
            />
          ) : (
            <h4>
              Please select from the {allColumns.length} data points above to
              help us find out what data you want in your report.
            </h4>
          )}
          <Row
            modifiers={[
              "marginMedTop",
              "marginMedBtm",
              "flex",
              "justifySpaceBetween"
            ]}
          >
            <Btn back>Back</Btn>
            <Btn onClick={this.handleSubmit}>Next</Btn>
          </Row>
        </div>
      </Container>
    );
  }
}

ReportSettings.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.object,
  grabSettings: PropTypes.func,
  grabErrors: PropTypes.func
};

export default ReportSettings;
