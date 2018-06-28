import React from "react";
import PropTypes from "prop-types";
import LabeledInput from "./LabeledInput";
import Btn from "../components/Btn";
import Style from "./InputGroup.css";

const InputGroup = ({
  groupData,
  groupName,
  groupLabel,
  modifiers,
  grabChange,
  type,
  inputLabels,
  addInput,
  removeInput
}) => {
  // determine if we are working with an object or array
  const array = Array.isArray(groupData),
    itemList = array ? groupData : Object.keys(groupData[groupName]),
    labeledInputs = itemList.map((item, i) => {
      // set appropriate props based on obj or array input
      let name = i,
        value = item;
      if (!array) {
        name = item;
        value = groupData[groupName][item];
      }
      // determine if each item in the group will get a label
      let label = inputLabels ? item : null;
      return (
        <LabeledInput
          key={`${i}-${name}`}
          type={type}
          label={label}
          name={name}
          groupName={groupName}
          value={value}
          grabChange={grabChange}
          remove={removeInput}
        />
      );
    });
  // establish baseline style for gorup
  let groupStyle = Style.group;
  // if modifiers are give create new style
  if (modifiers) {
    groupStyle = [Style.group];
    modifiers.forEach(x => (Style[x] ? groupStyle.push(Style[x]) : null));
    groupStyle = groupStyle.join(" ");
  }
  // determine if we need to show a btn for users to add new inputs to the group
  let addInputBtn = null;
  if (addInput) {
    addInputBtn = (
      <Btn onClick={addInput} modifiers={["sml"]}>
        Add Input
      </Btn>
    );
  }
  return (
    <div className={Style.root}>
      <div data-name={groupName} className={groupStyle} role="group">
        <legend className={Style.label}>{groupLabel}</legend>
        {labeledInputs}
      </div>
      {addInputBtn}
    </div>
  );
};

InputGroup.propTypes = {
  groupData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  groupName: PropTypes.string,
  groupLabel: PropTypes.string,
  modifiers: PropTypes.array,
  type: PropTypes.string,
  inputLabels: PropTypes.bool,
  addInput: PropTypes.func,
  removeInput: PropTypes.func,
  grabChange: PropTypes.func
};

export default InputGroup;
