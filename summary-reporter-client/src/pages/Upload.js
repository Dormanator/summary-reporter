import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/hocs/Container";
import Row from "../components/hocs/Row";
import Dropzone from "react-dropzone";
import FileLists from "./upload/FileLists";
import Btn from "../components/Btn";
import MobileWarning from "./upload/MobileWarning";
import Style from "./upload/Upload.css";

class Upload extends Component {
  state = {
    existingFiles: this.props.files,
    binaryDataList: [],
    textDataList: [],
    binaryData: [],
    textData: [],
    mobileWarningAccepted: false
  };

  componentDidMount() {
    const { existingFiles } = this.state;
    // if data was already uploaded use that
    if (existingFiles) {
      this.onDrop(existingFiles);
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      // setup dyanimc vars to handle data from either xlsx or json files
      let readType, storeRefAs, storeReadFileAs;
      if (file.type === "application/json") {
        readType = "readAsText";
        storeReadFileAs = "textData";
      } else {
        readType = "readAsBinaryString";
        storeReadFileAs = "binaryData";
      }
      storeRefAs = storeReadFileAs + "List";

      // Store the file info so we can display the names to the users
      this.setState((prevState, props) => {
        return { [storeRefAs]: [...prevState[storeRefAs], file] };
      });

      // new read API
      const reader = new FileReader();
      // setup reader callbacks
      reader.onload = () => {
        // let the ui progress and save the read data
        this.setState((prevState, props) => {
          return {
            [storeReadFileAs]: [...prevState[storeReadFileAs], reader.result]
          };
        });
      };
      // pass errors up to the app if they occur
      reader.onabort = () =>
        this.props.grabErrors(
          `Something went wrong when reading ${file.name}. File reading aborted`
        );
      reader.onerror = () =>
        this.props.grabErrors(
          `Something went wrong when reading ${file.name}. file reading failed`
        );

      // call the reader API to convert file based on file type
      reader[readType](file);
    });
  };

  handleFileRemove = e => {
    const fileListIndex = e.target.name,
      fileType = e.target.dataset.type,
      fileData = fileType === "application/json" ? "textData" : "binaryData",
      fileList = fileData + "List",
      newList = [...this.state[fileList]],
      newData = [...this.state[fileData]];
    newList.splice(parseInt(fileListIndex, 10), 1);
    newData.splice(parseInt(fileListIndex, 10), 1);
    this.setState({
      [fileList]: newList,
      [fileData]: newData
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { grabData, grabErrors } = this.props,
      { binaryData, textData, binaryDataList, textDataList } = this.state,
      valid = binaryData.length > 0;
    if (valid) {
      grabData(binaryData, textData, [...binaryDataList, ...textDataList]);
      this.props.history.push("/settings");
    } else {
      grabErrors("Make sure you have uploaded a file before continuing.");
    }
  };

  render() {
    const fileLists = [this.state.binaryDataList, this.state.textDataList],
      listsLabels = ["Excel File(s)", "Settings File"];
    return (
      <Container
        title="Upload"
        subtitle="Upload your data, and any settings files you got from a previous use below."
      >
        <MobileWarning
          accepted={this.state.mobileWarningAccepted}
          handleAccept={() => this.setState({ mobileWarningAccepted: true })}
        />
        <Dropzone
          accept=".xls,.xlsx,.json"
          className={Style.dropZone}
          onDrop={this.onDrop}
        >
          Drop your .xlsx/.xls or .json files here
        </Dropzone>
        <Row modifiers={["marginMedTop", "flex", "justifySpaceBetween"]}>
          <Btn back>Back</Btn>
          <Btn onClick={this.handleSubmit}>Next</Btn>
        </Row>
        <FileLists
          fileLists={fileLists}
          fileListsLabels={listsLabels}
          handleFileRemove={this.handleFileRemove}
        />
      </Container>
    );
  }
}

Upload.propTypes = {
  files: PropTypes.array,
  grabData: PropTypes.func,
  grabErrors: PropTypes.func
};

export default Upload;
