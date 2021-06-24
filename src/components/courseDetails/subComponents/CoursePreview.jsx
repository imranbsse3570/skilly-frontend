import React, { useState } from "react";
import AlertDismissible from "../../../util/AlertDismissible";
import MediaPlayer from "../../higher-order-component/MediaPlayer";

const CoursePreview = ({ src, title, lectures, courseId }) => {
  const [showPopup, setShowPopup] = useState(false);
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
          setShowPopup(true);
        }}
      >
        <i className="fas fa-play"></i>
      </span>
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
            heading: title,
            body: <MediaPlayer videoUrl={videoUrl} />,
            popupType: "dark",
          },
        }}
      />
    </div>
  );
};

export default CoursePreview;
