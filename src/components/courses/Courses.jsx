import React from "react";
import { Outlet } from "react-router-dom";

import ProductGrid from "../higher-order-component/ProductGrid";
import CourseData from "./coursesConfig.json";
import CategoriesSidebar from "../higher-order-component/CategoriesSidebar";
import FilterByPrice from "../higher-order-component/FilterByPrice";

const Courses = () => {
  const courses =
    CourseData.courses && CourseData.courses.length > 0
      ? CourseData.courses.map((course, index) => {
          return (
            <div
              key={`${course.name}--${index}`}
              className="col-md-4 py-2 px-2"
            >
              <ProductGrid course={course} />
            </div>
          );
        })
      : "No Courses Available";
  return (
    <div className="container py-5 course-page">
      <div className="row">
        <div className="col-lg-3">
          <div className="p-2 sticky-collection-sidebar">
            <CategoriesSidebar />
            <FilterByPrice />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row collection-grids-mobile">{courses}</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Courses;
