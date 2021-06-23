import React from "react";
import { Alert } from "react-bootstrap";
const AlertDismissible = ({ data }) => {
  const { showPopup, setShowPopUp, popupData } = data;

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
          variant={popupData.popupType}
          onClose={() => setShowPopUp(false)}
          dismissible
        >
          <Alert.Heading>{popupData.heading}</Alert.Heading>
          <p className="mb-0">{popupData.body}</p>
        </Alert>
      </div>
    );
  }
  return <span></span>;
};

export default AlertDismissible;
