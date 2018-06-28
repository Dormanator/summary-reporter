import React from "react";
import PropTypes from "prop-types";
import Style from "./Row.css";

const Row = ({ modifiers, children }) => {
  // establish baseline style
  let style = Style.root;
  // if modifiers are give create new style
  if (modifiers) {
    style = [Style.root];
    modifiers.forEach(x => (Style[x] ? style.push(Style[x]) : null));
    style = style.join(" ");
  }
  return <div className={style}>{children}</div>;
};

Row.propTypes = {
  modifiers: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Row;
