import React, { Component } from "react";
import PropTypes from "prop-types";
import Style from "./ErrorFlash.css";

class ErrorFlash extends Component {
  componentDidMount() {
    const { grabErrors } = this.props;
    this.timer = setTimeout(() => {
      grabErrors(null);
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { error, grabErrors } = this.props;
    return (
      <div className={Style.root}>
        {error.message}
        <span className={Style.close} onClick={e => grabErrors(null)}>
          &times;
        </span>
      </div>
    );
  }
}

ErrorFlash.propTypes = {
  error: PropTypes.object,
  grabErrors: PropTypes.func
};

export default ErrorFlash;
