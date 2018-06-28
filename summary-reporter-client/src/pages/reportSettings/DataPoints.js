import React from "react";
import PropTypes from "prop-types";
import CheckboxGroup from "../../components/CheckboxGroup";
import LabeledCheckbox from "../../components/LabeledCheckbox";

const DataPoints = props => {
  const { grabChange } = props,
    { all, selected } = props.data;

  const handleToggleAll = e => {
    let dataPoints;
    if (all.length === selected.length) {
      dataPoints = [];
    } else {
      dataPoints = [...all];
    }
    grabChange(dataPoints);
  };

  const handleChange = e => {
    const value = e.target.value;
    let dataPoints = [...selected];
    if (!dataPoints.includes(value)) {
      dataPoints.push(value);
    } else {
      dataPoints = dataPoints.filter(data => data !== value);
    }
    grabChange(dataPoints);
  };

  const checkDataPoint = item => {
    return !!selected.includes(item);
  };

  const checkAll = () => {
    return all.length === selected.length;
  };

  return (
    <CheckboxGroup
      checkboxItemsArray={all}
      setCheck={checkDataPoint}
      grabChange={handleChange}
    >
      <LabeledCheckbox
        label={"Toggle All"}
        name={"toggleDataPoints"}
        value={"toggleDataPoints"}
        modifiers={["checkRed"]}
        setCheck={checkAll()}
        onChange={handleToggleAll}
      />
    </CheckboxGroup>
  );
};

DataPoints.propTypes = {
  stats: PropTypes.object,
  data: PropTypes.object,
  grabChange: PropTypes.func
};

export default DataPoints;
