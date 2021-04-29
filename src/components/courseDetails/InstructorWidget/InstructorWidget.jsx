import React from "react";
const InstructorWidget = () => {
  return (
    <div className="box-shadow widget instractors text-center border container py-3">
      <figure>
        <img
          src="https://picsum.photos/id/237/150/150?grayscale"
          alt=""
          width="150"
          height="150"
          className="rounded-circle"
        />
      </figure>
      <h4>Lisa Sordan</h4>
      <span>Web designer</span>
      <div className="socials">
        <a href="#" className="facebook p-1">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="twitter p-1">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="linkedin p-1">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="youtube p-1">
          <i className="fab fa-youtube"></i>
        </a>
      </div>
    </div>
  );
};

export default InstructorWidget;
