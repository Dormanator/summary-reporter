import React from "react";
import Style from "./ErrorItem.css";

const ErrorItem = ({ err }) => {
  const { createdAt, error, info } = err;
  return (
    <tr className={Style.root}>
      <td>{createdAt}</td>
      <td>{error}</td>
      <td>{info}</td>
    </tr>
  );
};

export default ErrorItem;
