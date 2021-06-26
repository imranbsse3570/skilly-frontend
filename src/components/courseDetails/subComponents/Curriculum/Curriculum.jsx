import React from "react";
import CurriculumMain from "./CurriculumMain/CurriculumMain";
const Curriculum = ({ lectures, courseId }) => {
  return (
    <div className="container border border-top-0">
      {<CurriculumMain lectures={lectures} courseId={courseId} />}
    </div>
  );
};

export default Curriculum;
