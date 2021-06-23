import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { getCourseData } from "../../services/course";
import InstructorWidget from "./InstructorWidget/InstructorWidget";
import ProductForm from "./ProductForm/ProductForm";
import CourseContent from "./subComponents/CourseContent";
import CourseCriculum from "./subComponents/CourseCriculum";
import CoursePreview from "./subComponents/CoursePreview";
import CategoriesSidebar from "../higher-order-component/CategoriesSidebar";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { results, data } = await getCourseData(courseId);
      if (results > 0) {
        setCourseData(data.docs[0]);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="container py-5">
      {courseData ? (
        <div className="row">
          <div className="col-lg-8">
            <CoursePreview
              src={courseData.previewImage}
              title={courseData.title}
            />
            <CourseContent
              title={courseData.title}
              summary={courseData.summary}
              author={courseData.author.name}
              createdAt={courseData.createdAt}
              noOfReviews={courseData.noOfReviews}
              rating={Math.round(courseData.rating)}
            />
            <CourseCriculum course={courseData} />
          </div>
          <div className="col-lg-4">
            <ProductForm />
            <InstructorWidget />
            {/* <CategoriesSidebar /> */}
          </div>
        </div>
      ) : (
        <p>Course Not Found</p>
      )}
      <Outlet />
    </div>
  );
};

export default CourseDetails;
