import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";

import CodeEditor from "../../higher-order-component/CodeEditor";
import CourseContent from "../../courseDetails/subComponents/CourseContent";
import { generateCertificate } from "../../../services/course";

const VideoDetails = ({ courseData }) => {
  console.log(courseData._id);

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
        <Tab eventKey="certificate" title="Generate Certificate">
          <div className="m-2">
            <Button
              onClick={async () => {
                await generateCertificate().then(function (blob) {
                  saveAs(
                    new Blob([blob], { type: "application/pdf" }),
                    `${courseData.title}-${Date.now()}.pdf`
                  );
                });
              }}
            >
              Generate Certificate
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default VideoDetails;
