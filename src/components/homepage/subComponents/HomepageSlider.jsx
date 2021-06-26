import React from "react";
import Slideshow from "../../higher-order-component/Slideshow";
import slide1 from "../../../images/slide1.jpg";
import slide2 from "../../../images/slide4.jpg";
import SlideWithCaption from "../../higher-order-component/SlideWithCaption";

const HomepageSlider = ({ data }) => {
  return (
    <Slideshow
      settings={{
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        draggable: true,
        fade: true,
      }}
    >
      <SlideWithCaption
        key="slider1"
        slideImg={slide1}
        slideImgAlt="Slide 1"
        slideHeading="Skilly Online Learning"
        slideDetail="Start Your Career Now, Learn New Technologies"
        slideUrl={`./courses`}
        slideText="View Categories"
      />

      <SlideWithCaption
        key="slider2"
        slideImg={slide2}
        slideImgAlt="Slide 2"
        slideHeading="Learn NextGEN Technologies"
        slideDetail="Start Learning Everything you can imagine"
        slideUrl="./pages/contact-us"
        slideText="Contact Us"
      />
    </Slideshow>
  );
};

export default HomepageSlider;
