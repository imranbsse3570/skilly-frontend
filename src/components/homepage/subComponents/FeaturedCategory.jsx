import React from "react";
import ProductGrid from "../../higher-order-component/ProductGrid";
import Slideshow from "../../higher-order-component/Slideshow";

const FeaturedCategory = ({ data }) => {
  let slides = undefined;

  if (data.courses && data.courses.length > 0) {
    slides = data.courses.map((item, index) => {
      return (
        <div className="p-2" key={`${item}--${index}`}>
          <ProductGrid course={item} />
        </div>
      );
    });
  }

  return (
    <div className="container p-5">
      {data.title ? (
        <div className="row mb-5">
          <h1 className="h2 col-lg-7 col-md-9 mx-auto text-center">
            {data.title}
          </h1>
        </div>
      ) : (
        ""
      )}
      {slides ? (
        data.sliderConfig ? (
          <Slideshow settings={data.sliderConfig}>{slides}</Slideshow>
        ) : (
          <div className="row">{slides}</div>
        )
      ) : (
        "No Content"
      )}
    </div>
  );
};

export default FeaturedCategory;
