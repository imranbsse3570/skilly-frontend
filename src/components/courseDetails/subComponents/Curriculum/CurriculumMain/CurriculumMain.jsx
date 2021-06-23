import React from "react";
import CurriculumSub from "../../../../higher-order-component/CurriculumSub";

const CurriculumMain = ({ lectures, courseId }) => {
  return (
    <ul className="list-group list-unstyled py-4">
      {lectures.map((lecture) => (
        <li key={lecture._id}>
          <CurriculumSub lecture={lecture} courseId={courseId} />
        </li>
      ))}
    </ul>
  );
};

export default CurriculumMain;
