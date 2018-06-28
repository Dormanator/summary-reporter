import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./app/Navbar";
import Main from "./app/Main";
import ErrorFlash from "../components/ErrorFlash";
import ErrorBoundary from "../components/hocs/ErrorBoundary";
import { getStatus, logError } from "../utils/api";
import Style from "./app/App.css";

class App extends Component {
  state = {
    serverStatus: false,
    error: { message: null }
  };

  componentDidMount() {
    this.getServerStatus();
  }

  getServerStatus() {
    const pingServer = setInterval(async () => {
      try {
        const isAwake = await getStatus();
        this.setState({ serverStatus: isAwake });
        if (isAwake) {
          clearInterval(pingServer);
        }
      } catch (err) {
        this.setState({ error: { message: err } });
      }
    }, 5000);
  }

  handleErrors = err => {
    this.setState({ error: { message: err } });
  };

  handleErrorLogging = async err => {
    try {
      const errObj = { error: err.name, info: err.message };
      await logError(errObj, this.handleErrors);
    } catch (err) {
      this.handleErrors("Something went wrong. Please try again.");
    }
  };

  render() {
    const { error } = this.state;
    // determine if we need to display an error flash message
    let errorFlashMessage = error.message ? (
      <ErrorFlash error={error} grabErrors={this.handleErrors} />
    ) : null;

    return (
      <ErrorBoundary grabErrors={this.handleErrors}>
        <Router>
          <div className={Style.root}>
            <Navbar errorFlash={errorFlashMessage} />
            <Main
              logErrors={this.handleErrorLogging}
              grabErrors={this.handleErrors}
            />
          </div>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default App;
