import React from "react";
import Categories from "./subComponents/Categories";
import FeaturedCategory from "./subComponents/FeaturedCategory";
import HomepageSlider from "./subComponents/HomepageSlider";
import Stats from "./subComponents/Stats";
import Testimonials from "./subComponents/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HomepageSlider />
      <FeaturedCategory />
      <Categories />
      <FeaturedCategory />
      <Stats />
      <Testimonials />
    </div>
  );
};

export default HomePage;
