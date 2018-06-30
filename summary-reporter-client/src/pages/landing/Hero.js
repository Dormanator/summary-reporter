import React from "react";
import Btn from "../../components/Btn";
import Style from "./Hero.css";

const Hero = props => {
  return (
    <header className={Style.root}>
      <div className={Style.content}>
        <h1 className={Style.title}>Summary Reporter</h1>
        <h2 className={Style.subtitle}>
          Saving You Time, So You Can Focus On What's Important
        </h2>
        <Btn link="/upload" modifiers={["lrg"]}>
          Get Started!
        </Btn>
      </div>
    </header>
  );
};

export default Hero;
