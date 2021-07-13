import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink as Link, useLocation, Outlet } from "react-router-dom";

import { GlobalContext } from "../../App";

const AdminNav = () => {
  const location = useLocation();
  const { userData } = useContext(GlobalContext);

  return (
    <div className="container py-5">
      {userData ? (
        <div className="row">
          <div className="col-md-3">
            <ListGroup>
              <ListGroup.Item
                action
                variant={
                  location.pathname.includes("myProfile") ? "primary" : ""
                }
              >
                <Link className="w-100" to="../../../users/myProfile">
                  My Profile
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant={
                  location.pathname.includes("myCourses") ? "primary" : ""
                }
              >
                <Link to="../../../users/myCourses">My Courses</Link>
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant={
                  location.pathname.includes("purchasedCourses")
                    ? "primary"
                    : ""
                }
              >
                <Link to="../../../users/purchasedCourses">
                  Purchased Courses
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant={
                  location.pathname.includes("createNewCourse") ? "primary" : ""
                }
              >
                <Link to="../../../users/createNewCourse">
                  Create New Course
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant={
                  location.pathname.includes("editLectures") ? "primary" : ""
                }
              >
                <Link to="../../../users/editLectures">Edit Lectures</Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      ) : (
        <p className="text-center">Please Login to Access These Pages</p>
      )}
    </div>
  );
};

export default AdminNav;
