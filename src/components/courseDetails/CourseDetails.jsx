import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { getCourseData } from "../../services/course";
import { getRelatedCategories } from "../../services/category";
import InstructorWidget from "./InstructorWidget/InstructorWidget";
import ProductForm from "./ProductForm/ProductForm";
import CourseContent from "./subComponents/CourseContent";
import CourseCriculum from "./subComponents/CourseCriculum";
import CoursePreview from "./subComponents/CoursePreview";
import CategoriesSidebar from "../higher-order-component/CategoriesSidebar";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedCourse, setRelatedCourse] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { results, data } = await getCourseData(courseId);
        if (results > 0) {
          setCourseData(data.docs[0]);
          const categoryData = await getRelatedCategories(
            data.docs[0].category.slug,
            6
          );
          setRelatedCourse(categoryData.data.docs);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="container py-5">
      {!isLoading ? (
        courseData ? (
          <div className="row">
            <div className="col-lg-8">
              <CoursePreview
                src={courseData.previewImage}
                title={courseData.title}
                lectures={courseData.lectures
                  .filter((lecture) => !lecture.isLocked)
                  .map((lecture) => lecture.source)}
                courseId={courseData._id}
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
            <div className="col-lg-4 custom-top-padding">
              <ProductForm course={courseData} />
              <InstructorWidget author={courseData.author} />
              <CategoriesSidebar categories={relatedCourse} />
            </div>
          </div>
        ) : (
          <p>Course Not Found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
      <Outlet />
    </div>
  );
};

export default CourseDetails;
