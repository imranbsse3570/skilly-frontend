import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AlertDismissible from "../../util/AlertDismissible";
import MediaPlayer from "../higher-order-component/MediaPlayer";

const CurriculumSub = ({ openState, changeVideo, lecture, courseId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

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
                    setShowPopup(true);
                    setVideoUrl(
                      `https://skilly-online.herokuapp.com/files/${courseId}/lectures/${lecture.source}`
                    );
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
      <AlertDismissible
        data={{
          style: {
            maxWidth: "80%",
            width: "80%",
            border: "1px solid",
          },
          showPopup,
          setShowPopUp: setShowPopup,
          popupData: {
            heading: lecture.title,
            body: <MediaPlayer videoUrl={videoUrl} />,
            popupType: "dark",
          },
        }}
      />
    </div>
  );
};

export default CurriculumSub;
