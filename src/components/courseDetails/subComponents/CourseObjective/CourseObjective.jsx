import React from "react";
const CourseObjective = ({ objectives }) => {
  return (
    <div className="container p-3 border border-top-0">
      <div className="tab-pane">
        <h3>You will learn form this course</h3>
        <ul className="list-unstyled">
          {objectives.map((objective, index) => (
            <li key={`objective--${index}`}>
              <i className="far fa-hand-point-right pr-2"></i>
              {objective}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseObjective;
