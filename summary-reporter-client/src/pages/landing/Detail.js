import React from "react";
import PropTypes from "prop-types";
import Style from "./Detail.css";

const Detail = ({ title, list, img }) => {
  const detailList = list.map((item, i) => (
    <li key={`${i}-${title.replace(" ", "-")}`} className={Style.item}>
      {item}
    </li>
  ));
  return (
    <div className={Style.root}>
      <div className={Style.textBox}>
        <h3 className={Style.title}>{title}</h3>
        <ul className={Style.list}>{detailList}</ul>
      </div>
      <div className={Style.imgBox}>
        <img className={Style.img} src={img.src} alt={img.alt} />
      </div>
    </div>
  );
};

Detail.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  img: PropTypes.object
};

export default Detail;
