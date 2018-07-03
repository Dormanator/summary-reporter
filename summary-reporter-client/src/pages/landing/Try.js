import React from "react";
import PropTypes from "prop-types";
import Btn from "../../components/Btn";
import Sample from "./Sample";
import {
  objectivesData,
  objectiveSettings,
  salesData,
  salesSettings,
  timeData,
  timeSettings
} from "../../samples";
import { objectiveImg, salesImg, timeImg } from "../../images";
import Style from "./Try.css";

const Try = props => {
  const sampleList = props.samples.map(sample => (
    <Sample
      key={sample.title}
      title={sample.title}
      image={sample.image}
      data={sample.data}
      settings={sample.settings}
    />
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
      image: objectiveImg,
      data: objectivesData,
      settings: objectiveSettings
    },
    {
      title: "Sales",
      image: salesImg,
      data: salesData,
      settings: salesSettings
    },
    {
      title: "Time",
      image: timeImg,
      data: timeData,
      settings: timeSettings
    }
  ]
};

Try.propTypes = {
  samples: PropTypes.array
};

export default Try;
