import React from "react";
import PropTypes from "prop-types";
import Style from "./Icons.css";

const Icons = ({ icon, modifiers }) => {
  let style = Style[icon];
  // if modifiers are give create new style
  if (modifiers) {
    style = [Style[icon]];
    modifiers.forEach(x => (Style[x] ? style.push(Style[x]) : null));
    style = style.join(" ");
  }
  return <span className={style} />;
};

Icons.propTypes = {
  icon: PropTypes.string
};

export default Icons;
