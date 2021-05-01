import React from "react";
import currencyFormatter from "currency-formatter";
import { NavLink as Link } from "react-router-dom";

const ProductGrid = ({ course }) => {
  let discount = undefined;
  if (course.compareAtPrice > course.price) {
    discount = (course.price * 100) / course.compareAtPrice;
  }
  return (
    <div className="product-grid">
      <div className="product-image">
        <a href={course.productUrl}>
          <img
            className="pic-1"
            src={
              course.imageUrl
                ? course.imageUrl
                : "https://via.placeholder.com/400"
            }
            alt={course.name}
          />
        </a>
        {discount ? (
          <span className="product-discount-label">-{discount}%</span>
        ) : (
          ""
        )}
      </div>
      <div className="product-content">
        <h3 className="title">
          <a href={course.productUrl}>{course.name}</a>
        </h3>
        <span className="description">{course.description}</span>
        <div className="price">
          {currencyFormatter.format(course.price, { code: "USD" })}
          {course.compareAtPrice > course.price ? (
            <span>
              {currencyFormatter.format(course.compareAtPrice, { code: "USD" })}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="social-wrapper">
        <ul className="social">
          <li>
            <Link to={`/courses/${course.category}/${course.slug}`} as="a">
              <i className="fa fa-eye"></i>
            </Link>
          </li>
          <li>
            <Link to={`/courses`} as="a">
              <i className="fa fa-heart"></i>
            </Link>
          </li>
          <li>
            <Link to={`/courses`} as="a">
              <i className="fa fa-shopping-cart"></i>
            </Link>
          </li>
          <li>
            <Link to={`/courses`} as="a">
              <i className="fa fa-random"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductGrid;
