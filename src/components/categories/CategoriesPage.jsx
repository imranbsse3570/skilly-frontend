import React, { useState, useEffect } from "react";

import { getCategories } from "../../services/category";
import Category from "../higher-order-component/Category";

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data.docs);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchingData();
  }, []);

  return (
    <div className="container py-5">
      {!isLoading ? (
        <>
          <div className="row">
            <div className="col-lg-7 col-md-9 m-auto text-center">
              <div className="sec-heading">
                <h2>Categories</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {categories.map((category) => (
              <Category item={category} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default CategoriesPage;
