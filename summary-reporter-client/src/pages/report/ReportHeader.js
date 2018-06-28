import React from "react";
import PropTypes from "prop-types";

const ReportHeader = ({ data, settings }) => {
  // number of columns created by labels, and 3 sumamry columns at end of report - regardless of user data
  const COLS_GENERATED = 4,
    reportWidth = settings.reportPeriod.length + COLS_GENERATED,
    headerLabels = Object.keys(data.headers),
    headers = headerLabels.map(h => {
      return (
        <tr key={h} className="report__header">
          <th>{h}</th>
          <td colSpan={reportWidth - 1}>{data.headers[h]}</td>
        </tr>
      );
    });

  return <thead>{headers}</thead>;
};

ReportHeader.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object
};

export default ReportHeader;
