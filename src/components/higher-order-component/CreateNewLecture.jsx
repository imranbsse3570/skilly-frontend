import React, { useState } from "react";
import { ListGroupItem, Form, Button, Col, Row } from "react-bootstrap";

const CreateNewLecture = ({ courseId, handleAddLecture }) => {
  const [addLecture, setAddLecture] = useState(false);

  const [title, setTitle] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(undefined);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("isLocked", isLocked);
    formData.append("description", description);

    if (videoFile) {
      formData.append(
        "lectureVideo",
        videoFile,
        URL.createObjectURL(videoFile)
      );
    }

    await handleAddLecture(formData, courseId);
  };

  const handleMediaChange = (e) => {
    const fileObject = e.target.files[0];
    setVideoFile(fileObject);
  };

  return (
    <ListGroupItem
      style={{ overflow: "hidden", transition: "0.5s all linear" }}
      className="w-100"
    >
      <div
        onClick={() => {
          setAddLecture(!addLecture);
        }}
        className="row bg-light"
      >
        <i className="fas fa-plus-circle col-1 py-1"></i>
        <span className="col-11">Add New Lectures</span>
      </div>
      <div
        className={`videoAdmin-item border-top ${
          addLecture ? "show pt-2" : "hide"
        }`}
      >
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="text-left mb-2" controlId="lectureTitle">
            <Form.Label>Lecture Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-2">
            <Form.Group as={Col} controlId="formFile" className="mb-3">
              <Form.Label>Lecture Video</Form.Label>
              <Form.Control type="file" onChange={handleMediaChange} />
            </Form.Group>

            <Form.Group as={Col} className="text-left" controlId="published">
              <Form.Label>Is Locked:</Form.Label>
              <Form.Control
                className="me-sm-2"
                as="select"
                onChange={(e) => {
                  setIsLocked(e.target.value === "true");
                }}
                value={isLocked}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Form.Group className="text-left" controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "100px" }}
            />
          </Form.Group>

          <Button
            className="w-100 mb-2"
            style={{ height: 60 }}
            variant="primary"
            type="submit"
          >
            Add New Lecture
          </Button>
        </Form>
      </div>
    </ListGroupItem>
  );
};

export default CreateNewLecture;
