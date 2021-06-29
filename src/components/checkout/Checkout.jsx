import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { NavLink as Link } from "react-router-dom";
import currencyFormatter from "currency-formatter";

import { handleCheckout } from "../../services/checkout";
import { getCourseData } from "../../services/course";
import "./checkout.css";
import AlertDismissible from "../higher-order-component/AlertDismissible";

const stripePromise = loadStripe(
  "pk_test_51IzZgmLLnvDoXWyo3ylp4Cn7f23mPqkniEc7mLnfjJ5THdSvA7QUUKleJQFngbrJUV8hC5003zow7Hlptmy4D59R00C0amFEzd"
);

const ProductDisplay = ({ handleClick, course }) => (
  <section style={{ maxWidth: 600 }} className="mx-auto border rounded">
    <div className="product">
      <img
        width="100%"
        src={`https://skilly-online.herokuapp.com/files/coursePreview/${course.previewImage}?width=600`}
        alt={course.title}
      />
      <div className="description p-3">
        <h3 className="font-weight-bold">
          <Link as="a" to={`../../${course.slug}`}>
            {course.title}
          </Link>
        </h3>
        <div className="ratings text-warning">
          <i className={`${course.rating >= 1 ? "fas" : "far"} fa-star`}></i>
          <i className={`${course.rating >= 2 ? "fas" : "far"} fa-star`}></i>
          <i className={`${course.rating >= 3 ? "fas" : "far"} fa-star`}></i>
          <i className={`${course.rating >= 4 ? "fas" : "far"} fa-star`}></i>
          <i className={`${course.rating >= 5 ? "fas" : "far"} fa-star`}></i>
        </div>
        <br />
        <p>{course.description}</p>
      </div>
      <button
        type="button"
        id="checkout-button"
        role="link"
        className="bg-primary"
        onClick={() => handleClick(course._id)}
      >
        <span className="text-light">
          Proceed to Checkout &nbsp;
          <span className="text-warning">
            (
            {course.comparePrice && course.comparePrice > course.price ? (
              <span>
                <span className="font-weight-bold">
                  {currencyFormatter.format(course.price, { code: "USD" })}
                </span>
                &nbsp; -
                <span className="pl-2">
                  <del>
                    {currencyFormatter.format(course.comparePrice, {
                      code: "USD",
                    })}
                  </del>
                </span>
                )
              </span>
            ) : (
              <span className="font-weight-bold">
                {currencyFormatter.format(course.price, { code: "USD" })}
              </span>
            )}
          </span>
        </span>
      </button>
    </div>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopUp] = useState(false);
  const [popupData, setPopUpData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { results, data } = await getCourseData(courseId);
      if (results > 0) {
        setCourseData(data.docs[0]);
        setLoading(false);
      }
    };

    fetchData();

    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (id) => {
    const stripe = await stripePromise;

    if (localStorage.getItem("token")) {
      const response = await handleCheckout(id);

      console.log(response);

      if (response.status !== "fail") {
        const session = response.session;

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          setPopUpData({
            heading: "Error",
            body: (
              <p>
                <span>
                  Error in redirecting to checkout. Due to Slow Network.
                  <br />
                  Thanks!
                </span>
              </p>
            ),
            popupType: "danger",
          });
          setShowPopUp(true);
        }
      } else {
        setPopUpData({
          heading: "Error",
          body: (
            <p>
              <span>
                You Have already purchased this course.
                <br />
                Thanks!
              </span>
            </p>
          ),
          popupType: "danger",
        });
        setShowPopUp(true);
      }
    } else {
      setPopUpData({
        heading: "Warning",
        body: (
          <p>
            <span>
              Please&nbsp;
              <Link className="font-weight-bold" as="a" to="/login">
                Login
              </Link>
              /
              <Link className="font-weight-bold" as="a" to="/register">
                Register
              </Link>
              &nbsp;in order to checkout
            </span>
          </p>
        ),
        popupType: "warning",
      });
      setShowPopUp(true);
    }
  };

  return (
    <div className="my-5">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="stripe-checkout">
          {message ? (
            <Message message={message} />
          ) : (
            <ProductDisplay course={courseData} handleClick={handleClick} />
          )}
          <AlertDismissible
            data={{
              showPopup,
              setShowPopUp,
              popupData,
            }}
          />
        </div>
      )}
    </div>
  );
}
