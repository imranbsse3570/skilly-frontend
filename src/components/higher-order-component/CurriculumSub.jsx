import React, { useContext } from "react";
import { Accordion, Card } from "react-bootstrap";

import { AlertDismissibleContext } from "../../App";
import MediaPlayer from "../higher-order-component/MediaPlayer";

const CurriculumSub = ({ openState, changeVideo, lecture, courseId }) => {
  // Alert Dismissible Context
  const { setShowPopUp, setPopUpData, setStyle } = useContext(
    AlertDismissibleContext
  );

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
                onClick={() => {
                  if (!lecture.isLocked) {
                    setShowPopUp(true);
                    setStyle({
                      maxWidth: "80%",
                      width: "80%",
                      border: "1px solid",
                    });

                    setPopUpData({
                      heading: lecture.title,
                      body: (
                        <MediaPlayer
                          videoUrl={`https://skilly-online.herokuapp.com/files/${courseId}/lectures/${lecture.source}`}
                        />
                      ),
                      popupType: "dark",
                    });
                  }
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

export default CurriculumSub;
