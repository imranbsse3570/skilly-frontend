import React from "react";

const ProductForm = () => {
  return (
    <div className="box-shadow">
      <div className="widget buy-course text-center border container py-3">
        <p className="price">
          <strong>$11.39</strong>
          <span className="pl-2">
            <del>$111.00</del>
          </span>
        </p>
        <span className="discount-price">
          <i className="far fa-clock pr-2"></i>90% off for 23 hours
        </span>
        <a href="#" className="btn btn-outline my-3 w-100 border">
          Add to cart
        </a>
        <a href="#" className="btn btn-filled btn-primary w-100 border">
          Buy now
        </a>
      </div>
    </div>
  );
};

export default ProductForm;
