import React from "react";
import Category from "./Category";

const Categories = ({ data }) => {
  let subHeading = undefined;
  if (data.subHeading) {
    subHeading = <h3 className="h4 text-center">{data.subHeading}</h3>;
  }

  let heading = undefined;
  if (data.heading) {
    heading = <h1 className="h2 text-center">{data.heading}</h1>;
  }

  let categories = undefined;
  if (data.category && data.category.length > 0) {
    categories = data.category.map((item, index) => {
      return <Category key={`${item.categoryName}--${index}`} item={item} />;
    });
  }

  return (
    <div style={{ backgroundColor: "#ededed" }}>
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
        {categories ? <div className="row">{categories}</div> : ""}
      </div>
    </div>
  );
};

export default Categories;
