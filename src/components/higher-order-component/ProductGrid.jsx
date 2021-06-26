import React, { useContext } from "react";
import currencyFormatter from "currency-formatter";
import { NavLink as Link } from "react-router-dom";

import { GlobalContext } from "../../App";

const ProductGrid = ({ course }) => {
  const { userData } = useContext(GlobalContext);

  let isAuthor = false;
  let isPurchased = false;
  let lectureId = "";

  if (userData) {
    isAuthor = userData._id.toString() === course.author._id.toString();
    isPurchased =
      userData.courses.filter(
        (courseItem) => courseItem.courseId.toString() === course._id.toString()
      ).length > 0
        ? true
        : false;

    lectureId = course.lectures.length > 0 ? course.lectures[0]._id : "";
  }

  let discount = undefined;
  if (course.comparePrice > course.price) {
    discount =
      ((course.comparePrice - course.price) * 100) / course.comparePrice;
  }
  return (
    <div className="product-grid">
      <div className="product-image">
        <a href={course.productUrl}>
          <img
            className="pic-1"
            src={
              course.previewImage
                ? `https://skilly-online.herokuapp.com/files/coursePreview/${course.previewImage}`
                : "https://skilly-online.herokuapp.com/files/coursePreview/default.jpg"
            }
            alt={course.title}
          />
        </a>
        {discount ? (
          <span className="product-discount-label">
            {discount.toFixed(1)}% Off
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="product-content">
        <h3 className="title">
          <Link to={`./${course.category}/${course.slug}`} as="a">
            {course.title}
          </Link>
        </h3>
        <span className="description">{course.summary}</span>
        <div className="price">
          {currencyFormatter.format(course.price, { code: "USD" })}
          {course.comparePrice > course.price ? (
            <span>
              {currencyFormatter.format(course.comparePrice, { code: "USD" })}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="social-wrapper">
        <ul className="social">
          <li>
            <Link to={`/courses/${course.category.slug}/${course.slug}`} as="a">
              <i className="fa fa-eye"></i>
            </Link>
          </li>
          <li>
            {isAuthor ? (
              <Link to={`/courses`} as="a">
                <i className="fas fa-edit"></i>
              </Link>
            ) : isPurchased ? (
              <Link to={`../../${course.slug}/lectures/${lectureId}`} as="a">
                <i className="fas fa-video"></i>
              </Link>
            ) : (
              <Link
                to={`/courses/${course.category}/${course.slug}/checkout`}
                as="a"
              >
                <i className="fa fa-shopping-cart"></i>
              </Link>
            )}
          </li>
          <li>
            <Link to={`/courses/${course.category.slug}`} as="a">
              <i className="fa fa-random"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductGrid;
