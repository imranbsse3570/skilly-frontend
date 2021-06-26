import React, { useContext, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { GlobalContext } from "../../App";
import { updateProfile as updateProfileSave } from "../../services/account";
import AlertDismissible from "../../util/AlertDismissible";

const MyProfileData = () => {
  const { userData, updateProfile } = useContext(GlobalContext);
  const [src, setSrc] = useState(
    `https://skilly-online.herokuapp.com/files/users/${userData.photo}`
  );
  const [editProfile, setEditProfile] = useState(false);

  const [name, setName] = useState(userData.name);
  const [designation, setDesignation] = useState(userData.designation);
  const [role, setRole] = useState(userData.role);
  const [facebookLink, setFacebookLink] = useState(userData.facebookLink);
  const [twitterLink, setTwitterLink] = useState(userData.twitterLink);
  const [linkedInLink, setLinkedInLink] = useState(userData.linkedInLink);
  const [youtubeLink, setYoutubeLink] = useState(userData.youtubeLink);

  const [showPopup, setShowPopUp] = useState(false);
  const [popupData, setPopUpData] = useState({});

  const inputRef = useRef();

  const chooseFile = () => {
    inputRef.current.click();
  };

  const handleChange = async (event) => {
    try {
      const fileObject = event.target.files[0];
      if (!fileObject) return;

      const formdata = new FormData();
      formdata.append("photo", fileObject, URL.createObjectURL(fileObject));

      const result = await updateProfileSave(formdata);

      if (result.status === "success") {
        updateProfile(result.data.user);
        setSrc(URL.createObjectURL(fileObject));
        setPopUpData({
          popupType: "success",
          heading: "Success",
          body: "Profile Picture Changed Successfully",
        });
      } else {
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: result.message,
        });
      }
    } catch (err) {
      setPopUpData({
        popupType: "danger",
        heading: "Error",
        body: err.message,
      });
    }
    setShowPopUp(true);
  };

  const submitUpdateForm = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("role", role);
      formData.append("facebookLink", facebookLink);
      formData.append("twitterLink", twitterLink);
      formData.append("linkedInLink", linkedInLink);
      formData.append("youtubeLink", youtubeLink);

      const result = await updateProfileSave(formData);

      if (result.status === "success") {
        updateProfile(result.data.user);
        setEditProfile(false);
        setPopUpData({
          popupType: "success",
          heading: "Success",
          body: "Profile Data Updated Successfully",
        });
      } else {
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: result.message,
        });
      }
    } catch (err) {
      setPopUpData({
        popupType: "danger",
        heading: "Error",
        body: err.message,
      });
    }
    setShowPopUp(true);
  };

  return (
    <div className="container py-5">
      {userData ? (
        <>
          <div className="row">
            <div className="col-lg-12 col-md-9 m-auto text-center">
              <div className="mobile-only">
                <div className="d-flex sec-heading">
                  <h2
                    style={{ color: "#007bff", fontSize: "3rem" }}
                    className="pl-0 text-left font-weight-bold col-10"
                  >
                    <span>{editProfile ? "Edit Profile" : "My Profile"}</span>
                  </h2>
                  <p
                    className="p-2 col-2 text-right mb-0"
                    style={{ alignItems: "center" }}
                    onClick={() => {
                      setEditProfile(!editProfile);
                    }}
                  >
                    <i
                      style={{ fontSize: 30, lineHeight: 1.5 }}
                      className="fas fa-edit"
                    ></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Form className="w-100" onSubmit={submitUpdateForm}>
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
                      src={src}
                      style={{
                        aspectRatio: "4/4",
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                      alt="my profile"
                    />
                    <div onClick={chooseFile} className="overlay-photo-upload">
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
                          ref={inputRef}
                          onChange={handleChange}
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
                <div className="desktop-only">
                  <div
                    className="sec-heading d-flex"
                    style={{ alignItems: "center" }}
                  >
                    <h2
                      style={{ color: "#007bff", fontSize: "3rem" }}
                      className="pl-0 text-left font-weight-bold col-8"
                    >
                      <span>{editProfile ? "Edit Profile" : "My Profile"}</span>
                    </h2>
                    <p
                      className="p-2 col-4 text-right mb-0"
                      style={{ alignItems: "center" }}
                      onClick={() => {
                        setEditProfile(!editProfile);
                      }}
                    >
                      <span>Edit Profile &nbsp;</span>
                      <i style={{ fontSize: 20 }} className="fas fa-edit"></i>
                    </p>
                  </div>
                </div>

                <Form.Group className="text-left mb-2" controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={editProfile ? false : true}
                  />
                </Form.Group>

                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    className="text-left"
                    controlId="designation"
                  >
                    <Form.Label>Designation:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      disabled={editProfile ? false : true}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="text-left">
                    <Form.Label>Role:</Form.Label>
                    <Form.Control
                      className="me-sm-2"
                      id="inlineFormCustomSelect"
                      as="select"
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      defaultValue={role}
                      disabled={editProfile ? false : true}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </Form.Control>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    className="text-left"
                    controlId="facebookLink"
                  >
                    <Form.Label>Facebook Link:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://www.facebook.com"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      disabled={editProfile ? false : true}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    className="text-left"
                    controlId="twitterLink"
                  >
                    <Form.Label>Twitter Link:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://www.twitter.com"
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                      disabled={editProfile ? false : true}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-2">
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
                </Row>

                <Button
                  className="w-100"
                  style={{ height: 60 }}
                  variant="primary"
                  type="submit"
                  disabled={editProfile ? false : true}
                >
                  Save Changes
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
        </>
      ) : (
        <p className="text-center">Please Login to view this page</p>
      )}
    </div>
  );
};

export default MyProfileData;
