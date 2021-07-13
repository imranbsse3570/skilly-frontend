import React, { useState, useContext } from "react";

import { AlertDismissibleContext } from "../../../App";
import MediaPlayer from "../../higher-order-component/MediaPlayer";

const CoursePreview = ({ src, title, lectures, courseId }) => {
  // Alert Dismissible Context
  const { setShowPopUp, setPopUpData, setStyle } = useContext(
    AlertDismissibleContext
  );

  const videoUrl =
    lectures.length > 0
      ? `https://skilly-online.herokuapp.com/files/${courseId}/lectures/${lectures[0]}`
      : "";

  return (
    <div className="course-preview box-shadow">
      <img
        src={`https://skilly-online.herokuapp.com/files/coursePreview/${src}`}
        alt={title}
      />
      <span
        className="preview-btn"
        onClick={() => {
          setShowPopUp(true);
          setPopUpData({
            heading: title,
            body: <MediaPlayer videoUrl={videoUrl} />,
            popupType: "dark",
          });
          setStyle({
            maxWidth: "80%",
            width: "80%",
            border: "1px solid",
          });
        }}
      >
        <i className="fas fa-play"></i>
      </span>
    </div>
  );
};

export default CoursePreview;
