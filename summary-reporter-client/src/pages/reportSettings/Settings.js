import React from "react";
import SettingsItem from "./SettingsItem";
import settingsDescriptions from "../../modules/app/settingsDescriptions.json";
import Style from "./Settings.css";

const Settings = ({ settings, data, grabChange }) => {
  const handleMultiSelectChange = e => {
    const { value, name } = e.target;
    const selected = settings[name].includes(value);
    let newArr = [];
    if (selected) {
      newArr = [...settings[name]].filter(x => x !== value);
    } else {
      newArr = [...settings[name], value];
    }
    grabChange({
      ...settings,
      [name]: newArr
    });
  };

  const handleMultiSelectClear = (e, selectName) => {
    e.preventDefault();
    const newSettings = { ...settings };
    newSettings[selectName] = [];
    grabChange(newSettings);
  };

  const handleSimpleChange = e => {
    const { value, name } = e.target;
    grabChange({ ...settings, [name]: value });
  };

  const handleGroupTextChange = e => {
    const { value, name } = e.target,
      group = e.target.parentNode.parentNode.parentNode.dataset;
    const newArr = [...settings[group.name]];
    newArr.splice(parseInt(name, 10), 1, value);
    grabChange({
      ...settings,
      [group.name]: newArr
    });
  };

  const handleAddToGroup = (e, setting) => {
    e.preventDefault();
    grabChange({
      ...settings,
      [setting]: [...settings[setting], ""]
    });
  };

  const handleRemoveFromGroup = (name, setting) => {
    const newArr = [...settings[setting]];
    newArr.splice(parseInt(name, 10), 1);
    grabChange({
      ...settings,
      [setting]: newArr
    });
  };

  const handleCheckBoxChange = e => {
    const { name } = e.target;
    grabChange({ ...settings, [name]: !settings[name] });
  };

  // set objs to pass into children as props
  const handlers = {
      onChange: [
        handleSimpleChange,
        handleGroupTextChange,
        handleMultiSelectChange,
        handleCheckBoxChange
      ],
      onAdd: handleAddToGroup,
      onRemove: handleRemoveFromGroup,
      onClear: handleMultiSelectClear
    },
    settingsList = Object.keys(settingsDescriptions),
    settingsInputs = settingsList.map((setting, i) => {
      const { desc, required, input } = settingsDescriptions[setting],
        settingObj = {
          name: setting,
          value: settings[setting],
          description: desc,
          required: required
        },
        options = setting === "reportItems" ? data.numeric : data.all;
      return (
        <SettingsItem
          key={`${setting}-${input}-input`}
          type={input}
          setting={settingObj}
          handlers={handlers}
          options={options}
        />
      );
    });

  return <form className={Style.root}>{settingsInputs}</form>;
};

export default Settings;
