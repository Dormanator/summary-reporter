import React from "react";
import PropTypes from "prop-types";
import Style from "./Sample.css";
import { prepareSettingsFile } from "../../utils/prepareSettings";

const Sample = ({ title, image, data, settings }) => {
  return (
    <div
      key={title}
      className={Style.root}
      style={{
        background: `linear-gradient(rgba(0,0,0, .8), rgba(0,0,0, .8)), center/cover url(${image})`
      }}
    >
      <h4 className={Style.title}>{title}</h4>
      <span className={Style.link} onClick={e => window.open(data)} role="link">
        Sample Data
      </span>
      <a
        className={Style.link}
        href={prepareSettingsFile(settings)}
        download={`settings${title}.json`}
      >
        Sample Settings
      </a>
    </div>
  );
};

Sample.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  data: PropTypes.string,
  settings: PropTypes.object
};

export default Sample;
