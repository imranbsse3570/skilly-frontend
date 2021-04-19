import React from "react";
import Slideshow from "../higher-order-component/Slideshow";
import SlideWithCaption from "../higher-order-component/SlideWithCaption";

const HomePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };

  return (
    <div>
      <Slideshow settings={settings}>
        <SlideWithCaption
          slideImg="https://picsum.photos/id/237/800/400"
          slideImgAlt="Slide 1"
          slideHeading="Lorem IpSum 1"
          slideDetail="Lorem Ipsum Lorem Ipsum"
        />
        <SlideWithCaption
          slideImg="https://picsum.photos/seed/picsum/800/400"
          slideImgAlt="Slide 1"
          slideHeading="Lorem IpSum 2"
          slideDetail="Lorem Ipsum Lorem Ipsum"
        />
        <SlideWithCaption
          slideImg="https://picsum.photos/id/237/800/400?grayscale"
          slideImgAlt="Slide 2"
          slideHeading="Lorem IpSum 3"
          slideDetail="Lorem Ipsum Lorem Ipsum"
        />
      </Slideshow>
    </div>
  );
};

export default HomePage;
