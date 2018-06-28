import React from "react";
import PropTypes from "prop-types";
import DataPoints from "./DataPoints";
import Style from "./Info.css";

const Info = props => {
  const { stats } = props;
  return (
    <div className={Style.root}>
      <h4 className={Style.info}>
        We've identified your data contains {stats.numEntries} entries.
      </h4>
      <h4 className={Style.info}>
        Across these entries, we saw {stats.numPoints} potential different data
        points. Please select the data points below that are relevant to your
        summary report:
      </h4>
      <DataPoints {...props} />
    </div>
  );
};

Info.propTypes = {
  stats: PropTypes.object,
  data: PropTypes.object,
  grabChange: PropTypes.func
};

export default Info;
