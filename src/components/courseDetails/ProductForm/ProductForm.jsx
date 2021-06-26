import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import currencyFormatter from "currency-formatter";

import { getMyProfileData } from "../../../services/account";

const ProductForm = ({ course }) => {
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          const { data } = await getMyProfileData();

          const author =
            data.user._id.toString() === course.author._id.toString();
          if (!author) {
            const purchased =
              data.user.courses.filter(
                (courseItem) =>
                  courseItem.courseId.toString() === course._id.toString()
              ).length > 0
                ? true
                : false;

            if (purchased) {
              setIsPurchased(true);
            }
          } else {
            setIsAuthor(true);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="box-shadow">
      <div className="widget buy-course text-center border container py-3">
        <p className="price">
          <strong>
            {currencyFormatter.format(course.price, { code: "USD" })}
          </strong>
          {course.comparePrice && course.comparePrice > course.price ? (
            <>
              <span className="pl-2">
                <del>
                  {currencyFormatter.format(course.comparePrice, {
                    code: "USD",
                  })}
                </del>
              </span>
              <br />
              <span className="discount-price">
                <i className="far fa-clock pr-2"></i>
                {((course.comparePrice - course.price) * 100) /
                  course.comparePrice}
                % off for 24 hours
              </span>
            </>
          ) : (
            <></>
          )}
        </p>
        {loading ? (
          "Loading..."
        ) : isAuthor ? (
          <NavLink
            className="btn btn-filled btn-primary w-100 border"
            as="a"
            to="./checkout"
          >
            <span>Edit Course</span>
          </NavLink>
        ) : isPurchased ? (
          <NavLink
            className="btn btn-filled btn-primary w-100 border"
            as="a"
            to="./checkout"
          >
            <span>View Course</span>
          </NavLink>
        ) : (
          <NavLink
            className="btn btn-filled btn-primary w-100 border"
            as="a"
            to="./checkout"
          >
            <span>Buy Now</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
