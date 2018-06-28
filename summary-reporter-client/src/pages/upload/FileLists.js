import React from "react";
import PropTypes from "prop-types";
import FileList from "./FileList";

const FileLists = ({ fileLists, fileListsLabels, handleFileRemove }) => {
  fileLists = fileLists.map((list, i) => {
    if (list.length > 0) {
      return (
        <FileList
          key={`${i}-${fileListsLabels[i]}`}
          fileListArr={list}
          fileListLabel={fileListsLabels[i]}
          removeFromList={handleFileRemove}
        />
      );
    }
    return null;
  });
  return <div>{fileLists}</div>;
};

FileLists.propTypes = {
  fileLists: PropTypes.array,
  fileListsLabels: PropTypes.array,
  removeFromList: PropTypes.func
};

export default FileLists;
