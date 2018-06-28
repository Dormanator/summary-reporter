import React from "react";
import Style from "./Footer.css";

const Footer = props => {
  return (
    <footer className={Style.root}>
      <p>
        Summary Reporter is free and open-source. Check it out on{" "}
        <a href="https://github.com/Dormanator/summary-reporter">Github!</a>
      </p>
      <p>
        Questions or Comments?{" "}
        <a href="mailto:Contact@RyanDorman.tech">Contact@RyanDorman.tech</a>
      </p>
    </footer>
  );
};

export default Footer;
