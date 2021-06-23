import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./checkout.css";

const stripePromise = loadStripe(
  "pk_test_51IzZgmLLnvDoXWyo3ylp4Cn7f23mPqkniEc7mLnfjJ5THdSvA7QUUKleJQFngbrJUV8hC5003zow7Hlptmy4D59R00C0amFEzd"
);

const ProductDisplay = ({ handleClick }) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button
      type="button"
      id="checkout-button"
      role="link"
      onClick={handleClick}
    >
      Checkout
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
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

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmRmYTcyN2IyMThjMDAxNTUyYzFmNSIsImlhdCI6MTYyMzA2OTY5MywiZXhwIjoxNjMwODQ1NjkzfQ.yd1Nf9z8mUob1F9IzlN_9-vovpOgnNNyNOyS0_gy5m0"
    );
    myHeaders.append(
      "Cookie",
      "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmRmYTcyN2IyMThjMDAxNTUyYzFmNSIsImlhdCI6MTYyMzA2OTY5MywiZXhwIjoxNjMwODQ1NjkzfQ.yd1Nf9z8mUob1F9IzlN_9-vovpOgnNNyNOyS0_gy5m0"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8000/api/v1/courses/60bdfb367b218c001552c1f7/checkout",
      requestOptions
    );

    const session = (await response.json()).session;

    console.log(session);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div className="stripe-checkout">
      {message ? (
        <Message message={message} />
      ) : (
        <ProductDisplay handleClick={handleClick} />
      )}
    </div>
  );
}
