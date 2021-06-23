import React, { useState, useEffect } from "react";
import Category from "./Category";
import { getCategories } from "../../../services/category";

const Categories = ({ data }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data.docs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchingData();
  }, []);

  let subHeading = undefined;
  if (data.subHeading) {
    subHeading = <h3 className="h4 text-center">{data.subHeading}</h3>;
  }

  let heading = undefined;
  if (data.heading) {
    heading = <h1 className="h2 text-center">{data.heading}</h1>;
  }

  return (
    <div style={{ backgroundColor: "#f3f3f3" }}>
      <div className="container pt-5 pb-5">
        {subHeading || heading ? (
          <div className="row">
            <div className="col-lg-7 col-md-9 m-auto text-center">
              <div className="sec-heading">
                {subHeading ? subHeading : ""}
                {heading ? heading : ""}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {categories.length > 0 ? (
          <div className="row">
            {categories.map((item, index) => (
              <Category key={`${item.slug}--${index}`} item={item} />
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
