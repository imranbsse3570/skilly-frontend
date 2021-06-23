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
          src={`https://skilly-online.herokuapp.com/files/lecturePreview/${item.previewImage}`}
          width="30"
          height="30"
          alt={item.title}
        />
        <span className="pl-3">{item.title}</span>
      </a>
    </div>
  );
};

export default Category;
