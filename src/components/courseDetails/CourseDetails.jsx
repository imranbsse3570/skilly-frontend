import React from "react";
import InstructorWidget from "./InstructorWidget/InstructorWidget";
import ProductForm from "./ProductForm/ProductForm";
import CourseContent from "./subComponents/CourseContent";
import CourseCriculum from "./subComponents/CourseCriculum";
import CoursePreview from "./subComponents/CoursePreview";
import CategoriesSidebar from "../higher-order-component/CategoriesSidebar";

const CourseDetails = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <CoursePreview />
          <CourseContent />
          <CourseCriculum />
        </div>
        <div className="col-lg-4">
          <ProductForm />
          <InstructorWidget />
          <CategoriesSidebar />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
