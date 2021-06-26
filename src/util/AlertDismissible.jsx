import React from "react";
import { Alert } from "react-bootstrap";
const AlertDismissible = ({ data }) => {
  const { showPopup, setShowPopUp, popupData, style } = data;

  if (showPopup) {
    return (
      <div
        className="alert-overlay"
        onClick={(e) => {
          if (e.target.className.includes("alert-overlay")) {
            setShowPopUp(false);
          }
        }}
      >
        <Alert
          className="custom-alert"
          style={style}
          variant={popupData.popupType}
          onClose={() => setShowPopUp(false)}
          dismissible
        >
          <Alert.Heading>
            <span>{popupData.heading}</span>
          </Alert.Heading>
          <div className="mb-0">{popupData.body}</div>
        </Alert>
      </div>
    );
  }
  return <span></span>;
};

export default AlertDismissible;
