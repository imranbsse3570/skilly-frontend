import React from "react";
import { NavLink as Link } from "react-router-dom";

const CategoriesSidebar = ({ categories }) => {
  return (
    <div className="widget box-shadow categories container border py-3">
      <h3 className="widget-title mb-3">Categories</h3>
      {categories.length > 0 ? (
        <ul className="list-group list-group-flush">
          {categories.map((category) => {
            return (
              <li className="list-group-item" key={category._id}>
                <Link to={`../../../../courses/${category.slug}`} as="a">
                  {category.title}
                  <span className="float-right">
                    ({category.courses.length})
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No Courses to display</p>
      )}
    </div>
  );
};

export default CategoriesSidebar;
