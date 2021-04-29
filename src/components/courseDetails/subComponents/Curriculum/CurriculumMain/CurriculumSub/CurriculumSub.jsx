import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const CurriculumSub = () => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Toggle
        as={Card.Header}
        eventKey="1"
        className="list-group-item"
      >
        <span>Section Title</span>
        <span className="float-right">00:00</span>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <div>
          <ul className="list-group list-unstyled">
            <li className="list-group-item py-2 bg-light">
              <small className="pr-2">
                <i class="fas fa-play"></i>
              </small>
              Title of the Video
            </li>
            <li className="list-group-item py-2 bg-light">
              <small className="pr-2">
                <i class="fas fa-play"></i>
              </small>
              Title of the Video
            </li>
            <li className="list-group-item py-2 bg-light">
              <small className="pr-2">
                <i class="fas fa-play"></i>
              </small>
              Title of the Video
            </li>
            <li className="list-group-item py-2 bg-light">
              <small className="pr-2">
                <i class="fas fa-play"></i>
              </small>
              Title of the Video
            </li>
            <li className="list-group-item py-2 bg-light">
              <small className="pr-2">
                <i class="fas fa-play"></i>
              </small>
              Title of the Video
            </li>
          </ul>
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default CurriculumSub;
