import React from "react";
import PropTypes from "prop-types";
import Row from "../../components/hocs/Row";
import Feature from "./Feature";
import Style from "./Features.css";

const Features = props => {
  const features = props.content.map(feature => {
    return (
      <Feature
        key={`${feature.icon}-feature`}
        icon={feature.icon}
        title={feature.title}
        text={feature.text}
      />
    );
  });
  return (
    <section className={Style.root}>
      <h2 className={Style.title}>How it works</h2>
      <Row modifiers={["flex"]}>{features}</Row>
    </section>
  );
};

Features.defaultProps = {
  content: [
    {
      icon: "upload",
      title: "Upload",
      text:
        "Upload your excel files that contain rows of entries for individuals, reporting time-series counts across columns"
    },
    {
      icon: "settings",
      title: "Adjust Settings",
      text:
        "Helps us understand your data by determining which settings are appropriate to summarize it into reports"
    },
    {
      icon: "targets",
      title: "Set Targets",
      text:
        "Your data points will be summed up across the time interval you specify and compared against the targets you set"
    },
    {
      icon: "report",
      title: "Review Reports",
      text:
        "Receive print-ready pdfs and export your settings for next time, or re-adjust the settings as needed"
    }
  ]
};

Features.propTypes = {
  content: PropTypes.array
};

export default Features;
