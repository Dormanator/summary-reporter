import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import XLSX from "xlsx";
import Landing from "../Landing";
import Upload from "../Upload";
import ReportSettings from "../ReportSettings";
import SelectReports from "../SelectReports";
import ReportTargets from "../ReportTargets";
import Reports from "../Reports";
import StatusLog from "../StatusLog";
import ValidateRoute from "../../components/hocs/ValidateRoute";
import reportParser from "../../utils/reportParser";
import { prepareTargets } from "../../utils/prepareSettings";
import SETTINGS from "../../modules/app/defaultSettings.json";

class Main extends Component {
  state = {
    settings: SETTINGS,
    filesList: null,
    fileData: null,
    parsedData: null,
    reportsToShow: null
  };

  handleFileData = (excelFileArr, jsonFileArr, filesList) => {
    const { logErrors, grabErrors } = this.props;
    this.setState({ filesList });
    try {
      const excelDataArr = excelFileArr.map(file => {
          const workbook = XLSX.read(file, { type: "binary" });
          return XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );
        }),
        fileData = excelDataArr.reduce((a, b) => [...a, ...b], []);

      if (jsonFileArr.length > 0) {
        const jsonDataArr = jsonFileArr.map(file => JSON.parse(file)),
          settings = jsonDataArr.reduce((a, b) => {
            return { ...a, ...b };
          }, {});
        this.setState({ fileData, settings });
      } else {
        this.setState({ fileData, settings: SETTINGS });
      }
    } catch (err) {
      logErrors(err);
      grabErrors(
        "Opps. Something went wrong. Make sure you uploaded .xlsx/.xls files."
      );
    }
  };

  handleSettings = settings => {
    const { logErrors, grabErrors } = this.props;
    try {
      const parsedData = reportParser(this.state.fileData, settings);
      settings = prepareTargets(parsedData, settings);
      this.setState({ settings, parsedData });
    } catch (err) {
      logErrors(err);
      grabErrors(
        `Opps. Looks like we encountered an error when parsing your data based on your data and settings: ${err}.`
      );
    }
  };

  handleTargetSettings = targets => {
    this.setState((prevState, props) => {
      return {
        settings: { ...prevState.settings, targets }
      };
    });
  };

  handleReportSelection = reportArr => {
    this.setState({ reportsToShow: reportArr });
  };

  render() {
    const {
        settings,
        filesList,
        fileData,
        parsedData,
        reportsToShow
      } = this.state,
      { grabErrors } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/upload"
          render={props => (
            <Upload
              files={filesList}
              grabData={this.handleFileData}
              grabErrors={grabErrors}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/settings"
          render={props => (
            <ValidateRoute valid={fileData} altRoute="/upload">
              <ReportSettings
                data={fileData}
                settings={settings}
                grabSettings={this.handleSettings}
                grabErrors={grabErrors}
                {...props}
              />
            </ValidateRoute>
          )}
        />
        <Route
          exact
          path="/targets"
          render={props => (
            <ValidateRoute valid={parsedData} altRoute="/settings">
              <ReportTargets
                data={parsedData}
                settings={settings}
                grabTargets={this.handleTargetSettings}
                {...props}
              />
            </ValidateRoute>
          )}
        />
        <Route
          exact
          path="/selection"
          render={props => (
            <ValidateRoute valid={parsedData} altRoute="/settings">
              <SelectReports
                data={parsedData}
                reports={reportsToShow}
                settings={settings}
                grabReports={this.handleReportSelection}
                grabErrors={grabErrors}
                {...props}
              />
            </ValidateRoute>
          )}
        />
        <Route
          exact
          path="/reports"
          render={props => (
            <ValidateRoute valid={reportsToShow} altRoute="/selection">
              <Reports
                data={parsedData}
                reports={reportsToShow}
                settings={settings}
                grabErrors={grabErrors}
                {...props}
              />
            </ValidateRoute>
          )}
        />
        <Route
          exact
          path="/logs"
          render={props => <StatusLog grabErrors={grabErrors} {...props} />}
        />
        <Route path="/" render={props => <Landing {...props} />} />
      </Switch>
    );
  }
}

Main.propTypes = {
  logErrors: PropTypes.func,
  grabErrors: PropTypes.func
};

export default Main;
