import React from "react";
import { Outlet } from "react-router-dom";
import Contact from "../higher-order-component/Contact";

const ContactUs = () => {
  return (
    <div className="container py-5 text-center">
      <h4 className="h4">Contact</h4>
      <h1 className="h1">If you have any Query Drop us a message</h1>
      <div className="row py-4">
        <div className="col-md-8">
          <Contact />
        </div>
        <div className="col-md-4">
          <div className="container text-left pt-3 border box-shadow">
            <br />

            <h3 className="h3 font-weight-bold">Contact Info</h3>
            <p>
              Skilly.com is an Online Course Learning platform for Students.
            </p>
            <br />
            <h5 className="h5 font-weight-bold">Location Info</h5>
            <p>International Islamic University Islamabad</p>
            <br />
            <h5 className="h5 font-weight-bold">Hotline Numbers</h5>
            <p>
              +923126171650 <br /> +923495975076
            </p>
            <br />
            <h5 className="h5 font-weight-bold">Email</h5>
            <p>
              imranmunir312@gmail.com
              <br />
              rajanomanbhatti00@gmail.com
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ContactUs;
