import React from "react";
import PropTypes from "prop-types";
import Style from "./LabeledCheckbox.css";

const LabeledCheckbox = ({
  name,
  label,
  value,
  setCheck,
  onChange,
  modifiers
}) => {
  // establish baseline style
  let checkboxStyle = Style.check;
  // if modifiers are give create new style
  if (modifiers) {
    checkboxStyle = [Style.check];
    modifiers.forEach(x => (Style[x] ? checkboxStyle.push(Style[x]) : null));
    checkboxStyle = checkboxStyle.join(" ");
  }
  return (
    <div className={Style.root}>
      <input
        className={Style.input}
        onChange={onChange}
        type="checkbox"
        value={value}
        checked={setCheck}
        id={name}
        name={name}
      />
      <label htmlFor={name} className={Style.label}>
        <span className={checkboxStyle} />
        {label}
      </label>
    </div>
  );
};

LabeledCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool
  ]),
  setCheck: PropTypes.bool,
  onChange: PropTypes.func,
  modifiers: PropTypes.array
};

export default LabeledCheckbox;
