import React from "react";
import PropTypes from "prop-types";
import Style from "./LabeledInput.css";

const LabeledInput = ({
  type,
  name,
  groupName,
  label,
  value,
  grabChange,
  remove
}) => {
  let rmvInputBtn = null;
  if (remove) {
    rmvInputBtn = (
      <span className={Style.remove} onClick={e => remove(name, groupName)}>
        &times;
      </span>
    );
  }
  return (
    <div className={Style.root}>
      <label className={Style.label}>
        {label}
        {rmvInputBtn}
        <input
          type={type}
          name={name}
          value={value}
          onChange={grabChange}
          className={Style.input}
        />
      </label>
    </div>
  );
};

LabeledInput.defaultProps = {
  type: "text"
};

LabeledInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  groupName: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  grabChange: PropTypes.func,
  remove: PropTypes.func
};

export default LabeledInput;
