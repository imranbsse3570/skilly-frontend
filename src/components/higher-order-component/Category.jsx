import React from "react";
import { NavLink as Link } from "react-router-dom";

const Category = ({ item, path }) => {
  return (
    <div className="col-md-3 col-sm-6">
      <Link
        as="a"
        to={`.${path ? path : ""}/${item.slug}`}
        className="mb-2 mt-2 align-items-center border category-on-hover-animation rounded"
        style={{
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <img
          src={`https://skilly-online.herokuapp.com/files/categories/${item.previewImage}`}
          width="100%"
          style={{ aspectRatio: "4/3" }}
          alt={item.title}
        />
        <p className="text-center py-2 mb-0">{item.title}</p>
      </Link>
    </div>
  );
};

export default Category;
