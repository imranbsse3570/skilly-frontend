import React from "react";
import { Accordion, Card } from "react-bootstrap";

import { viewLecture } from "../../../services/lecture";

const Curriculum = ({
  openState,
  setVideoUrl,
  lecture,
  courseId,
  setBlobDownload,
}) => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={openState ? openState : 1}
          className="list-group-item"
        >
          <span>{lecture.title}</span>
          <span className="float-right">
            {Math.floor(lecture.duration / 60)}: {lecture.duration % 60}
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={openState ? openState : 1}>
          <div>
            <ul className="list-group list-unstyled">
              <li
                onClick={async () => {
                  await viewLecture(courseId, lecture.source)
                    .then(function (myBlob) {
                      setBlobDownload({ blob: myBlob, title: lecture.title });
                      var objectURL = URL.createObjectURL(myBlob);
                      setVideoUrl(objectURL);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className="list-group-item py-2 bg-light"
              >
                <small className="pr-2">
                  <i className="fas fa-play"></i>
                </small>
                {lecture.description}
              </li>
            </ul>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export default Curriculum;
