import React from "react";
import PropTypes from "prop-types";
import Icons from "../../components/Icons";
import Style from "./Feature.css";

const Feature = ({ icon, title, text }) => {
  return (
    <div className={Style.root}>
      <Icons icon={icon} />
      <h3 className={Style.title}>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

Feature.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
};

export default Feature;
