import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Style from "./Btn.css";

const Btn = ({ modifiers, onClick, link, back, history, children }) => {
  // establish baseline style
  let style = Style.root;
  // if modifiers are give create new style
  if (modifiers) {
    style = [Style.root];
    modifiers.forEach(x => (Style[x] ? style.push(Style[x]) : null));
    style = style.join(" ");
  }
  // if its a back button set the proper onClick
  if (back) {
    onClick = history.goBack;
  }
  // establish baseline button
  let btn = (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
  // determine if this is a button or browser-router link element
  if (link) {
    btn = (
      <Link className={style} to={link}>
        {children}
      </Link>
    );
  }

  return btn;
};

Btn.propTypes = {
  modifiers: PropTypes.array,
  onClick: PropTypes.func,
  link: PropTypes.string,
  back: PropTypes.bool,
  history: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default withRouter(Btn);
