import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import ProductGrid from "../higher-order-component/ProductGrid";
import CategoriesSidebar from "../higher-order-component/CategoriesSidebar";
import FilterByPrice from "../higher-order-component/FilterByPrice";
import { getCategoryBySlug, getCategories } from "../../services/category";

const Courses = () => {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [categories, setCategories] = useState([]);
  const [coursesInCategory, setCoursesInCategory] = useState([]);
  const [moneyMax, setMoneyMax] = useState(60);
  const [categoryTitle, setCategoryTitle] = useState("");

  const moneyFilterHandleChange = (e) => {
    setMoneyMax(e.target.value);
    setIsLoadingProducts(true);
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await getCategories();

        setCategories(result.data.docs);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    const fetchingProducts = async () => {
      setCoursesInCategory([]);

      try {
        setCategoryTitle("");
        const { data } = await getCategoryBySlug(categoryId);

        setCategoryTitle(data.doc.title);

        const courseFilterByMoney = data.doc.courses.filter(
          (course) => course.price <= moneyMax
        );

        setCoursesInCategory(courseFilterByMoney);
      } catch (err) {
        console.log(err);
      }
      setIsLoadingProducts(false);
    };

    if (isLoading) {
      fetchingData();
    }

    fetchingProducts();
  }, [categoryId, isLoadingProducts]);

  return (
    <div className="container py-5 course-page">
      {!isLoading ? (
        <>
          <div className="row">
            <div className="col-lg-7 col-md-9 m-auto text-center">
              <div className="sec-heading">
                <h2>{categoryTitle}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="p-2 sticky-collection-sidebar">
                <CategoriesSidebar categories={categories} />
                <FilterByPrice
                  moneyMax={moneyMax}
                  moneyFilterHandleChange={moneyFilterHandleChange}
                />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="p-2">
                {!isLoadingProducts ? (
                  coursesInCategory && coursesInCategory.length > 0 ? (
                    <div className="row collection-grids-mobile">
                      {coursesInCategory.map((course, index) => {
                        course.category = categoryId;
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
                  ) : (
                    <p className="py-4">No Courses Available</p>
                  )
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Outlet />
    </div>
  );
};

export default Courses;
