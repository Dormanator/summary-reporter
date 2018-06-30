import React from "react";
import PropTypes from "prop-types";
import Detail from "./Detail";
import entryExImg from "../../images/entry-example.png";
import countsExImg from "../../images/counts-example.png";
import Style from "./Details.css";

const Details = props => {
  const detailsList = props.content.map((detail, i) => (
    <Detail
      key={detail.title.replace(" ", "-")}
      title={detail.title}
      list={detail.list}
      img={detail.img}
    />
  ));
  return (
    <section className={Style.root}>
      <h2 className={Style.title}>Can it save you time?</h2>
      {detailsList}
    </section>
  );
};

Details.defaultProps = {
  content: [
    {
      title: "Does your data contain",
      list: [
        "Rows that represent entries of collected data for your staff",
        "Multiple entries for each individual",
        "Unique identifiers that are consistent across each individual",
        "Entries that occur across an indicated time-period"
      ],
      img: {
        src: entryExImg,
        alt:
          "Example of rows in a dataset that represent time-series entries for a single individual"
      }
    },
    {
      title: "What about",
      list: [
        "Columns that feature numerical counts for each entry",
        "Counts that represent progress (e.g., hours reported, objectives accomplished, sales, etc.)",
        "Progress for individuals that vary over the specified time periods",
        "Data for time periods that you want summed up and compared against targets for that period"
      ],
      img: {
        src: countsExImg,
        alt:
          "Example of counts in a dataset that represent progress individual entries over time"
      }
    }
  ]
};

Details.propTypes = {
  content: PropTypes.array
};

export default Details;
