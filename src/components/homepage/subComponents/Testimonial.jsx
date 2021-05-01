import React from "react";

const Testimonial = ({
  name: authorName,
  detail: reviewDetail,
  title,
  reviewIconOpening,
  reviewIconClosing,
  isSliderItem,
}) => {
  let name = authorName ? (
    <p>
      <small className="author-name">-{authorName}</small>
    </p>
  ) : (
    ""
  );
  let detail = reviewDetail ? (
    <p className="author-detail">{reviewDetail}</p>
  ) : (
    ""
  );
  let reviewTitle = title ? <h3 className="reviewTitle ">{title}</h3> : "";
  return (
    <div
      className={`testimonial m-2 rounded p-3 ${
        isSliderItem ? "" : "col-md-4 col-sm-6"
      }`}
    >
      <p className="review-icon-opening">
        <i
          className={
            reviewIconOpening ? reviewIconOpening : "fas fa-quote-left"
          }
        />
      </p>
      <div className="text-center">
        {reviewTitle}
        {detail}
        {name}
      </div>
      <p className="review-icon-closing">
        <i
          className={
            reviewIconClosing ? reviewIconClosing : "fas fa-quote-right"
          }
        />
      </p>
    </div>
  );
};

export default Testimonial;
