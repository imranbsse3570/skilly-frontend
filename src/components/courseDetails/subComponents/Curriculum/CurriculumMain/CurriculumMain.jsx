import React from "react";
import CurriculumSub from "../../../../higher-order-component/CurriculumSub";

const CurriculumMain = () => {
  return (
    <ul className="list-group list-unstyled py-4">
      <li>
        <CurriculumSub />
      </li>
      <li>
        <CurriculumSub />
      </li>
      <li>
        <CurriculumSub />
      </li>
      <li>
        <CurriculumSub />
      </li>
      <li>
        <CurriculumSub />
      </li>
    </ul>
  );
};

export default CurriculumMain;
