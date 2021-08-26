import React, { useState, useContext } from "react";

import VideoModal from "../higher-order-component/VideoModal";
import {
  AlertDismissibleContext,
  GlobalContext,
  LoadingSpinnerContext,
} from "../../App";
import {
  updateLecture,
  deleteLecture,
  addNewLecture,
} from "../../services/lecture";

import LectureAdmin from "../higher-order-component/LectureAdmin";
import CreateNewLecture from "../higher-order-component/CreateNewLecture";

const AddNewLecture = ({ lectures, courseId }) => {
  const { setRunSpinner } = useContext(LoadingSpinnerContext);
  const { updateUserData } = useContext(GlobalContext);
  const { setShowPopUp, setPopUpData } = useContext(AlertDismissibleContext);

  // video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleAddLecture = async (formData, courseId) => {
    setRunSpinner(true);
    try {
      await addNewLecture(formData, courseId);
      await updateUserData();

      setPopUpData({
        popupType: "success",
        heading: "Success",
        body: <p>Successfully Added New lecture</p>,
      });
    } catch (err) {
      setPopUpData({
        popupType: "danger",
        heading: "Error",
        body: err.message,
      });
    }
    setRunSpinner(false);
    setShowPopUp(true);
  };

  const handleDeleteLecture = async (course, lecture) => {
    setRunSpinner(true);
    try {
      await deleteLecture(course, lecture);
      await updateUserData();

      setPopUpData({
        popupType: "success",
        heading: "Success",
        body: <p>Successfully Deleted lecture</p>,
      });
    } catch (err) {
      setPopUpData({
        popupType: "danger",
        heading: "Error",
        body: err.message,
      });
    }
    setRunSpinner(false);
    setShowPopUp(true);
  };

  const handleUpdateLecture = async (course, lectureId, formData) => {
    setRunSpinner(true);
    try {
      const result = await updateLecture(formData, course, lectureId);
      console.log(result);
      await updateUserData();

      setPopUpData({
        popupType: "success",
        heading: "Success",
        body: <p>Successfully Updated lecture {result.data.lecture.title}</p>,
      });
    } catch (err) {
      setPopUpData({
        popupType: "danger",
        heading: "Error",
        body: err.message,
      });
    }
    setRunSpinner(false);
    setShowPopUp(true);
  };

  return (
    <div className="container py-sm-custom-5">
      <div className="row">
        <div className="col-lg-12 m-auto text-center">
          <div className="sec-heading">
            <h2>Lectures</h2>
          </div>
        </div>
      </div>
      <div className="row">
        {lectures.length > 0 ? (
          <>
            {lectures.map((lecture) => (
              <LectureAdmin
                key={lecture._id}
                lecture={lecture}
                handleUpdate={handleUpdateLecture}
                handleDelete={handleDeleteLecture}
                courseId={courseId}
                setShowVideoModal={setShowVideoModal}
                setVideoUrl={setVideoUrl}
                setModalTitle={setModalTitle}
              />
            ))}
            <CreateNewLecture
              courseId={courseId}
              handleAddLecture={handleAddLecture}
            />
            <VideoModal
              showVideoModal={showVideoModal}
              setShowVideoModal={setShowVideoModal}
              videoUrl={videoUrl}
              title={modalTitle}
            />
          </>
        ) : (
          <>
            <CreateNewLecture
              courseId={courseId}
              handleAddLecture={handleAddLecture}
            />
            <p className="pt-2 text-center">No Lectures to Show</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AddNewLecture;
