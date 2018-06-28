import React from "react";
import PropTypes from "prop-types";

const ReportRow = ({
  defaultValue,
  reportItem,
  reportData,
  reportBasis,
  reportPeriod,
  reportTargets
}) => {
  const timeSeriesData = reportData[reportBasis],
    target = reportTargets[reportItem] || defaultValue,
    // sum up the report items across all intervals
    completed = reportPeriod.reduce((a, b) => {
      // set an inital value var that we will add to the accumulator
      let value = 0;
      // we see if a month exists and if the report item for this row exists on that month
      if (timeSeriesData[b] && timeSeriesData[b][reportItem]) {
        // if so we add that reported value to the accumulator
        value = timeSeriesData[b][reportItem];
      }
      return a + value;
    }, 0),
    // find the number remiang that needs to be completed absed on the entry's report item targets
    remaining = target - completed < 0 ? 0 : target - completed,
    // establish an array of the reported values for this row
    intervals = reportPeriod.map(
      interval =>
        timeSeriesData[interval]
          ? timeSeriesData[interval][reportItem]
          : defaultValue
    ),
    // collapse report item counts, their targets, sum of items, and remaing number to target into an array to transform into table cells
    colData = [...intervals, target, completed, remaining];
  return (
    <tr className="report__body">
      <th className="report__body-labels">{reportItem}</th>
      {colData.map((data, i) => <td key={`${i}-${reportItem}`}>{data}</td>)}
    </tr>
  );
};

ReportRow.propTypes = {
  defaultValue: PropTypes.number,
  reportItem: PropTypes.string,
  reportData: PropTypes.object,
  reportBasis: PropTypes.string,
  reportPeriod: PropTypes.array,
  reportTargets: PropTypes.object
};

export default ReportRow;
