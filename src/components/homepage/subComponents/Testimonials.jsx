import React from "react";
import Slideshow from "../../higher-order-component/Slideshow";
import Testimonial from "./Testimonial";

const Testimonials = ({ data }) => {
  let title = data.title ? <h2>{data.title}</h2> : "";
  let subTitle = data.subTitle ? <h5>{data.subTitle}</h5> : "";
  let testimonialSlide = "";
  if (data.testimonial && data.testimonial.length > 0) {
    testimonialSlide = data.testimonial.map((item, key) => {
      return (
        <Testimonial
          key={`${item.title}--${key}`}
          name={item.name}
          detail={item.detail}
          title={item.reviewTitle}
          reviewIconOpening={item.reviewIconOpening}
          reviewIconClosing={item.reviewIconClosing}
          isSliderItem={data.sliderConfig ? true : false}
        />
      );
    });
  }

  return (
    <div
      style={
        data.bgImage
          ? {
              backgroundImage: `url(${data.bgImage})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }
          : {}
      }
      className="testimonials-homepage p-5"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9 m-auto text-center">
            <div className="sec-heading">
              {subTitle}
              {title}
            </div>
          </div>
        </div>
        <div className="testimonial-body">
          {data.sliderConfig ? (
            <Slideshow settings={data.sliderConfig}>
              {testimonialSlide}
            </Slideshow>
          ) : (
            <div className="row">{testimonialSlide}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
