import React, { useState, useEffect } from "react";
import Category from "../../higher-order-component/Category";
import { getCategories } from "../../../services/category";

const Categories = ({ data }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await getCategories(8);
        setCategories(result.data.docs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchingData();
  }, []);

  return (
    <div style={{ backgroundColor: "#f3f3f3" }}>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-lg-7 col-md-9 m-auto text-center">
            <div className="sec-heading">
              <h3 className="h4 text-center">Top Categories</h3>
              <h1 className="h2 text-center">
                Pick the right category Build your career
              </h1>
            </div>
          </div>
        </div>
        {categories.length > 0 ? (
          <div className="row">
            {categories.map((item, index) => (
              <Category
                key={`${item.slug}--${index}`}
                item={item}
                path="/courses"
              />
            ))}
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
