import React from "react";
import { NavLink as Link } from "react-router-dom";

const CoursePreview = () => {
  return (
    <div class="course-preview box-shadow">
      <img src="https://picsum.photos/id/237/800/600?grayscale" alt="" />
      <Link to={"/coursesId/lectures/lectureId"} as="a" className="preview-btn">
        <i class="fas fa-play"></i>
      </Link>
    </div>
  );
};

export default CoursePreview;
