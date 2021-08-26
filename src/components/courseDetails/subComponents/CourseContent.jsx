import React from "react";
import { NavLink as Link } from "react-router-dom";

const CourseContent = ({
  additionalClass,
  title,
  summary,
  author,
  createdAt,
  noOfReviews,
  rating,
}) => {
  return (
    <div className={`course-content box-shadow ${additionalClass}`}>
      <h3>{title}</h3>
      <p>{summary}</p>
      <div className="details">
        <span>
          By&nbsp;
          <Link to="/" as="a">
            {author}
          </Link>
        </span>
        <span>Created At {new Date(createdAt).toDateString()}</span>
        <div className="ratings">
          <i className={`${rating >= 1 ? "fas" : "far"} fa-star`}></i>
          <i className={`${rating >= 2 ? "fas" : "far"} fa-star`}></i>
          <i className={`${rating >= 3 ? "fas" : "far"} fa-star`}></i>
          <i className={`${rating >= 4 ? "fas" : "far"} fa-star`}></i>
          <i className={`${rating >= 5 ? "fas" : "far"} fa-star`}></i>
          <span style={{ paddingLeft: 10 }}>{noOfReviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
