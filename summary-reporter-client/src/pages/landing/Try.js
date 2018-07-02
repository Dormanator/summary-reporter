import React from "react";
import PropTypes from "prop-types";
import Btn from "../../components/Btn";
import objectiveImg from "../../images/objective-data.png";
import salesImg from "../../images/sales-data.png";
import timeImg from "../../images/time-data.png";
import Style from "./Try.css";

const Try = props => {
  const sampleList = props.samples.map(sample => (
    <div
      key={sample.titleg}
      className={Style.sample}
      style={{
        background: `linear-gradient(rgba(0,0,0, .8), rgba(0,0,0, .8)), center/cover url(${
          sample.image
        })`
      }}
    >
      <h4 className={Style.title}>{sample.title}</h4>
      <a
        className={Style.link}
        href={sample.data}
        download={`sample${sample.title}Data.xlsx`}
      >
        Sample Data
      </a>
      <a
        className={Style.link}
        href={sample.settings}
        download={`sample${sample.title}Settings.json`}
      >
        Sample Settings
      </a>
    </div>
  ));
  return (
    <section className={Style.root}>
      <div className={Style.samples}>{sampleList}</div>
      <h3 className={Style.prompt}>
        Still not sure how it works? Check out one of our sample data sets
        above.<br />We even have some sample settings files to get you started.
      </h3>
      <Btn link="/upload" modifiers={["hero", "blue"]}>
        Try it out
      </Btn>
    </section>
  );
};

Try.defaultProps = {
  samples: [
    {
      title: "Objectives",
      data: "/samples/quarterlyObjectives.xlsx",
      settings: "/samples/objectivesSettings.json",
      image: objectiveImg
    },
    {
      title: "Sales",
      data: "/samples/annualSales.xlsx",
      settings: "/samples/salesSettings.json",
      image: salesImg
    },
    {
      title: "Time",
      data: "/samples/weeklyTime.xlsx",
      settings: "/samples/timeSettings.json",
      image: timeImg
    }
  ]
};

Try.propTypes = {
  samples: PropTypes.array
};

export default Try;
