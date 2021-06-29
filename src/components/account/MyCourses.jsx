import React, { useContext, useState, useEffect } from "react";

import { GlobalContext } from "../../App";
import ProductGrid from "../higher-order-component/ProductGrid";
import { getMyCourses } from "../../services/account";

const MyCourses = () => {
  const { userData } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyCourses();
        setCourses(result.data.courses);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-5">
      {userData ? (
        !isLoading ? (
          <>
            <div className="row">
              <div className="col-lg-12 col-md-9 m-auto text-center">
                <div className="sec-heading">
                  <h2>My Courses</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-9 m-auto text-center">
                <div className="sec-heading">
                  <h4>Purchased Courses</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 m-auto text-center">
                <div className="row collection-grids-mobile">
                  {courses.map((course, index) => {
                    return (
                      <div
                        key={`${course._id}--${index}`}
                        className="col-md-4 py-2 px-2"
                      >
                        <ProductGrid course={course.courseId} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {userData.role === "instructor" ? (
              <>
                <div className="row">
                  <div className="col-lg-12 col-md-9 m-auto text-center">
                    <div className="sec-heading" style={{ marginTop: 50 }}>
                      <h4>Created Courses</h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {userData.createdCourses.length > 0 ? (
                    <div className="col-lg-12 m-auto text-center">
                      <div className="row collection-grids-mobile">
                        {userData.createdCourses.map((course, index) => {
                          return (
                            <div
                              key={`${course._id}--${index}`}
                              className="col-md-4 py-2 px-2"
                            >
                              <ProductGrid course={course} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center">No Courses To Display</p>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )
      ) : (
        <p className="text-center">Please Login to view this page</p>
      )}
    </div>
  );
};

export default MyCourses;
