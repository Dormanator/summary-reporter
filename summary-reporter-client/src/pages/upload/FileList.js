import React from "react";
import PropTypes from "prop-types";
import Style from "./FileList.css";

const FileList = ({ fileListArr, fileListLabel, removeFromList }) => {
  const fileList = fileListArr.map((f, i) => (
    <li key={i} className={Style.file}>
      <span
        name={i}
        className={Style.remove}
        onClick={removeFromList}
        data-type={f.type}
      >
        &times;
      </span>
      {f.name} - {f.size / 1000} KB
    </li>
  ));
  return (
    <div className={Style.root}>
      <h3 className={Style.listLabel}>{fileListLabel}</h3>
      <ul className={Style.list}>{fileList}</ul>
    </div>
  );
};

FileList.propTypes = {
  fileListArr: PropTypes.array,
  fileListLabel: PropTypes.string,
  removeFromList: PropTypes.func
};

export default FileList;
