import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import ProductGrid from "../higher-order-component/ProductGrid";
import CategoriesSidebar from "../higher-order-component/CategoriesSidebar";
import FilterByPrice from "../higher-order-component/FilterByPrice";
import { getCategories } from "../../services/category";

const Courses = () => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [coursesInCategory, setCoursesInCategory] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setCategories([]);
        setCoursesInCategory([]);

        const result = await getCategories();

        setCategories(result.data.docs);

        console.log(categories);

        const categoryFound = categories.filter(
          (item) => item.slug === categoryId
        );

        if (categoryFound.length > 0) {
          setCoursesInCategory(categoryFound[0].courses);
        } else {
          setCoursesInCategory([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchingData();
  }, [categoryId]);

  return (
    <div className="container py-5 course-page">
      <div className="row">
        <div className="col-lg-3">
          <div className="p-2 sticky-collection-sidebar">
            <CategoriesSidebar categories={categories} />
            <FilterByPrice />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row collection-grids-mobile">
            {coursesInCategory && coursesInCategory.length > 0
              ? coursesInCategory.map((course, index) => {
                  course.category = categoryId;
                  return (
                    <div
                      key={`${course._id}--${index}`}
                      className="col-md-4 py-2 px-2"
                    >
                      <ProductGrid course={course} />
                    </div>
                  );
                })
              : "No Courses Available"}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Courses;
