import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import OverView from "./OverView/OverView";
import Curriculum from "./Curriculum/Curriculum";
import CourseObjective from "./CourseObjective/CourseObjective";

const CourseCriculum = () => {
  return (
    <div className="courseCricullum box-shadow">
      <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
        <Tab eventKey="overview" title="Overview">
          {<OverView />}
        </Tab>
        <Tab eventKey="curriculum" title="Curriculum">
          {<Curriculum />}
        </Tab>
        <Tab eventKey="objective" title="Objective">
          {<CourseObjective />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default CourseCriculum;
