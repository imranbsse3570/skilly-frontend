import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopUpModal = ({ show, onHide, setOk, data, callback }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide(false);
        setOk(false);
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{data.heading}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{data.body}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            setOk(false);
            onHide(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOk(true);
            onHide(false);
            callback();
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpModal;
