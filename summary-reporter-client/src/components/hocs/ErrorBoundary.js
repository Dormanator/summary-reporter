import React, { Component } from "react";
import PropTypes from "prop-types";
import { logError } from "../../utils/api";

class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null
  };

  async componentDidCatch(error, info) {
    const { grabErrors } = this.props,
      errObj = { error: error.toString(), info: info.componentStack };
    this.setState(errObj);
    try {
      // make post to /api/errors with body: {'error' ..., 'info': ...}
      await logError(errObj);
    } catch (err) {
      grabErrors(
        `There was an error logging. Maybe the server is offline? ${err.message ||
          err}`
      );
    }
  }

  render() {
    if (this.state.error) {
      return (
        <h1>
          Opps. Something went wrong. Please reload the application and try
          again.
        </h1>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  grabErrors: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ErrorBoundary;
