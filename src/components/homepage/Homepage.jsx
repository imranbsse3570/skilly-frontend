import React from "react";
import Categories from "./subComponents/Categories";
import HomepageData from "./config.json";
import FeaturedCategory from "./subComponents/FeaturedCategory";
import HomepageSlider from "./subComponents/HomepageSlider";
import Stats from "./subComponents/Stats";
import Testimonials from "./subComponents/Testimonials";

const HomePage = () => {
  let keys = Object.keys(HomepageData);

  return (
    <div>
      {keys.map((item, index) => {
        switch (item.split("--")[0]) {
          case "slideshow":
            return (
              <HomepageSlider
                data={HomepageData[item]}
                key={`${item}--${index}`}
              />
            );
          case "categories":
            return (
              <Categories key={`${item}--${index}`} data={HomepageData[item]} />
            );
          case "featured-category":
            return (
              <FeaturedCategory
                key={`${item}--${index}`}
                data={HomepageData[item]}
              />
            );
          case "stats":
            return (
              <Stats key={`${item}--${index}`} data={HomepageData[item]} />
            );
          case "testimonials":
            return (
              <Testimonials
                key={`${item}--${index}`}
                data={HomepageData[item]}
              />
            );
          default:
            return <hr key={`${item}--${index}`} />;
        }
      })}
    </div>
  );
};

export default HomePage;
