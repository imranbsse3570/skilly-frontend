import React from "react";

const CourseContent = () => {
  return (
    <div className="course-content box-shadow">
      <h3>HTML5 for beginners</h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, quae
        soluta. Praesentium consequatur odio recusandae nostrum pariatur unde
      </p>
      <div className="details">
        <span>
          By <a href="#">Von wick</a>
        </span>
        <span>Last update 10 Sep. 2019</span>
        <div className="ratings">
          <a href="#">
            <i className="fas fa-star"></i>
          </a>
          <a href="#">
            <i className="fas fa-star"></i>
          </a>
          <a href="#">
            <i className="far fa-star"></i>
          </a>
          <a href="#">
            <i className="far fa-star"></i>
          </a>
          <a href="#">
            <i className="far fa-star"></i>
          </a>
          <span style={{ paddingLeft: 10 }}>0 views</span>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
