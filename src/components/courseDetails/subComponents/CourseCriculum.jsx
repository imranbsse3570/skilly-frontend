import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import OverView from "./OverView/OverView";
import Curriculum from "./Curriculum/Curriculum";
import CourseObjective from "./CourseObjective/CourseObjective";

const CourseCriculum = ({ course }) => {
  return (
    <div className="courseCricullum box-shadow">
      <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
        <Tab eventKey="overview" title="Overview">
          {
            <OverView
              description={course.description}
              totalDuration={course.totalDuration}
              noOfLectures={course.lectures.length}
              requirements={course.requirements}
            />
          }
        </Tab>
        <Tab eventKey="curriculum" title="Curriculum">
          {<Curriculum lectures={course.lectures} courseId={course._id} />}
        </Tab>
        <Tab eventKey="objective" title="Objective">
          {<CourseObjective objectives={course.objectives} />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default CourseCriculum;
