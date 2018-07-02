import React from "react";
import PropTypes from "prop-types";
import Style from "./Container.css";

const Container = ({ title, subtitle, children }) => {
  return (
    <section className={Style.root}>
      <h2 className={Style.title}>{title}</h2>
      <div className={Style.content}>
        <h3 className={Style.subtitle}>{subtitle}</h3>
        {children}
      </div>
    </section>
  );
};

Container.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Container;
