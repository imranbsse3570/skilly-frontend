import React from "react";
import Slideshow from "../../higher-order-component/Slideshow";
import SlideWithCaption from "../../higher-order-component/SlideWithCaption";

const HomepageSlider = ({ data }) => {
  let slides = undefined;
  if (data.slides && data.slides.length > 0) {
    slides = data.slides.map((item, index) => {
      return (
        <SlideWithCaption
          key={`${item.slideHeading.replace(/ /g, "-")}--${index}`}
          slideImg={item.slideImg}
          slideImgAlt={item.slideImgAlt}
          slideHeading={item.slideHeading}
          slideDetail={item.slideDetail}
          slideUrl={item.slideUrl}
          slideText={item.slideText}
        />
      );
    });
  }
  return slides ? (
    <Slideshow settings={{ ...data.sliderConfig }}> {slides}</Slideshow>
  ) : (
    <div>No Content</div>
  );
};

export default HomepageSlider;
