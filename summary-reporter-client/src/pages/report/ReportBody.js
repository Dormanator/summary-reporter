import React from "react";
import PropTypes from "prop-types";
import ReportLabels from "./ReportLabels";
import ReportRow from "./ReportRow";

const ReportBody = ({ data, settings, targets }) => {
  const {
      zeroCellValues,
      reportIntervals,
      reportPeriod,
      reportBasis,
      reportItems
    } = settings,
    // create rows for each item being reported on based on the settings
    rows = reportItems.map(item => (
      <ReportRow
        key={item.replace(/\s/g, "-").toLowerCase()}
        defaultValue={zeroCellValues ? 0 : null}
        reportItem={item}
        reportData={data}
        reportBasis={reportBasis}
        reportPeriod={reportPeriod}
        reportTargets={targets}
      />
    ));
  return (
    <tbody className="report__body">
      <ReportLabels
        {...settings}
        months={reportIntervals.toLowerCase().includes("month")}
      />
      {rows}
    </tbody>
  );
};

ReportBody.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
  targets: PropTypes.object
};

export default ReportBody;
