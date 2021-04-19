import React from "react";
import Slider from "react-slick";

const Slideshow = ({ children, settings }) => {
  return (
    <div className="global-slider">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Slideshow;
