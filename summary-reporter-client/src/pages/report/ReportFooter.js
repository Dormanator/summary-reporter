import React from "react";
import PropTypes from "prop-types";

const ReportFooter = ({ settings }) => {
  const footerContents = settings.footer.map((label, i) => {
    return <span key={`${i}-${label}`}>{label}</span>;
  });
  return <footer className="report__footer">{footerContents}</footer>;
};

ReportFooter.propTypes = {
  settings: PropTypes.object
};

export default ReportFooter;
