import React from "react";
import { Carousel } from "react-bootstrap";

const SlideWithCaption = ({
  slideImg,
  slideImgAlt,
  imageWidth,
  imageHeight,
  slideHeading,
  slideDetail,
  slideUrl,
  slideText,
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
        <a className="btn btn-primary" href={slideUrl}>
          {slideText}
        </a>
      </Carousel.Caption>
    </Carousel.Item>
  );
};

export default SlideWithCaption;
