import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/header/Navbar";
import HomePage from "../components/homepage/Homepage";
import Footer from "../components/footer/Footer";
import Courses from "../components/courses/Courses";
import CourseDetails from "../components/courseDetails/CourseDetails";
import Login from "../components/Login/Login";
import SignUp from "../components/signup/SignUp";
import LecturePortal from "../components/LecturePortal/LecturePortal";

const RouterConfig = ({ data }) => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses">
          <Route path="/:categoryId">
            <Route path="/" element={<Courses />} />
            <Route path="/:courseId">
              <Route path="/" element={<CourseDetails />} />
            </Route>
          </Route>
        </Route>

        <Route path="/:courseId">
          <Route path="/lectures">
            <Route path="/:lectureId" element={<LecturePortal />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>

      <Footer data={data.footer} />
    </Router>
  );
};

export default RouterConfig;
