import React, { useContext, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { EditorState } from "draft-js";

import { GlobalContext } from "../../App";
import AlertDismissible from "../../util/AlertDismissible";
import EditorContainer from "../higher-order-component/EditorContainer";

const CreateNewCourse = () => {
  const previewImageRef = useRef();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    "https://skilly-online.herokuapp.com/files/coursePreview/default.jpg"
  );

  const [showPopup, setShowPopUp] = useState(false);
  const [popupData, setPopUpData] = useState({});

  const { userData, updateProfile } = useContext(GlobalContext);

  const createCourseSubmit = async () => {};

  const handleImageChange = () => {};

  const chooseFile = () => {
    previewImageRef.current.click();
  };

  return (
    <div className="container py-5">
      {userData ? (
        userData.role !== "student" ? (
          <>
            <div className="row">
              <div className="col-lg-12 m-auto text-center">
                <div className="sec-heading">
                  <h2>Create New Course</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <Form className="w-100" onSubmit={createCourseSubmit}>
                <div className="row">
                  <div className="col-md-4 w-sm-75 mx-auto text-center">
                    <div
                      className="mb-2"
                      style={{
                        position: "sticky",
                        top: "50px",
                        transition: "all 0.5s ease-in-out",
                      }}
                    >
                      <div
                        className="rounded-circle profile-upload"
                        style={{ overflow: "hidden", position: "relative" }}
                      >
                        <img
                          width="100%"
                          className="rounded-circle border"
                          src={previewImage}
                          style={{
                            aspectRatio: "4/4",
                            objectFit: "cover",
                            objectPosition: "center center",
                          }}
                          alt="my profile"
                        />
                        <div
                          onClick={chooseFile}
                          className="overlay-photo-upload"
                        >
                          <p
                            style={{
                              position: "relative",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <i className="fas fa-camera" onClick={() => {}}></i>
                            <input
                              className="d-none"
                              ref={previewImageRef}
                              onChange={handleImageChange}
                              type="file"
                              accept="image/*"
                              name="photo"
                              id="photo"
                            />
                            <span className="pl-2">Upload Image</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-9 m-auto text-center">
                    <Form.Group className="text-left mb-2" controlId="name">
                      <Form.Label>Course Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Row className="mb-2 cst">
                      <Form.Group
                        as={Col}
                        className="text-left"
                        controlId="designation"
                      >
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} className="text-left">
                        <Form.Label>Compare Price:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Compare Price"
                          value={comparePrice}
                          onChange={(e) => setComparePrice(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} className="text-left">
                        <Form.Label>Published:</Form.Label>
                        <Form.Control
                          className="me-sm-2"
                          id="inlineFormCustomSelect"
                          as="select"
                          onChange={(e) => {
                            setIsPublished(e.target.value);
                          }}
                          defaultValue={isPublished}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Form.Control>
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        className="text-left"
                        controlId="facebookLink"
                      >
                        <Form.Label>Summary:</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Summary"
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          style={{ height: "100px" }}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        className="text-left"
                        controlId="twitterLink"
                      >
                        <Form.Label>Description:</Form.Label>
                        <EditorContainer
                          editorState={description}
                          setEditorState={setDescription}
                        />
                        {/* <Form.Control
                          type="text"
                          placeholder="https://www.twitter.com"
                          value={twitterLink}
                          onChange={(e) => setTwitterLink(e.target.value)}
                          disabled={editProfile ? false : true}
                        /> */}
                      </Form.Group>
                    </Row>

                    {/* <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        className="text-left"
                        controlId="linkedInLink"
                      >
                        <Form.Label>LinkedIN Link:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="https://www.linkedin.com"
                          value={linkedInLink}
                          onChange={(e) => setLinkedInLink(e.target.value)}
                          disabled={editProfile ? false : true}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        className="text-left"
                        controlId="youtubeLink"
                      >
                        <Form.Label>Youtube Link:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="https://www.youtube.com"
                          value={youtubeLink}
                          onChange={(e) => setYoutubeLink(e.target.value)}
                          disabled={editProfile ? false : true}
                        />
                      </Form.Group>
                    </Row> */}

                    <Button
                      className="w-100"
                      style={{ height: 60 }}
                      variant="primary"
                      type="submit"
                    >
                      Create New Course
                    </Button>
                  </div>
                </div>
              </Form>
              <AlertDismissible
                data={{
                  showPopup,
                  setShowPopUp,
                  popupData,
                }}
              />
            </div>
          </>
        ) : (
          <p className="text-center">Access Denied</p>
        )
      ) : (
        <p className="text-center">Please Login to view this page</p>
      )}
    </div>
  );
};

export default CreateNewCourse;
