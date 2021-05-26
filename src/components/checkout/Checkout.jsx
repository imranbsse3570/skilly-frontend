import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HUF33IO0Avi3ho0jxxmO1ab8Rmj8SbzCslcC0D98epNZwgij1IBAyylgBfdSycGyZYVeG2fzASzdvDOY1wDV9f300E830DlVv"
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
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWI5ZDgxOThiNjBiMGIzYzhkYWQ2YyIsImlhdCI6MTYyMTg0ODYwOSwiZXhwIjoxNjI5NjI0NjA5fQ.0a3KfFRKtLmHKMYGi-rtqqFSvMIN5EGt7r-7yH06jbs"
    );
    myHeaders.append(
      "Cookie",
      "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWI5ZDgxOThiNjBiMGIzYzhkYWQ2YyIsImlhdCI6MTYyMTg0ODYwOSwiZXhwIjoxNjI5NjI0NjA5fQ.0a3KfFRKtLmHKMYGi-rtqqFSvMIN5EGt7r-7yH06jbs"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8000/api/v1/courses/60a7a64295a20433fcd32b9b/checkout",
      requestOptions
    );

    const session = (await response.json()).session;

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

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
