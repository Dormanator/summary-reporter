import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/hocs/Container";
import ErrorItem from "./statusLog/ErrorItem";
import LoadingIndicator from "../components/LoadingIndicator";
import Style from "./statusLog/StatusLog.css";
import { getErrors } from "../utils/api";

class StatusLog extends Component {
  state = {
    errors: null
  };

  async componentDidMount() {
    const { grabErrors } = this.props;
    try {
      const errors = await getErrors(grabErrors);
      this.setState({ errors });
    } catch (err) {
      grabErrors("There was trouble getting the error logs.");
    }
  }

  render() {
    const { errors } = this.state;
    let errItems = null,
      errCount = 0,
      errTable = <LoadingIndicator />;

    if (errors && errors.length > 0) {
      errItems = errors.map(err => <ErrorItem key={err._id} err={err} />);
      errCount = errors.length;
      errTable = (
        <table className={Style.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Error</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>{errItems}</tbody>
        </table>
      );
    } else if (errors && errors.length === 0) {
      errTable = null;
    }

    return (
      <Container
        title={`${errCount} Errors Logged`}
        subtitle="Below is a public log of all the front-end errors that have occured to date."
      >
        <div className={Style.root}>{errTable}</div>
      </Container>
    );
  }
}

StatusLog.propTypes = {
  grabErrors: PropTypes.func
};

export default StatusLog;
