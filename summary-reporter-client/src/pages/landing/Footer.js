import React from "react";
import Style from "./Footer.css";

const Footer = props => {
  return (
    <footer className={Style.root}>
      <p className={Style.text}>
        Summary Reporter is free and open-source. Check it out on{" "}
        <a
          href="https://github.com/Dormanator/summary-reporter"
          className={Style.link}
        >
          Github
        </a>!
      </p>
      <p className={Style.text}>
        Questions or Comments?{" "}
        <a href="mailto:Contact@RyanDorman.tech" className={Style.link}>
          Contact@RyanDorman.tech
        </a>
      </p>
    </footer>
  );
};

export default Footer;
