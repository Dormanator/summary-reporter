import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../images/logo-base.png";
import Style from "./Navbar.css";

const Navbar = ({ errorFlash }) => {
  return (
    <nav className={Style.root}>
      <Link to="/" className={Style.brand}>
        <img
          src={Logo}
          alt="Summary Reporter Home"
          className={Style.brandImg}
        />
        &nbsp; Summary Reporter
      </Link>
      <ul className={Style.items}>
        <li>
          <Link className={[Style.item, Style.link].join(" ")} to="/logs">
            Error Logs
          </Link>
        </li>
      </ul>
      {errorFlash}
    </nav>
  );
};

Navbar.propTypes = {
  errorFlash: PropTypes.node
};

export default Navbar;
