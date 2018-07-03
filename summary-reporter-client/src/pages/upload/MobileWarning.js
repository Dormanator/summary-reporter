import React from "react";
import Btn from "../../components/Btn";
import Style from "./MobileWarning.css";

const MobileWarning = ({ accepted, handleAccept }) => {
  let warning = (
    <div className={Style.root}>
      <h1>Warning!</h1>
      <h2>Summary Reporter's UI has not been optimized for mobile screens.</h2>
      <h2>For best results use a desktop computer.</h2>
      <Btn back>Back</Btn>
      <Btn onClick={handleAccept}>Continue</Btn>
    </div>
  );

  if (accepted) {
    warning = null;
  }

  return warning;
};

MobileWarning.defaultProps = {
  accepted: false
};

export default MobileWarning;
