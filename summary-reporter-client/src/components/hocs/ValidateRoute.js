import React from "react";
import { Redirect } from "react-router-dom";

const ValidateRoute = props => {
  const { valid, altRoute, children } = props;
  return valid ? children : <Redirect to={altRoute} />;
};

export default ValidateRoute;
