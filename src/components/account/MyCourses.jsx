import React, { useContext } from "react";

import { GlobalContext } from "../../App";
import ProductGrid from "../higher-order-component/ProductGrid";

const MyCourses = () => {
  const { userData } = useContext(GlobalContext);

  return (
    <div className="container py-sm-custom-5">
      {userData ? (
        <>
          <div className="row">
            <div className="col-lg-12 col-md-9 m-auto text-center">
              <div className="sec-heading">
                <h2>My Courses</h2>
              </div>
            </div>
          </div>
          {userData.role === "instructor" ? (
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
          ) : (
            <></>
          )}
        </>
      ) : (
        <p className="text-center">Please Login to view this page</p>
      )}
    </div>
  );
};

export default MyCourses;
