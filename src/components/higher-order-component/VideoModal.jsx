import React from "react";
import { Modal } from "react-bootstrap";
import MediaPlayer from "./MediaPlayer";

const VideoModal = ({ videoUrl, showVideoModal, setShowVideoModal, title }) => {
  return (
    <>
      <Modal
        show={showVideoModal}
        onHide={() => setShowVideoModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MediaPlayer videoUrl={videoUrl} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoModal;
