import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CodeEditor from "../../higher-order-component/CodeEditor";

const VideoDetails = () => {
  return (
    <div className="box-shadow my-4 border border-top-0">
      <Tabs className="border-top" defaultActiveKey="overview">
        <Tab eventKey="overview" title="Overview"></Tab>
        <Tab eventKey="questionanswer" title="Q & A"></Tab>
        <Tab eventKey="codeeditor" title="Code Editor">
          <CodeEditor />
        </Tab>
      </Tabs>
    </div>
  );
};

export default VideoDetails;
