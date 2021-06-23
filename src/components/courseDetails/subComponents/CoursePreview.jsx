import React from "react";
import { NavLink as Link } from "react-router-dom";

const CoursePreview = ({ src, title }) => {
  return (
    <div class="course-preview box-shadow">
      <img
        src={`https://skilly-online.herokuapp.com/files/coursePreview/${src}`}
        alt={title}
      />
      <Link to={"/coursesId/lectures/lectureId"} as="a" className="preview-btn">
        <i class="fas fa-play"></i>
      </Link>
    </div>
  );
};

export default CoursePreview;
