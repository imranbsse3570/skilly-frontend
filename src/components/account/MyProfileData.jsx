import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const MyProfileData = () => {
  const { userData, updateProfile } = useContext(GlobalContext);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-7 col-md-9 m-auto text-center">
          <div className="sec-heading">
            <h2>My Profile</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-6 m-auto text-center">
          <div className="sec-heading">
            <div
              className="rounded-circle profile-upload"
              style={{ overflow: "hidden", position: "relative" }}
            >
              <img
                width="100%"
                className="rounded-circle border"
                src={`https://skilly-online.herokuapp.com/files/users/${userData.photo}`}
                alt="my profile"
              />
              <div className="overlay-photo-upload">
                <i className="fas fa-camera"></i>
                <span className="pl-2">Upload Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileData;
