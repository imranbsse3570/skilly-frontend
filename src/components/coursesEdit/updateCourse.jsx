import React, { useContext, useRef, useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML as stateFromHTMLImport } from "draft-js-import-html";
import { useParams, useNavigate } from "react-router-dom";

import {
  GlobalContext,
  ModalPopUpContext,
  AlertDismissibleContext,
} from "../../App";
import EditorContainer from "../higher-order-component/EditorContainer";
import ListInput from "../higher-order-component/ListInput";
import {
  updateCourse,
  getCourseData,
  deleteCourse,
} from "../../services/course";
import { getCategories } from "../../services/category";
import { getMyProfileData } from "../../services/account";
import AddNewLecture from "../lectures/AddLectures";

const UpdateCourse = () => {
  const { courseSlug } = useParams();
  const previewImageRef = useRef();
  const navigate = useNavigate();

  const { userData, updateProfile } = useContext(GlobalContext);

  const { setModalData, setModalShow, setCallback } =
    useContext(ModalPopUpContext);

  // Alert Dismissible Context
  const { setShowPopUp, setPopUpData, setStyle } = useContext(
    AlertDismissibleContext
  );

  const [courseData, setCourseData] = useState(undefined);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [language, setLanguage] = useState("English");
  const [requirements, setRequirements] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [category, setCategory] = useState();

  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setCategoriesList(categories.data.docs);
        const { data } = await getCourseData(courseSlug);

        if (data.docs.length > 0) {
          const courseInfo = data.docs[0];
          setCourseData(courseInfo);
          setTitle(courseInfo.title);
          setSummary(courseInfo.summary);

          setDescription(
            EditorState.createWithContent(
              stateFromHTMLImport(courseInfo.description)
            )
          );

          setPrice(courseInfo.price);
          setComparePrice(courseInfo.comparePrice);
          setIsPublished(courseInfo.isPublished);

          setLanguage(courseInfo.languages);
          setRequirements(courseInfo.requirements);
          setObjectives(courseInfo.objectives);
          setCategory(courseInfo.category._id);
          setPreviewImage(
            `https://skilly-online.herokuapp.com/files/coursePreview/${courseInfo.previewImage}`
          );
        }

        setIsLoading(false);
      } catch (err) {
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: err.message,
        });
      }
    };

    fetchData();
  }, []);

  const deleteCourseHandler = async (e) => {
    e.preventDefault();
    setModalShow(true);

    setModalData({
      heading: "Delete",
      body: <p>Are you sure you want to delete?</p>,
    });

    setCallback(() => async () => {
      try {
        const id = courseData._id;

        await deleteCourse(id);

        const { data } = await getMyProfileData();

        updateProfile(data.user);

        setPopUpData({
          popupType: "success",
          heading: "Success",
          body: <p>Course {title} is successfully deleted</p>,
        });
        setShowPopUp(true);

        setTimeout(() => {
          navigate("../../../users/myCourses");
        }, 3000);
      } catch (err) {
        console.log(err);
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: err.message,
        });
        setShowPopUp(true);
      }
    });
  };

  const createCourseSubmit = async (e) => {
    e.preventDefault();
    setModalShow(true);

    setModalData({
      heading: "Update",
      body: <p>Are you sure you want to save changes?</p>,
    });

    setCallback(() => async () => {
      try {
        const formdata = new FormData();

        formdata.append("isPublished", isPublished);
        formdata.append("languages", language);
        if (courseData.title !== title) {
          formdata.append("title", title);
        }
        formdata.append(
          "description",
          stateToHTML(description.getCurrentContent())
        );
        formdata.append("summary", summary);
        requirements.forEach((requirement) => {
          formdata.append("requirements", requirement);
        });

        formdata.append("price", price);
        if (price <= comparePrice) {
          formdata.append("comparePrice", comparePrice);
        }

        formdata.append("category", category);
        objectives.forEach((objective) => {
          formdata.append("objectives", objective);
        });

        await updateCourse(courseData._id, formdata);

        const { data } = await getMyProfileData();

        updateProfile(data.user);

        setPopUpData({
          popupType: "success",
          heading: "Success",
          body: <p>Course {title} is updated successfully</p>,
        });
      } catch (err) {
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: err.message,
        });
      }
      setShowPopUp(true);
    });
  };

  const handleImageChange = async (e) => {
    const fileObject = e.target.files[0];
    const formData = new FormData();

    formData.append(
      "previewImage",
      fileObject,
      URL.createObjectURL(fileObject)
    );

    const updatedCourse = await updateCourse(courseData._id, formData);
    setCourseData(updatedCourse);
    setPreviewImage(
      `https://skilly-online.herokuapp.com/files/coursePreview/${updateCourse.previewImage}`
    );
  };

  const chooseFile = () => {
    previewImageRef.current.click();
  };

  return (
    <div className="container py-sm-custom-5">
      {userData ? (
        <>
          {!isLoading ? (
            courseData ? (
              userData._id.toString() === courseData.author._id.toString() ||
              userData.role === "admin" ? (
                <>
                  <div className="row">
                    <div className="col-lg-12 m-auto text-center">
                      <div className="sec-heading">
                        <h2>Update Course</h2>
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
                              style={{
                                overflow: "hidden",
                                position: "relative",
                              }}
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
                                  <i
                                    className="fas fa-camera"
                                    onClick={() => {}}
                                  ></i>
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
                          <Form.Group
                            className="text-left mb-2"
                            controlId="courseTitle"
                          >
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
                              controlId="price"
                            >
                              <Form.Label>Price:</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="comparePrice"
                            >
                              <Form.Label>Compare Price:</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Compare Price"
                                value={comparePrice}
                                onChange={(e) =>
                                  setComparePrice(e.target.value)
                                }
                              />
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="published"
                            >
                              <Form.Label>Published:</Form.Label>
                              <Form.Control
                                className="me-sm-2"
                                as="select"
                                onChange={(e) => {
                                  setIsPublished(e.target.value);
                                }}
                                value={isPublished}
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </Form.Control>
                            </Form.Group>
                          </Row>

                          <Row className="mb-2 cst">
                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="language"
                            >
                              <Form.Label>Languages:</Form.Label>
                              <Form.Control
                                className="me-sm-2"
                                as="select"
                                onChange={(e) => {
                                  setLanguage(e.target.value);
                                }}
                                defaultValue={language}
                              >
                                <option value="English">English</option>
                                <option value="Urdu">Urdu</option>
                                <option value="German">German</option>
                                <option value="Dutch">Dutch</option>
                                <option value="Italian">Italian</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Spanish">Spanish</option>
                              </Form.Control>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="category"
                            >
                              <Form.Label>Category:</Form.Label>
                              <Form.Control
                                className="me-sm-2"
                                as="select"
                                onChange={(e) => {
                                  setCategory(e.target.value);
                                }}
                                value={category}
                              >
                                <option value={undefined}>
                                  Choose a Category
                                </option>
                                {categoriesList.map((cat) => (
                                  <option key={cat._id} value={cat._id}>
                                    {cat.title}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Row>

                          <Row className="mb-2">
                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="requirements"
                            >
                              <Form.Label>Requirements:</Form.Label>
                              <ListInput
                                requirements={requirements}
                                setRequirements={setRequirements}
                                placeholder="Requirements"
                              />
                            </Form.Group>
                          </Row>

                          <Row className="mb-2">
                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="objectives"
                            >
                              <Form.Label>Objectives:</Form.Label>
                              <ListInput
                                requirements={objectives}
                                setRequirements={setObjectives}
                                placeholder="Objectives"
                              />
                            </Form.Group>
                          </Row>

                          <Row className="mb-2">
                            <Form.Group
                              as={Col}
                              className="text-left"
                              controlId="summary"
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
                              controlId="description"
                            >
                              <Form.Label>Description:</Form.Label>
                              <EditorContainer
                                editorState={description}
                                setEditorState={setDescription}
                              />
                            </Form.Group>
                          </Row>

                          <Button
                            className="w-100 mb-2"
                            style={{ height: 60 }}
                            variant="primary"
                            type="submit"
                          >
                            Update Course
                          </Button>

                          <Button
                            className="w-100"
                            style={{ height: 60 }}
                            variant="danger"
                            onClick={deleteCourseHandler}
                          >
                            Delete Course
                          </Button>
                        </div>
                      </div>
                    </Form>
                    <AddNewLecture
                      lectures={courseData.lectures}
                      courseId={courseData._id}
                    />
                  </div>
                </>
              ) : (
                <p className="text-center">Access Denied</p>
              )
            ) : (
              <p className="text-center">No Data to Display</p>
            )
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </>
      ) : (
        <p className="text-center">Please Login to view this page</p>
      )}
    </div>
  );
};

export default UpdateCourse;
