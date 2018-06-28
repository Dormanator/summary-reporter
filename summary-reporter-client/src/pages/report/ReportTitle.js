import React from "react";
import PropTypes from "prop-types";

const ReportTitle = ({ data, settings }) => {
  return <caption className="report__title">{settings.reportTitle}</caption>;
};

ReportTitle.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object
};

export default ReportTitle;
