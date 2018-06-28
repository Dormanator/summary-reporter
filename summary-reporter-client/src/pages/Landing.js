import React from "react";
import Hero from "./landing/Hero";
import Footer from "./landing/Footer";
import Style from "./landing/Landing.css";

const Landing = props => {
  return (
    <div className={Style.root}>
      <Hero />
      <Footer />
    </div>
  );
};

export default Landing;
