import React from "react";
import PropTypes from "prop-types";
import Btn from "./Btn";
import Style from "./SelectInput.css";

const SelectInput = ({
  multi,
  label,
  name,
  value,
  grabChange,
  options,
  optionsLabels,
  clear,
  all
}) => {
  // determine if we are working with an array or an obj and make options elements
  const optionList = Array.isArray(options) ? options : Object.keys(options),
    optionSelection = optionList.map((entry, i) => {
      // setup a className modifier if the option is slected
      const styleOption = value.includes(entry)
        ? Style.optionSelected
        : Style.option;
      return (
        <option className={styleOption} key={entry} value={entry}>
          {optionsLabels ? optionsLabels[i] : entry}
        </option>
      );
    });
  // if a class modifier was given for the select element apply it
  const selectStyle = multi ? Style.selectMulti : Style.select;

  // setup a clear selection and all selection btns if a function was passed in for either
  let clearSelectionBtn = null,
    allSelectionBtn = null;
  if (clear) {
    clearSelectionBtn = (
      <Btn onClick={clear} modifiers={["red", "sml"]}>
        Clear
      </Btn>
    );
  }
  if (all) {
    allSelectionBtn = (
      <Btn onClick={all} modifiers={["red", "sml"]}>
        Select All
      </Btn>
    );
  }
  // #TODO:
  // create custom multi-select
  // list each selected in span within div for user to see
  // filter options so selected aren't listed
  // if span is clicked remove it form selected array - now it wont be filtered anymore and the option returns
  // try without multiple selected attribute - to have single selection style
  return (
    <div className={Style.root}>
      <label className={Style.label}>
        {label}
        <select
          name={name}
          multiple={multi}
          value={value}
          onChange={grabChange}
          className={selectStyle}
        >
          {optionSelection}
        </select>
      </label>
      {clearSelectionBtn}
      {allSelectionBtn}
    </div>
  );
};

SelectInput.defaultProps = {
  multi: false
};

SelectInput.propTypes = {
  multi: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array
  ]),
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  optionsLabels: PropTypes.array,
  grabChange: PropTypes.func,
  clear: PropTypes.func
};

export default SelectInput;
