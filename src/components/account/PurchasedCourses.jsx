import React, { useContext, useState, useEffect } from "react";

import { GlobalContext } from "../../App";
import ProductGrid from "../higher-order-component/ProductGrid";
import { getMyCourses } from "../../services/account";

const PurchasedCourses = () => {
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
    <div className="container py-sm-custom-5">
      {userData ? (
        !isLoading ? (
          <>
            <div className="row">
              <div className="col-lg-12 col-md-9 m-auto text-center">
                <div className="sec-heading">
                  <h2>Purchased Courses</h2>
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

export default PurchasedCourses;
