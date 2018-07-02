import React from "react";
import Hero from "./landing/Hero";
import Features from "./landing/Features";
import Details from "./landing/Details";
import Try from "./landing/Try";
import Footer from "./landing/Footer";

const Landing = props => {
  return (
    <div>
      <Hero />
      <Features />
      <Details />
      <Try />
      <Footer />
    </div>
  );
};

export default Landing;
