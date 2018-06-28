import React from "react";
import PropTypes from "prop-types";
import LabeledInput from "../../components/LabeledInput";
import InputGroup from "../../components/InputGroup";
import SelectInput from "../../components/SelectInput";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import Style from "./SettingsItem.css";

const SettingsItem = ({ type, setting, handlers, options }) => {
  const { onChange, onAdd, onRemove, onClear } = handlers,
    { name, value, description, required } = setting,
    nameNonCamel = name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, char => char.toUpperCase());

  let input = null,
    require = null;

  switch (type) {
    case "text":
      input = (
        <LabeledInput
          type="text"
          label={nameNonCamel}
          name={name}
          value={value}
          grabChange={onChange[0]}
        />
      );
      break;
    case "group":
      input = (
        <InputGroup
          groupLabel={nameNonCamel}
          groupName={name}
          groupData={value}
          grabChange={onChange[1]}
          addInput={e => onAdd(e, name)}
          removeInput={onRemove}
        />
      );
      break;
    case "select":
      input = (
        <SelectInput
          label={nameNonCamel}
          name={name}
          value={value}
          grabChange={onChange[0]}
          options={options}
        />
      );
      break;
    case "multi":
      input = (
        <SelectInput
          multi
          label={nameNonCamel}
          name={name}
          value={value}
          grabChange={onChange[2]}
          options={options}
          clear={e => onClear(e, name)}
        />
      );
      break;
    case "checkbox":
      input = (
        <LabeledCheckbox
          label={nameNonCamel}
          name={name}
          value={value}
          setCheck={value}
          onChange={onChange[3]}
        />
      );
      break;
    default:
      input = null;
  }

  if (required) {
    require = <span className={Style.require}>required</span>;
  }

  return (
    <div className={Style.root}>
      {input}
      <div className={Style.info}>
        <p>{description}</p>
        {require}
      </div>
    </div>
  );
};

SettingsItem.propTypes = {
  setting: PropTypes.object,
  handlers: PropTypes.object,
  options: PropTypes.array
};

export default SettingsItem;
