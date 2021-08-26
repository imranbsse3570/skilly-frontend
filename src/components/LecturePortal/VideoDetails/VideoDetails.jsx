import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import CodeEditor from "../../higher-order-component/CodeEditor";
import CourseContent from "../../courseDetails/subComponents/CourseContent";

const VideoDetails = ({ courseData }) => {
  return (
    <div className="box-shadow my-4 border border-top-0">
      <Tabs className="border-top" defaultActiveKey="overview">
        <Tab eventKey="overview" title="Overview">
          <CourseContent
            additionalClass="mb-0"
            title={courseData.title}
            summary={courseData.summary}
            author={courseData.author.name}
            createdAt={courseData.createdAt}
            noOfReviews={courseData.noOfReviews}
            rating={Math.round(courseData.rating)}
          />
        </Tab>
        <Tab eventKey="questionanswer" title="Q & A"></Tab>
        <Tab eventKey="codeeditor" title="Code Editor">
          <CodeEditor />
        </Tab>
        <Tab eventKey="certificate" title="Generate Certificate"></Tab>
      </Tabs>
    </div>
  );
};

export default VideoDetails;
