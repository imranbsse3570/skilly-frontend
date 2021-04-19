import React from "react";
import { Carousel } from "react-bootstrap";

const SlideWithCaption = ({
  slideImg,
  slideImgAlt,
  imageWidth,
  imageHeight,
  slideHeading,
  slideDetail,
}) => {
  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        width={imageWidth ? imageWidth : "100%"}
        height={imageHeight ? imageHeight : "100%"}
        src={slideImg}
        alt={slideImgAlt ? slideImgAlt : "image"}
      />

      <Carousel.Caption>
        <h3>{slideHeading}</h3>
        <p>{slideDetail}</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
};

export default SlideWithCaption;
