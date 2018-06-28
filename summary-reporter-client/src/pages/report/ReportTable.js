import React from "react";
import PropTypes from "prop-types";
import ReportHeader from "./ReportHeader";
import ReportBody from "./ReportBody";
import ReportTitle from "./ReportTitle";
import ReportFooter from "./ReportFooter";

const ReportTable = ({ entryName, data, settings }) => {
  const reportId = `report-${entryName
    .slice(0, entryName.indexOf("@"))
    .replace(/[^\w\d]/g, "-")}`;
  return (
    <article id={reportId} className="report">
      <table className='report__table'>
        <ReportTitle data={data} settings={settings} />
        <ReportHeader data={data} settings={settings} />
        <ReportBody
          data={data}
          settings={settings}
          targets={settings.targets[entryName]}
        />
      </table>
      <ReportFooter settings={settings} />
    </article>
  );
};

ReportTable.propTypes = {
  entryName: PropTypes.string,
  data: PropTypes.object,
  settings: PropTypes.object
};

export default ReportTable;
