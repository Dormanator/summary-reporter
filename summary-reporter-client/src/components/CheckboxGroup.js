import React from "react";
import PropTypes from "prop-types";
import LabeledCheckbox from "./LabeledCheckbox";
import Style from "./CheckboxGroup.css";

const CheckboxGroup = ({
  checkboxItemsArray,
  setCheck,
  grabChange,
  children
}) => {
  const checkboxItems = checkboxItemsArray.map(data => {
    // make sure we have no space in the id value which we use for connecting our label
    const id = data.replace(" ", "-") + "-checkbox";
    return (
      <LabeledCheckbox
        key={id}
        name={data}
        label={data}
        value={data}
        id={id}
        setCheck={setCheck(data)}
        onChange={grabChange}
      />
    );
  });
  return (
    <div className={Style.root}>
      {children}
      {checkboxItems}
    </div>
  );
};

CheckboxGroup.propTypes = {
  checkboxItemsArray: PropTypes.array,
  setCheck: PropTypes.func,
  grabChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CheckboxGroup;
