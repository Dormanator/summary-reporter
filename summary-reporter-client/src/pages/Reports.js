import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/hocs/Container";
import Row from "../components/hocs/Row";
import ReportTable from "./report/ReportTable";
import Btn from "../components/Btn";
import LoadingIndicator from "../components/LoadingIndicator";
import reportInlineStyles from "./report/inlineStyles/reportStyles";
import Style from "./report/Report.css";
import BtnStyle from "../components/Btn.css";
import { toPdf } from "../utils/api";
import { prepareSettingsFile } from "../utils/prepareSettings";

class Reports extends Component {
  state = {
    reportDownloadUrl: null
  };

  async componentDidMount() {
    const { grabErrors } = this.props,
      data = this.reports.innerHTML;
    try {
      const file = await toPdf(data, grabErrors);
      const reportDownloadUrl = URL.createObjectURL(file);
      this.setState({ reportDownloadUrl });
    } catch (e) {
      grabErrors("Looks like there was trouble creating the pdf");
    }
  }

  render() {
    const { data, settings, reports } = this.props,
      { reportDownloadUrl } = this.state,
      settingsDownloadUrl = prepareSettingsFile(settings),
      reportsToShow = reports.map((report, i) => (
        <ReportTable
          key={`${i}-report-${report}`}
          entryName={report}
          data={data[report]}
          settings={settings}
        />
      ));
    let downloadBtns = <LoadingIndicator />;
    if (reportDownloadUrl) {
      downloadBtns = [
        <div className={Style.downloads} key="downloads">
          <a
            className={[BtnStyle.root, Style.marginSmlR].join(" ")}
            href={reportDownloadUrl}
          >
            Download Reports
          </a>
          <a
            className={BtnStyle.root}
            href={settingsDownloadUrl}
            download="settings.json"
          >
            Download Settings
          </a>
        </div>
      ];
    }
    return (
      <Container
        title="Reports"
        subtitle={`If your reports look as expected, download them now! If your reports didn't turn out as expected, go back and try out some different settings.
          Want to easily re-create reports with these settings again? Make sure you download your settings file.`}
      >
        <Row modifiers={["marginMedTop", "flex", "justifySpaceBetween"]}>
          <Btn back>Back</Btn>
          {downloadBtns}
        </Row>
        <div
          className={Style.root}
          ref={reports => {
            this.reports = reports;
          }}
        >
          <style>{reportInlineStyles}</style>
          <div className={Style.reports}>{reportsToShow}</div>
        </div>
      </Container>
    );
  }
}

Reports.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
  reports: PropTypes.array,
  grabErrors: PropTypes.func
};

export default Reports;
