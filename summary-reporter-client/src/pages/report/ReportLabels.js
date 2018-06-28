import React from "react";
import PropTypes from "prop-types";

const ReportLabels = ({ reportBasis, reportPeriod, months }) => {
  if (months) {
    reportPeriod = reportPeriod.map(month => month.slice(0, 3).toUpperCase());
  }
  const reportSummary = ["Target", "Completed", "Remaining"];
  // create a row of column labels starting with the report basis and then listing out the time periods
  const colLabels = [reportBasis, ...reportPeriod, ...reportSummary].map(
    label => <th key={label}>{label}</th>
  );
  return <tr className="report__column-labels">{colLabels}</tr>;
};

ReportLabels.propTypes = {
  reportBasis: PropTypes.string,
  reportPeriod: PropTypes.array,
  months: PropTypes.bool
};

export default ReportLabels;
