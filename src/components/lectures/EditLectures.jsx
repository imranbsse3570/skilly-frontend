import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";

import { GlobalContext } from "../../App";
import AddNewLecture from "./AddLectures";

const EditLecture = () => {
  const { userData } = useContext(GlobalContext);
  const [selectedCourse, setSelectedCourse] = useState(undefined);

  return (
    <div className="container">
      {userData ? (
        <>
          <div className="row">
            <div className="col-lg-12 m-auto text-center">
              <div className="sec-heading">
                <h2>Edit Lectures</h2>
              </div>
            </div>
          </div>
          {userData.role === "instructor" ? (
            <div>
              {userData.createdCourses.length > 0 ? (
                <div>
                  <Form.Group className="text-left" controlId="published">
                    <Form.Label>Select Course:</Form.Label>
                    <Form.Control
                      className="me-sm-2"
                      as="select"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      <option value={undefined}>Please Select a Course</option>
                      {userData.createdCourses.map((course) => (
                        <option value={course._id} key={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <div className="py-5">
                    {selectedCourse ? (
                      <>
                        {userData.createdCourses
                          .filter(
                            (course) =>
                              selectedCourse.toString() ===
                              course._id.toString()
                          )
                          .map((course) => (
                            <AddNewLecture
                              key={`lecture--${course._id}`}
                              lectures={course.lectures}
                              courseId={course._id}
                            />
                          ))}
                      </>
                    ) : (
                      <p>No Data to Display</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-center">No Courses To Display</p>
              )}
            </div>
          ) : (
            <p>Restricted Access</p>
          )}
        </>
      ) : (
        <p>Please Login in to view this page</p>
      )}
    </div>
  );
};

export default EditLecture;
