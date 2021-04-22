import React from "react";

const Category = ({ item }) => {
  return (
    <div className="col-md-3 col-sm-6">
      <a
        className="mb-2 mt-2 align-items-center border category-on-hover-animation rounded"
        style={{
          backgroundColor: "#ffffff",
        }}
        href={item.categoryUrl}
      >
        <img
          src={item.categoryImage}
          width="30"
          height="30"
          alt={item.categoryName}
        />
        <span className="pl-3">{item.categoryName}</span>
      </a>
    </div>
  );
};

export default Category;
