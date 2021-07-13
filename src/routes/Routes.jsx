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
import ContactUs from "../components/ContactUs/ContactUs";
import CategoriesPage from "../components/categories/CategoriesPage";
import Checkout from "../components/checkout/Checkout";
import PageNotFound from "../components/notFound/PageNotFound";
import MyProfileData from "../components/account/MyProfileData";
import MyCourses from "../components/account/MyCourses";
import CreateNewCourse from "../components/coursesEdit/CreateNewCourse";
import UpdateCourse from "../components/coursesEdit/updateCourse";
import AdminNav from "../components/higher-order-component/AdminNav";
import PurchasedCourses from "../components/account/PurchasedCourses";
import AddNewLecture from "../components/lectures/AddLectures";
import EditLecture from "../components/lectures/EditLectures";

const RouterConfig = ({ data }) => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses">
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/:categoryId">
            <Route path="/" element={<Courses />} />
            <Route path="/:courseId">
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<CourseDetails />} />
            </Route>
          </Route>
        </Route>

        <Route path="/users" element={<AdminNav />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/myProfile" element={<MyProfileData />} />
          <Route path="/myCourses" element={<MyCourses />} />
          <Route path="/purchasedCourses" element={<PurchasedCourses />} />
          <Route path="/createNewCourse" element={<CreateNewCourse />} />
          <Route path="/updateCourse/:courseSlug">
            <Route path="/" element={<UpdateCourse />} />
            <Route path="/lectures" element={<AddNewLecture />} />
          </Route>
          <Route path="/editLectures" element={<EditLecture />} />
        </Route>

        <Route path="/:courseId">
          <Route path="/lectures">
            <Route path="/:lectureId" element={<LecturePortal />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/pages">
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer data={data.footer} />
    </Router>
  );
};

export default RouterConfig;
