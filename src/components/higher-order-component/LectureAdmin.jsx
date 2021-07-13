import React, { useState, useContext } from "react";
import { ListGroupItem, Form, Button, Row, Col } from "react-bootstrap";

import { ModalPopUpContext } from "../../App";
import { viewLecture } from "../../services/lecture";

const LectureAdmin = ({
  lecture,
  handleUpdate,
  courseId,
  handleDelete,
  setVideoUrl,
  setShowVideoModal,
}) => {
  // toggle states
  const [showDescription, setShowDescription] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { setModalData, setModalShow, setCallback } =
    useContext(ModalPopUpContext);

  // edit lecture state
  const [title, setTitle] = useState(lecture.title);
  const [isLocked, setIsLocked] = useState(lecture.isLocked);
  const [description, setDescription] = useState(lecture.description);
  const [videoFile, setVideoFile] = useState(undefined);

  const handleMediaChange = (e) => {
    const fileObject = e.target.files[0];
    setVideoFile(fileObject);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("isLocked", isLocked);
      formData.append("description", description);
      formData.append("title", title);

      if (videoFile) {
        formData.append(
          "lectureVideo",
          videoFile,
          URL.createObjectURL(videoFile)
        );
      }

      setModalShow(true);

      setModalData({
        heading: "Update",
        body: <p>Are you sure you want to Save changes?</p>,
      });

      setCallback(() => async () => {
        await handleUpdate(courseId, lecture._id, formData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsLockedPatch = async () => {
    try {
      const formData = new FormData();
      formData.append("isLocked", isLocked);

      await handleUpdate(courseId, lecture._id, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListGroupItem
      style={{ overflow: "hidden", transition: "0.5s all linear" }}
      className="w-100 pb-0"
    >
      <div className="row bg-light">
        <div className="col-1">
          <i
            onClick={async () => {
              setShowVideoModal(true);
              (await viewLecture(courseId, lecture.source))
                .then(function (myBlob) {
                  var objectURL = URL.createObjectURL(myBlob);
                  setVideoUrl(objectURL);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="fas fa-play"
          ></i>
        </div>
        <div className="col-7">
          <span>{lecture.title}</span>
          <span className="float-right">
            {Math.floor(lecture.duration / 60)}: {lecture.duration % 60}
          </span>
        </div>
        <div className="col-1">
          <i
            onClick={() => {
              setIsLocked(!isLocked);
              handleIsLockedPatch();
            }}
            className={`fas ${isLocked ? "fa-lock" : "fa-lock-open"}`}
          ></i>
        </div>
        <div className="col-1">
          <i onClick={() => setShowEdit(!showEdit)} className="far fa-edit"></i>
        </div>
        <div className="col-1">
          <i
            onClick={async () => {
              try {
                setModalShow(true);

                setModalData({
                  heading: "Delete",
                  body: <p>Are you sure you want to Delete changes?</p>,
                });

                setCallback(() => async () => {
                  await handleDelete(courseId, lecture._id);
                });
              } catch (err) {
                console.log(err);
              }
            }}
            className="far fa-trash-alt"
          ></i>
        </div>
        <div className="col-1">
          <i
            onClick={() => setShowDescription(!showDescription)}
            className="fas fa-chevron-down"
          ></i>
        </div>
      </div>
      <div
        className={`py-2 border-top videoAdmin-item ${
          showDescription ? "show" : "hide"
        }`}
      >
        {lecture.description}
      </div>
      <div className={`videoAdmin-item ${showEdit ? "show" : "hide"}`}>
        <Form onSubmit={(e) => handleSubmitForm(e)}>
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
                  setIsLocked(e.target.value);
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
            Save Changes
          </Button>
        </Form>
      </div>
    </ListGroupItem>
  );
};

export default LectureAdmin;
